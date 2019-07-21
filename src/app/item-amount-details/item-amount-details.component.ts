import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ItemAmountDetailsService } from "../services/item-amount-details.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";
import { CompanyService } from "../services/company.service";
import { UIService } from "../services/ui.service";
import { VendorService } from "../services/vendor.service";
import { PurchaseRegisterService } from "../services/purchase-register.service";

@Component({
  selector: "app-item-amount-details",
  templateUrl: "./item-amount-details.component.html",
  styleUrls: ["./item-amount-details.component.css"]
})
export class ItemAmountDetailsComponent implements OnInit {
  itemAmountDetailsDTOList: any[] = [];
  itemAmountDetailsDialogVisibilty: boolean = false;
  itemAmountDetailsForm: FormGroup;
  itemAmountDetailsSearchForm: FormGroup;

  vendorList: any[] = [];
  purchaseRegisterDTOList: any[] = [];
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
    private itemAmountDetailsService: ItemAmountDetailsService,
    private vendorService: VendorService,
    private purchaseRegisterService: PurchaseRegisterService,
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
    this.getVendorDTOList();
  }

  getVendorDTOList() {
    this.vendorService.get({}, (response: any) => {
      this.vendorList = response["vendorDTOList"];
    });
  }

  getPurchaseRegister() {
    let searchFormData = this.itemAmountDetailsForm.getRawValue();

    let request = {
      purchaseRegisterSearchDTO: {
        vendorIdList: this.uiservice.getSearchData(
          searchFormData,
          "vendorIdList"
        ),
        vendorNeeded: true
      }
    };

    this.purchaseRegisterDTOList = [];
    this.purchaseRegisterService.get(request, this.getPurchaseRegisterCallback);
  }

  getPurchaseRegisterCallback = (response: any) => {
    this.purchaseRegisterDTOList = response.purchaseRegisterDTOList;
  };

  createFormGroup() {
    this.itemAmountDetailsForm = this.formBuilder.group({
      id: [null],
      vendorDTOId: ["", Validators.required],
      dcNo: ["", Validators.required],
      total: [""],
      invoiceChecked: [""]
    });

    this.itemAmountDetailsSearchForm = this.formBuilder.group({
      vendorDTOIdList: [""],
      dcNoList: [""],
      totalList: [""],
      invoiceCheckedList: [""]
    });
  }

  addItemAmountDetails = () => {
    this.itemAmountDetailsForm.reset();
    this.itemAmountDetailsDialogVisibilty = true;
  };

  editItemAmountDetails = rowData => {
    this.populateItemAmountDetailsForm(rowData, false);
    this.itemAmountDetailsDialogVisibilty = true;
  };

  copyItemAmountDetails = rowData => {
    this.populateItemAmountDetailsForm(rowData);
    this.itemAmountDetailsDialogVisibilty = true;
  };

  populateItemAmountDetailsForm(rowData: any, makeIdNull: boolean = true) {
    this.itemAmountDetailsForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      vendorDTOId: { id: rowData["vendorDTOId"] },
      dcNo: { id: rowData["dcNo"] },
      total: rowData["total"],
      invoiceChecked: rowData["accountName"]
    };

    this.itemAmountDetailsForm.setValue(formValue);
  }

  saveItemAmountDetails = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.itemAmountDetailsForm.getRawValue();

    let request = {
      itemAmountDetailsDTO: {
        id: formData["id"],
        vendorDTOId: formData["vendorDTOId"]["id"],
        dcNo: formData["dcNo"]["id"],
        total: formData["total"],
        invoiceChecked: formData["invoiceChecked"]
      }
    };

    this.itemAmountDetailsService.save(
      request,
      this.saveItemAmountDetailsSuccessCallback,
      this.saveItemAmountDetailsErrorCallback
    );
  };

  saveItemAmountDetailsSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.itemAmountDetailsDialogVisibilty = false;
    this.getItemAmountDetails();
  };

  saveItemAmountDetailsErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelItemAmountDetails = () => {
    this.itemAmountDetailsForm.reset();
    this.itemAmountDetailsDialogVisibilty = false;
  };

  getItemAmountDetails = () => {
    let searchFormData = this.itemAmountDetailsSearchForm.getRawValue();

    let request = {
      itemAmountDetailsSearchDTO: {
        vendorDTOIdList: this.uiservice.getSearchData(
          searchFormData,
          "vendorDTOIdList"
        ),
        dcNoList: this.uiservice.getSearchData(searchFormData, "dcNoList"),
        totalList: this.uiservice.getSearchData(searchFormData, "totalList"),
        invoiceCheckedList: this.uiservice.getSearchData(
          searchFormData,
          "invoiceCheckedList"
        ),
        vendorNeeded: true
      }
    };

    this.itemAmountDetailsDTOList = [];
    this.itemAmountDetailsService.get(
      request,
      this.getItemAmountDetailsCallback
    );
  };

  getItemAmountDetailsCallback = (response: any) => {
    this.itemAmountDetailsDTOList = response.itemAmountDetailsDTOList;
  };

  deleteItemAmountDetails = rowData => {
    this.messageUtilService.clearMessage(this.messages);

    this.itemAmountDetailsService.delete(
      rowData["id"],
      this.deleteItemAmountDetailsSuccessCallback,
      this.deleteItemAmountDetailsErrorCallback
    );
  };

  deleteItemAmountDetailsSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getItemAmountDetails();
  };

  deleteItemAmountDetailsErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  itemAmountDetailsOptions: any = {
    caption: "Item Amount Details",
    addCallback: this.addItemAmountDetails,
    editCallback: this.editItemAmountDetails,
    copyCallback: this.copyItemAmountDetails,
    getCallback: this.getItemAmountDetails,
    deleteCallback: this.deleteItemAmountDetails,
    childPresent: true,
    columns: [
      {
        name: "Vendor",
        index: "vendorDTO.name"
      },
      {
        name: "DC No.",
        index: "dcNo"
      },
      {
        name: "Total",
        index: "total"
      },
      {
        name: "Invoice Checked",
        index: "invoiceChecked"
      }
    ]
  };

  getControl(field: any) {
    return this.itemAmountDetailsForm.controls[field];
  }
}
