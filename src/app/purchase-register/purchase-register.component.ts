import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PurchaseRegisterService } from "../services/purchase-register.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";
import { CompanyService } from "../services/company.service";
import { UIService } from "../services/ui.service";
import { VendorService } from "../services/vendor.service";

@Component({
  selector: "app-purchase-register",
  templateUrl: "./purchase-register.component.html",
  styleUrls: ["./purchase-register.component.css"]
})
export class PurchaseRegisterComponent implements OnInit {
  purchaseRegisterDTOList: any[] = [];
  purchaseRegisterDialogVisibilty: boolean = false;
  purchaseRegisterForm: FormGroup;
  purchaseRegisterSearchForm: FormGroup;

  vendorList: any[] = [];

  messages: any[] = [];

  result: any = null;

  constructor(
    private purchaseRegisterService: PurchaseRegisterService,
    private vendorService: VendorService,
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

  createFormGroup() {
    this.purchaseRegisterForm = this.formBuilder.group({
      id: [null],
      vendorDTOId: ["", Validators.required],
      weighBridgeNo: ["", Validators.required]
    });

    this.purchaseRegisterSearchForm = this.formBuilder.group({
      vendorIdList: [""],
      weighBridgeNoList: [""]
    });
  }

  addPurchaseRegister = () => {
    this.purchaseRegisterForm.reset();
    this.purchaseRegisterDialogVisibilty = true;
  };

  editPurchaseRegister = rowData => {
    this.populatePurchaseRegisterForm(rowData, false);
    this.purchaseRegisterDialogVisibilty = true;
  };

  copyPurchaseRegister = rowData => {
    this.populatePurchaseRegisterForm(rowData);
    this.purchaseRegisterDialogVisibilty = true;
  };

  populatePurchaseRegisterForm(rowData: any, makeIdNull: boolean = true) {
    this.purchaseRegisterForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      vendorDTOId: { id: rowData["vendorDTOId"] },
      weighBridgeNo: rowData["weighBridgeNo"]
    };

    this.purchaseRegisterForm.setValue(formValue);
  }

  savePurchaseRegister = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.purchaseRegisterForm.getRawValue();

    let request = {
      purchaseRegisterDTO: {
        id: formData["id"],
        vendorDTOId: formData["vendorDTOId"]["id"],
        weighBridgeNo: formData["weighBridgeNo"]
      }
    };

    this.purchaseRegisterService.save(
      request,
      this.savePurchaseRegisterSuccessCallback,
      this.savePurchaseRegisterErrorCallback
    );
  };

  savePurchaseRegisterSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.purchaseRegisterDialogVisibilty = false;
    this.getPurchaseRegister();
  };

  savePurchaseRegisterErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelPurchaseRegister = () => {
    this.purchaseRegisterForm.reset();
    this.purchaseRegisterDialogVisibilty = false;
  };

  getPurchaseRegister = () => {
    let searchFormData = this.purchaseRegisterSearchForm.getRawValue();

    let request = {
      purchaseRegisterSearchDTO: {
        vendorIdList: this.uiservice.getSearchData(
          searchFormData,
          "vendorIdList"
        ),
        weighBridgeNoList: this.uiservice.getSearchData(
          searchFormData,
          "weighBridgeNoList"
        ),
        vendorNeeded: true
      }
    };

    this.purchaseRegisterDTOList = [];
    this.purchaseRegisterService.get(request, this.getPurchaseRegisterCallback);
  };

  getPurchaseRegisterCallback = (response: any) => {
    this.purchaseRegisterDTOList = response.purchaseRegisterDTOList;
  };

  deletePurchaseRegister = rowData => {
    this.messageUtilService.clearMessage(this.messages);

    this.purchaseRegisterService.delete(
      rowData["id"],
      this.deletePurchaseRegisterSuccessCallback,
      this.deletePurchaseRegisterErrorCallback
    );
  };

  deletePurchaseRegisterSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getPurchaseRegister();
  };

  deletePurchaseRegisterErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  purchaseRegisterOptions: any = {
    caption: "PurchaseRegister Details",
    addCallback: this.addPurchaseRegister,
    editCallback: this.editPurchaseRegister,
    copyCallback: this.copyPurchaseRegister,
    getCallback: this.getPurchaseRegister,
    deleteCallback: this.deletePurchaseRegister,
    childPresent: true,
    columns: [
      {
        name: "Vendor Name",
        index: "vendorDTO.name"
      },
      {
        name: "Weigh Bridge No",
        index: "weighBridgeNo"
      }
    ]
  };

  getControl(field: any) {
    return this.purchaseRegisterForm.controls[field];
  }
}
