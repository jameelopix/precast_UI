import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ElementService } from "../services/element.service";
import { ProjectService } from "../services/project.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";
import { CompanyService } from "../services/company.service";
import { UIService } from "../services/ui.service";
import { ElementTypeService } from "../services/element-type.service";

@Component({
  selector: "app-element-details",
  templateUrl: "./element-details.component.html",
  styleUrls: ["./element-details.component.css"]
})
export class ElementDetailsComponent implements OnInit {
  elementDTOList: any[] = [];
  elementDialogVisibilty: boolean = false;
  elementForm: FormGroup;
  elementSearchForm: FormGroup;

  projectDTOList: any[] = [];
  elementTypeDTOList: any[] = [];

  messages: any[] = [];

  result: any = null;

  constructor(
    private elementService: ElementService,
    private projectService: ProjectService,
    private elementTypeService: ElementTypeService,
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
    this.getElementTypeDTOList();
  }

  getProjectDTOList() {
    this.projectService.get({}, (response: any) => {
      this.projectDTOList = response["projectDTOList"];
    });
  }

  getElementTypeDTOList() {
    this.elementTypeService.get({}, (response: any) => {
      this.elementTypeDTOList = response["elementTypeDTOList"];
    });
  }

  createFormGroup() {
    this.elementForm = this.formBuilder.group({
      id: [null],
      name: ["", Validators.required],
      floor: [""],
      projectId: ["", Validators.required],
      elementTypeId: ["", Validators.required]
    });

    this.elementSearchForm = this.formBuilder.group({
      nameList: [""],
      floorList: [""],
      projectIdList: [""],
      elementTypeIdList: [""]
    });
  }

  addElement = () => {
    this.elementForm.reset();
    this.elementDialogVisibilty = true;
  };

  editElement = rowData => {
    this.populateElementForm(rowData, false);
    this.elementDialogVisibilty = true;
  };

  copyElement = rowData => {
    this.populateElementForm(rowData);
    this.elementDialogVisibilty = true;
  };

  populateElementForm(rowData: any, makeIdNull: boolean = true) {
    this.elementForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      projectId: { id: rowData["projectId"] },
      elementTypeId: { id: rowData["elementTypeId"] },
      name: rowData["name"],
      floor: rowData["floor"]
    };

    this.elementForm.setValue(formValue);
  }

  saveElement = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.elementForm.getRawValue();

    let request = {
      elementDTO: {
        id: formData["id"],
        projectId: formData["projectId"]["id"],
        elementTypeId: formData["elementTypeId"]["id"],
        name: formData["name"],
        floor: formData["floor"]
      }
    };

    this.elementService.save(
      request,
      this.saveElementSuccessCallback,
      this.saveElementErrorCallback
    );
  };

  saveElementSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.elementDialogVisibilty = false;
    this.getElement();
  };

  saveElementErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelElement = () => {
    this.elementForm.reset();
    this.elementDialogVisibilty = false;
  };

  getElement = () => {
    let searchFormData = this.elementSearchForm.getRawValue();

    let request = {
      elementSearchDTO: {
        nameList: this.uiservice.getSearchData(searchFormData, "nameList"),
        floorList: this.uiservice.getSearchData(searchFormData, "floorList"),
        projectIdList: this.uiservice.getSearchData(
          searchFormData,
          "projectIdList"
        ),
        elementTypeIdList: this.uiservice.getSearchData(
          searchFormData,
          "elementTypeIdList"
        ),
        projectNeeded: true,
        elementTypeNeeded: true
      }
    };

    this.elementDTOList = [];
    this.elementService.get(request, this.getElementCallback);
  };

  getElementCallback = (response: any) => {
    this.elementDTOList = response.elementDTOList;
  };

  deleteElement = rowData => {
    this.messageUtilService.clearMessage(this.messages);

    this.elementService.delete(
      rowData["id"],
      this.deleteElementSuccessCallback,
      this.deleteElementErrorCallback
    );
  };

  deleteElementSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getElement();
  };

  deleteElementErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  elementOptions: any = {
    caption: "Element Details",
    addCallback: this.addElement,
    editCallback: this.editElement,
    copyCallback: this.copyElement,
    getCallback: this.getElement,
    deleteCallback: this.deleteElement,
    childPresent: true,
    columns: [
      {
        name: "Name",
        index: "name",
        type: "textInput"
      },
      {
        name: "Floor",
        index: "floor",
        type: "textInput"
      },
      {
        name: "Project",
        index: "projectDTO.name",
        type: "textInput"
      },
      {
        name: "Element Type",
        index: "elementTypeDTO.name",
        type: "textInput"
      }
    ]
  };

  getControl(field: any) {
    return this.elementForm.controls[field];
  }
}
