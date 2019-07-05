import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ElementTypeService } from "../services/element-type.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";
import { UIService } from "../services/ui.service";
import { ProjectService } from "../services/project.service";

@Component({
  selector: "app-element-type",
  templateUrl: "./element-type.component.html",
  styleUrls: ["./element-type.component.css"]
})
export class ElementTypeComponent implements OnInit {
  elementTypeDTOList: any[] = [];
  elementTypeDialogVisibilty: boolean = false;
  elementTypeForm: FormGroup;
  elementTypeSearchForm: FormGroup;

  projectDTOList: any[] = [];

  messages: any[] = [];

  constructor(
    private elementTypeService: ElementTypeService,
    private projectService: ProjectService,
    private messageUtilService: MessageUtilService,
    private uiservice: UIService,
    private formBuilder: FormBuilder
  ) {
    this.createFormGroup();
  }

  ngOnInit() {
    this.fetchReleventData();
  }

  fetchReleventData() {
    this.getProjectDTOList();
  }

  getProjectDTOList() {
    this.projectService.get({}, (response: any) => {
      this.projectDTOList = response["projectDTOList"];
    });
  }

  createFormGroup() {
    this.elementTypeForm = this.formBuilder.group({
      id: [null],
      projectDTOId: ["", Validators.required],
      name: ["", Validators.required]
    });

    this.elementTypeSearchForm = this.formBuilder.group({
      projectList: [""]
    });
  }

  addElementType = () => {
    this.elementTypeForm.reset();
    this.elementTypeDialogVisibilty = true;
  };

  editElementType = rowData => {
    this.populateElementTypeForm(rowData, false);
    this.elementTypeDialogVisibilty = true;
  };

  copyElementType = rowData => {
    this.populateElementTypeForm(rowData);
    this.elementTypeDialogVisibilty = true;
  };

  populateElementTypeForm(rowData: any, makeIdNull: boolean = true) {
    this.elementTypeForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      projectDTOId: { id: rowData["projectDTOId"] },
      name: rowData["name"]
    };

    this.elementTypeForm.setValue(formValue);
  }

  saveElementType = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.elementTypeForm.getRawValue();

    let request = {
      elementTypeDTO: {
        id: formData["id"],
        projectDTOId: formData["projectDTOId"]["id"],
        name: formData["name"]
      }
    };

    this.elementTypeService.save(
      request,
      this.saveElementTypeSuccessCallback,
      this.saveElementTypeErrorCallback
    );
  };

  saveElementTypeSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.elementTypeDialogVisibilty = false;
    this.getElementType();
  };

  saveElementTypeErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelElementType = () => {
    this.elementTypeForm.reset();
    this.elementTypeDialogVisibilty = false;
  };

  getElementType = () => {
    let searchFormData = this.elementTypeSearchForm.getRawValue();

    let request = {
      elementTypeSearchDTO: {
        projectIdList: this.uiservice.getSearchData(
          searchFormData,
          "projectList"
        ),
        projectNeeded: true
      }
    };

    this.elementTypeDTOList = [];
    this.elementTypeService.get(request, this.getElementTypeCallback);
  };

  getElementTypeCallback = (response: any) => {
    this.elementTypeDTOList = response.elementTypeDTOList;
  };

  deleteElementType = rowData => {
    this.messageUtilService.clearMessage(this.messages);

    this.elementTypeService.delete(
      rowData["id"],
      this.deleteElementTypeSuccessCallback,
      this.deleteElementTypeErrorCallback
    );
  };

  deleteElementTypeSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getElementType();
  };

  deleteElementTypeErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  elementTypeOptions: any = {
    caption: "ElementType Details",
    addCallback: this.addElementType,
    editCallback: this.editElementType,
    copyCallback: this.copyElementType,
    getCallback: this.getElementType,
    deleteCallback: this.deleteElementType,
    childPresent: true,
    columns: [
      {
        name: "Project Name",
        index: "projectDTO.name",
        type: "textInput"
      },
      {
        name: "Name",
        index: "name",
        type: "textInput"
      }
    ]
  };

  getControl(field: any) {
    return this.elementTypeForm.controls[field];
  }
}
