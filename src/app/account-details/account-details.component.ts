import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AccountDetailsService } from "../services/account-detail.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";
import { CompanyService } from "../services/company.service";

@Component({
  selector: "app-account-details",
  templateUrl: "./account-details.component.html",
  styleUrls: ["./account-details.component.css"]
})
export class AccountDetailsComponent implements OnInit {
  accountDetailsDTOList: any[] = [];
  accountDetailsDialogVisibilty: boolean = false;
  accountDetailsForm: FormGroup;
  accountDetailsSearchForm: FormGroup;

  companyDTOList: any[] = [];
  accTypeList: any[] = [
    {
      id: "CASH",
      name: "CASH"
    },
    {
      id: "BANK",
      name: "BANK"
    }
  ];
  bankList: any[] = [
    {
      id: "AXIS",
      name: "AXIS"
    },
    {
      id: "ICICI",
      name: "ICICI"
    },
    {
      id: "SBI",
      name: "SBI"
    }
  ];

  messages: any[] = [];

  result: any = null;

  constructor(
    private accountDetailsService: AccountDetailsService,
    private companyService: CompanyService,
    private messageUtilService: MessageUtilService,
    private formBuilder: FormBuilder
  ) {
    this.createFormGroup();
  }

  ngOnInit() {
    this.fetchReleventData();
  }

  fetchReleventData() {
    this.getCompanyDTOList();
  }

  getCompanyDTOList() {
    this.companyService.get({}, (response: any) => {
      this.companyDTOList = response["companyDTOList"];
    });
  }

  createFormGroup() {
    this.accountDetailsForm = this.formBuilder.group({
      id: [null],
      company: ["", Validators.required],
      accType: ["", Validators.required],
      bank: [""],
      name: ["", Validators.required],
      accNo: [""]
    });

    this.accountDetailsSearchForm = this.formBuilder.group({
      names: [""]
    });
  }

  addAccountDetails = () => {
    this.accountDetailsForm.reset();
    this.accountDetailsDialogVisibilty = true;
  };

  editAccountDetails = rowData => {
    this.populateAccountDetailsForm(rowData, false);
    this.accountDetailsDialogVisibilty = true;
  };

  copyAccountDetails = rowData => {
    this.populateAccountDetailsForm(rowData);
    this.accountDetailsDialogVisibilty = true;
  };

  populateAccountDetailsForm(rowData: any, makeIdNull: boolean = true) {
    this.accountDetailsForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      name: rowData["name"]
    };

    this.accountDetailsForm.setValue(formValue);
  }

  searchAccountDetails = () => {
    let searchFormData = this.accountDetailsSearchForm.getRawValue();

    let request = {
      accountDetailsSearchDTO: {
        nameList: [searchFormData["names"]]
      }
    };

    this.result = request;

    this.accountDetailsService.get(request, this.getAccountDetailsCallback);
  };

  saveAccountDetails = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.accountDetailsForm.getRawValue();

    let request = {
      accountDetailsDTO: {
        id: formData["id"],
        name: formData["name"]
      }
    };

    this.accountDetailsService.save(
      request,
      this.saveAccountDetailsSuccessCallback,
      this.saveAccountDetailsErrorCallback
    );
  };

  saveAccountDetailsSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.accountDetailsDialogVisibilty = false;
    this.getAccountDetails();
  };

  saveAccountDetailsErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelAccountDetails = () => {
    this.accountDetailsForm.reset();
    this.accountDetailsDialogVisibilty = false;
  };

  getAccountDetails = () => {
    this.accountDetailsService.get({}, this.getAccountDetailsCallback);
  };

  getAccountDetailsCallback = (response: any) => {
    this.accountDetailsDTOList = response.accountDetailsDTOList;
  };

  deleteAccountDetails = rowData => {
    this.messageUtilService.clearMessage(this.messages);

    this.accountDetailsService.delete(
      rowData["id"],
      this.deleteAccountDetailsSuccessCallback,
      this.deleteAccountDetailsErrorCallback
    );
  };

  deleteAccountDetailsSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getAccountDetails();
  };

  deleteAccountDetailsErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  accountDetailsOptions: any = {
    caption: "AccountDetails Details",
    addCallback: this.addAccountDetails,
    editCallback: this.editAccountDetails,
    copyCallback: this.copyAccountDetails,
    getCallback: this.getAccountDetails,
    deleteCallback: this.deleteAccountDetails,
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
    return this.accountDetailsForm.controls[field];
  }
}
