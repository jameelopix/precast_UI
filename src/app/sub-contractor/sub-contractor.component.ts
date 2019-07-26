import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SubContractorService } from "../services/sub-contractor.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";
import { CompanyService } from "../services/company.service";
import { UIService } from "../services/ui.service";

@Component({
  selector: "app-sub-contractor",
  templateUrl: "./sub-contractor.component.html",
  styleUrls: ["./sub-contractor.component.css"]
})
export class SubContractorComponent implements OnInit {
  subContractorDTOList: any[] = [];
  subContractorDialogVisibilty: boolean = false;
  subContractorForm: FormGroup;
  subContractorSearchForm: FormGroup;

  statusList: any[] = [
    {
      id: "true",
      name: "Active"
    },
    {
      id: "false",
      name: "Inactive"
    }
  ];

  messages: any[] = [];

  result: any = null;

  constructor(
    private subContractorService: SubContractorService,
    private companyService: CompanyService,
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
    this.subContractorForm = this.formBuilder.group({
      id: [null],
      name: ["", Validators.required],
      code: ["", Validators.required]
    });

    this.subContractorSearchForm = this.formBuilder.group({
      codeList: [""],
      activeList: [""]
    });
  }

  addSubContractor = () => {
    this.subContractorForm.reset();
    this.subContractorDialogVisibilty = true;
  };

  editSubContractor = rowData => {
    this.populateSubContractorForm(rowData, false);
    this.subContractorDialogVisibilty = true;
  };

  copySubContractor = rowData => {
    this.populateSubContractorForm(rowData);
    this.subContractorDialogVisibilty = true;
  };

  populateSubContractorForm(rowData: any, makeIdNull: boolean = true) {
    this.subContractorForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      name: rowData["name"],
      code: rowData["code"]
    };

    this.subContractorForm.setValue(formValue);
  }

  saveSubContractor = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.subContractorForm.getRawValue();

    let request = {
      subContractorDTO: {
        id: formData["id"],
        name: formData["name"],
        code: formData["code"]
      }
    };

    this.subContractorService.save(
      request,
      this.saveSubContractorSuccessCallback,
      this.saveSubContractorErrorCallback
    );
  };

  saveSubContractorSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.subContractorDialogVisibilty = false;
    this.getSubContractor();
  };

  saveSubContractorErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelSubContractor = () => {
    this.subContractorForm.reset();
    this.subContractorDialogVisibilty = false;
  };

  getSubContractor = () => {
    let searchFormData = this.subContractorSearchForm.getRawValue();

    let request = {
      subContractorSearchDTO: {
        codeList: this.uiservice.getSearchData(searchFormData, "codeList"),
        activeList: this.uiservice.getSearchData(searchFormData, "activeList")
      }
    };

    this.subContractorDTOList = [];
    this.subContractorService.get(request, this.getSubContractorCallback);
  };

  getSubContractorCallback = (response: any) => {
    this.subContractorDTOList = response.subContractorDTOList;
  };

  deleteSubContractor = rowData => {
    this.messageUtilService.clearMessage(this.messages);

    this.subContractorService.delete(
      rowData["id"],
      this.deleteSubContractorSuccessCallback,
      this.deleteSubContractorErrorCallback
    );
  };

  deleteSubContractorSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getSubContractor();
  };

  deleteSubContractorErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  subContractorOptions: any = {
    caption: "SubContractor Details",
    addCallback: this.addSubContractor,
    editCallback: this.editSubContractor,
    copyCallback: this.copySubContractor,
    getCallback: this.getSubContractor,
    deleteCallback: this.deleteSubContractor,
    childPresent: true,
    columns: [
      {
        name: "Code",
        index: "code"
      },
      {
        name: "Name",
        index: "name"
      }
    ]
  };

  getControl(field: any) {
    return this.subContractorForm.controls[field];
  }
}
