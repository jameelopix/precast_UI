import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProjectService } from "../services/project.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";
import { CompanyService } from "../services/company.service";
import { UIService } from "../services/ui.service";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"]
})
export class ProjectComponent implements OnInit {
  projectDTOList: any[] = [];
  projectDialogVisibilty: boolean = false;
  projectForm: FormGroup;
  projectSearchForm: FormGroup;

  messages: any[] = [];

  result: any = null;

  constructor(
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

  fetchReleventData() {}

  createFormGroup() {
    this.projectForm = this.formBuilder.group({
      id: [null],
      code: ["", Validators.required],
      name: ["", Validators.required]
    });

    this.projectSearchForm = this.formBuilder.group({
      nameList: [""],
      codeList: [""]
    });
  }

  addProject = () => {
    this.projectForm.reset();
    this.projectDialogVisibilty = true;
  };

  editProject = rowData => {
    this.populateProjectForm(rowData, false);
    this.projectDialogVisibilty = true;
  };

  copyProject = rowData => {
    this.populateProjectForm(rowData);
    this.projectDialogVisibilty = true;
  };

  populateProjectForm(rowData: any, makeIdNull: boolean = true) {
    this.projectForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      name: rowData["name"],
      code: rowData["code"]
    };

    this.projectForm.setValue(formValue);
  }

  saveProject = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.projectForm.getRawValue();

    let request = {
      projectDTO: {
        id: formData["id"],
        name: formData["name"],
        code: formData["code"]
      }
    };

    this.projectService.save(
      request,
      this.saveProjectSuccessCallback,
      this.saveProjectErrorCallback
    );
  };

  saveProjectSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.projectDialogVisibilty = false;
    this.getProject();
  };

  saveProjectErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelProject = () => {
    this.projectForm.reset();
    this.projectDialogVisibilty = false;
  };

  getProject = () => {
    let searchFormData = this.projectSearchForm.getRawValue();

    let request = {
      projectSearchDTO: {
        nameList: this.uiservice.getSearchData(searchFormData, "nameList"),
        codeList: this.uiservice.getSearchData(searchFormData, "codeList")
      }
    };

    this.projectDTOList = [];
    this.projectService.get(request, this.getProjectCallback);
  };

  getProjectCallback = (response: any) => {
    this.projectDTOList = response.projectDTOList;
  };

  deleteProject = rowData => {
    this.messageUtilService.clearMessage(this.messages);

    this.projectService.delete(
      rowData["id"],
      this.deleteProjectSuccessCallback,
      this.deleteProjectErrorCallback
    );
  };

  deleteProjectSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getProject();
  };

  deleteProjectErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  projectOptions: any = {
    caption: "Project Details",
    addCallback: this.addProject,
    editCallback: this.editProject,
    copyCallback: this.copyProject,
    getCallback: this.getProject,
    deleteCallback: this.deleteProject,
    childPresent: true,
    columns: [
      {
        name: "Project Name",
        index: "name",
        type: "textInput"
      },
      {
        name: "Project Code",
        index: "code",
        type: "textInput"
      }
    ]
  };

  getControl(field: any) {
    return this.projectForm.controls[field];
  }
}
