import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LabourRateService } from "../services/labour-rate.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";
import { UIService } from "../services/ui.service";
import { ProjectService } from "../services/project.service";
import { ElementTypeService } from "../services/element-type.service";

@Component({
  selector: 'app-labour-rate',
  templateUrl: './labour-rate.component.html',
  styleUrls: ['./labour-rate.component.css']
})
export class LabourRateComponent implements OnInit {
  labourRateDTOList: any[] = [];
  labourRateDialogVisibilty: boolean = false;
  labourRateForm: FormGroup;
  labourRateSearchForm: FormGroup;

  projectDTOList: any[] = [];
  elementTypeDTOList: any[] = [];

  messages: any[] = [];

  constructor(
    private labourRateService: LabourRateService,
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
  }

  getProjectDTOList() {
    this.projectService.get({}, (response: any) => {
      this.projectDTOList = response["projectDTOList"];
    });
  }

  onProjectChange(event: any) {
    let value = event["value"];
    // console.log(JSON.stringify(value));

    let request = {
      elementTypeSearchDTO: {
        projectIdList: [value["id"]]
      }
    };
    this.elementTypeService.get(request, (response: any) => {
      this.elementTypeDTOList = response.elementTypeDTOList;
    });
  }

  createFormGroup() {
    this.labourRateForm = this.formBuilder.group({
      id: [null],
      workType: ["", Validators.required],
      workDesc: [""],
      rate: ["", Validators.required],
      unit: ["", Validators.required],
      projectId: ["", Validators.required],
      elementTypeId: ["", Validators.required]
    });

    this.labourRateSearchForm = this.formBuilder.group({
      workTypeList: [""],
      workDescList: [""],
      rateList: [""],
      unitList: [""],
      projectIdList: [""],
      elementTypeIdList: [""]
    });
  }

  addLabourRate = () => {
    this.labourRateForm.reset();
    this.labourRateDialogVisibilty = true;
  };

  editLabourRate = rowData => {
    this.populateLabourRateForm(rowData, false);
    this.labourRateDialogVisibilty = true;
  };

  copyLabourRate = rowData => {
    this.populateLabourRateForm(rowData);
    this.labourRateDialogVisibilty = true;
  };

  populateLabourRateForm(rowData: any, makeIdNull: boolean = true) {
    this.labourRateForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      workType: { id: rowData["workType"] },
      projectId: { id: rowData["projectId"] },
      elementTypeId: { id: rowData["elementTypeId"] },
      unit: { id: rowData["unit"] },
      rate: rowData["rate"],
      workDesc: rowData["workDesc"]
    };

    this.labourRateForm.setValue(formValue);
  }

  saveLabourRate = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.labourRateForm.getRawValue();

    let request = {
      labourRateDTO: {
        id: formData["id"],
        workType: formData["workType"]["id"],
        projectId: formData["projectId"]["id"],
        elementTypeId: formData["elementTypeId"]["id"],
        unit: formData["unit"]["id"],
        rate: formData["rate"],
        workDesc: formData["workDesc"]
      }
    };

    this.labourRateService.save(
      request,
      this.saveLabourRateSuccessCallback,
      this.saveLabourRateErrorCallback
    );
  };

  saveLabourRateSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.labourRateDialogVisibilty = false;
    this.getLabourRate();
  };

  saveLabourRateErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelLabourRate = () => {
    this.labourRateForm.reset();
    this.labourRateDialogVisibilty = false;
  };

  getLabourRate = () => {
    let searchFormData = this.labourRateSearchForm.getRawValue();

    let request = {
      labourRateSearchDTO: {
        workTypeList: this.uiservice.getSearchData(
          searchFormData,
          "workTypeList"
        ),
        workDescList: this.uiservice.getSearchData(
          searchFormData,
          "workDescList"
        ),
        rateList: this.uiservice.getSearchData(
          searchFormData,
          "rateList"
        ),
        unitList: this.uiservice.getSearchData(
          searchFormData,
          "unitList"
        ),
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

    this.labourRateDTOList = [];
    this.labourRateService.get(request, this.getLabourRateCallback);
  };

  getLabourRateCallback = (response: any) => {
    this.labourRateDTOList = response.labourRateDTOList;
  };

  deleteLabourRate = rowData => {
    this.messageUtilService.clearMessage(this.messages);

    this.labourRateService.delete(
      rowData["id"],
      this.deleteLabourRateSuccessCallback,
      this.deleteLabourRateErrorCallback
    );
  };

  deleteLabourRateSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getLabourRate();
  };

  deleteLabourRateErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  labourRateOptions: any = {
    caption: "LabourRate Details",
    addCallback: this.addLabourRate,
    editCallback: this.editLabourRate,
    copyCallback: this.copyLabourRate,
    getCallback: this.getLabourRate,
    deleteCallback: this.deleteLabourRate,
    childPresent: true,
    columns: [
      {
        name: "Project",
        index: "projectDTO.name"
      },
      {
        name: "Element Type",
        index: "elementTypeDTO.name"
      },
      {
        name: "Work Type",
        index: "workType"
      },
      {
        name: "Description",
        index: "workDesc"
      },
      {
        name: "Rate",
        index: "rate"
      },
      {
        name: "Unit",
        index: "unit"
      }
    ]
  };

  getControl(field: any) {
    return this.labourRateForm.controls[field];
  }
}