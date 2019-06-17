import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CompanyService } from "../services/company.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.css"]
})
export class CompanyComponent implements OnInit {
  companyDTOList: any[] = [];
  companyDialogVisibilty: boolean = false;
  companyForm: FormGroup;
  companySearchForm: FormGroup;

  messages: any[] = [];

  result: any = null;

  constructor(
    private companyService: CompanyService,
    private messageUtilService: MessageUtilService,
    private formBuilder: FormBuilder
  ) {
    this.createFormGroup();
  }

  ngOnInit() {
    this.fetchReleventData();
  }

  fetchReleventData() {}

  createFormGroup() {
    this.companyForm = this.formBuilder.group({
      id: [null],
      name: ["", Validators.required]
    });

    this.companySearchForm = this.formBuilder.group({
      names: [""]
    });
  }

  addCompany = () => {
    this.companyForm.reset();
    this.companyDialogVisibilty = true;
  };

  editCompany = rowData => {
    this.populateCompanyForm(rowData, false);
    this.companyDialogVisibilty = true;
  };

  copyCompany = rowData => {
    this.populateCompanyForm(rowData);
    this.companyDialogVisibilty = true;
  };

  populateCompanyForm(rowData: any, makeIdNull: boolean = true) {
    this.companyForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      name: rowData["name"]
    };

    this.companyForm.setValue(formValue);
  }

  searchCompany = () => {
    let searchFormData = this.companySearchForm.getRawValue();

    let request = {
      companySearchDTO: {
        nameList: [searchFormData["names"]]
      }
    };

    this.result = request;

    this.companyService.get(request, this.getCompanyCallback);
  };

  saveCompany = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.companyForm.getRawValue();

    let request = {
      companyDTO: {
        id: formData["id"],
        name: formData["name"]
      }
    };

    this.companyService.save(
      request,
      this.saveCompanySuccessCallback,
      this.saveCompanyErrorCallback
    );
  };

  saveCompanySuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.companyDialogVisibilty = false;
    this.getCompany();
  };

  saveCompanyErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelCompany = () => {
    this.companyForm.reset();
    this.companyDialogVisibilty = false;
  };

  getCompany = () => {
    this.companyService.get({}, this.getCompanyCallback);
  };

  getCompanyCallback = (response: any) => {
    this.companyDTOList = response.companyDTOList;
  };

  deleteCompany = rowData => {
    this.messageUtilService.clearMessage(this.messages);

    this.companyService.delete(
      rowData["id"],
      this.deleteCompanySuccessCallback,
      this.deleteCompanyErrorCallback
    );
  };

  deleteCompanySuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getCompany();
  };

  deleteCompanyErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  companyOptions: any = {
    caption: "Company Details",
    addCallback: this.addCompany,
    editCallback: this.editCompany,
    copyCallback: this.copyCompany,
    getCallback: this.getCompany,
    deleteCallback: this.deleteCompany,
    childPresent: true,
    columns: [
      {
        name: "Name",
        index: "name",
        type: "textInput"
        // width: "45%"
      }
    ]
  };

  getControl(field: any) {
    return this.companyForm.controls[field];
  }
}