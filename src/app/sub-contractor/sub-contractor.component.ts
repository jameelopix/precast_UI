import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SubContractorService } from "../services/sub-contractor.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";
import { UIService } from "../services/ui.service";
import { FinancialDetailService } from "../services/financial-detail.service";
import { AddressService } from "../services/address.service";

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

  address: any = {};
  addressDialogVisibilty: boolean = false;
  addressForm: FormGroup;

  financialDetail: any[] = [];
  financialDetailDialogVisibilty: boolean = false;
  financialDetailForm: FormGroup;

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
    private financialDetailService: FinancialDetailService,
    private addressService: AddressService,
    private messageUtilService: MessageUtilService,
    private uiservice: UIService,
    private formBuilder: FormBuilder
  ) {
    this.createFormGroup();
  }

  ngOnInit() {
    this.fetchReleventData();
  }

  fetchReleventData() { }

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

    this.financialDetailForm = this.formBuilder.group({
      id: [null],
      gst: [""],
      pan: [""]
    });

    this.addressForm = this.formBuilder.group({
      id: [null],
      addressLine1: [""],
      addressLine2: [""],
      landmark: [""],
      city: [""],
      state: [""],
      country: [""],
      mobNo: [""],
      pincode: [""]
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

  populateAddressForm(rowData: any) {
    this.addressForm.reset();

    let formValue = {};
    if (rowData) {
      formValue = {
        id: rowData["id"],
        addressLine1: rowData["addressLine1"],
        addressLine2: rowData["addressLine2"],
        landmark: rowData["landmark"],
        city: rowData["city"],
        state: rowData["state"],
        country: rowData["country"],
        mobNo: rowData["mobNo"],
        pincode: rowData["pincode"],
      };
    }

    this.addressForm.patchValue(formValue);
  }

  populateFinancialDetailForm(rowData: any) {
    this.financialDetailForm.reset();

    let formValue = {};
    if (rowData) {
      formValue = {
        id: rowData["id"],
        gst: rowData["gst"],
        pan: rowData["pan"]
      };
    }

    this.financialDetailForm.patchValue(formValue);
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

  getAddress = rowData => {
    let addressId = rowData["addressId"];

    if (addressId) {
      let request = {
        addressSearchDTO: {
          idList: addressId
        }
      }
      this.addressService.get(request, this.getAddressSuccessCallback);
    } else {
      this.addressDialogVisibilty = true;
    }
  };

  getAddressSuccessCallback = (response: any) => {
    this.populateAddressForm(response["addressDTOList"][0]);

    this.addressDialogVisibilty = true;
  };

  getFinance = rowData => {
    let financialDetailId = rowData["financialDetailId"];

    if (financialDetailId) {
      let request = {
        financialDetailSearchDTO: {
          idList: financialDetailId
        }
      }
      this.financialDetailService.get(request, this.getFinancialDetailSuccessCallback);
    } else {
      this.financialDetailDialogVisibilty = true;
    }
  };

  getFinancialDetailSuccessCallback = (response: any) => {
    this.populateFinancialDetailForm(response["financialDetailDTOList"][0]);

    this.financialDetailDialogVisibilty = true;
  };

  cancelFinancialDetail = () => {
    this.financialDetailForm.reset();
    this.financialDetailDialogVisibilty = false;
  };

  saveFinancialDetail = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.financialDetailForm.getRawValue();

    let request = {
      financialDetailDTO: {
        id: formData["id"],
        gst: formData["gst"],
        pan: formData["pan"]
      }
    };

    this.financialDetailService.save(
      request,
      this.saveFinancialDetailSuccessCallback,
      this.saveFinancialDetailErrorCallback
    );
  };

  saveFinancialDetailSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
  };

  saveFinancialDetailErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelAddress = () => {
    this.addressForm.reset();
    this.addressDialogVisibilty = false;
  };

  saveAddress = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.addressForm.getRawValue();

    let request = {
      addressDTO: {
        id: formData["id"],
        addressLine1: formData["addressLine1"],
        addressLine2: formData["addressLine2"],
        landmark: formData["landmark"],
        city: formData["city"],
        state: formData["state"],
        country: formData["country"],
        mobNo: formData["mobNo"],
        pincode: formData["pincode"]
      }
    };

    this.addressService.save(
      request,
      this.saveAddressSuccessCallback,
      this.saveAddressErrorCallback
    );
  };

  saveAddressSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
  };

  saveAddressErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  actionItems = [
    {
      label: "Address",
      icon: "pi pi-fw pi-plus",
      action: this.getAddress
    },
    {
      label: "Finance",
      icon: "pi pi-fw pi-plus",
      action: this.getFinance
    }
  ];

  subContractorOptions: any = {
    caption: "SubContractor Details",
    addCallback: this.addSubContractor,
    editCallback: this.editSubContractor,
    copyCallback: this.copySubContractor,
    getCallback: this.getSubContractor,
    deleteCallback: this.deleteSubContractor,
    actions: this.actionItems,
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