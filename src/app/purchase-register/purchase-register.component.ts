import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PurchaseRegisterService } from "../services/purchase-register.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";
import { CompanyService } from "../services/company.service";
import { UIService } from "../services/ui.service";
import { VendorService } from "../services/vendor.service";
import { PurchaseRegisterItemService } from "../services/purchase-register-item.service";
import { PurchaseOrderService } from "../services/purchase-order.service";
import { PurchaseOrderItemService } from "../services/purchase-order-item.service";
import { ConfigService } from "../services/config.service";

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

  purchaseRegisterItemDTOList: any[] = [];
  purchaseRegisterItemDialogVisibilty: boolean = false;
  purchaseRegisterItemForm: FormGroup;

  vendorList: any[] = [];
  purchaseOrderList: any[] = [];
  purchaseOrderItemList: any[] = [];
  unitList: any[] = [];

  messages: any[] = [];

  result: any = null;

  constructor(
    private purchaseRegisterService: PurchaseRegisterService,
    private purchaseRegisterItemService: PurchaseRegisterItemService,
    private purchaseOrderService: PurchaseOrderService,
    private purchaseOrderItemService: PurchaseOrderItemService,
    private vendorService: VendorService,
    private messageUtilService: MessageUtilService,
    private uiservice: UIService,
    private configService: ConfigService,
    private formBuilder: FormBuilder
  ) {
    this.createFormGroup();
  }

  ngOnInit() {
    this.fetchReleventData();
  }

  fetchReleventData() {
    this.getVendorDTOList();
    this.getUnitConfigList();
  }

  getUnitConfigList() {
    this.configService.getConfigList(
      "SUPPORTED_UNIT_Weight",
      this.weightSuccessCallback
    );
  }

  weightSuccessCallback = (response: any) => {
    this.unitList = this.uiservice.getDropdownlist(response["values"]);
  };

  getVendorDTOList() {
    this.vendorService.get({}, (response: any) => {
      this.vendorList = response["vendorDTOList"];
    });
  }

  onVendorChange(event: any) {
    let value = event["value"];
    // console.log(JSON.stringify(value));

    let request = {
      purchaseOrderSearchDTO: {
        vendorDTOIdList: [value["id"]],
        purchaseOrderStatusList: ["OPEN"],
        vendorNeeded: false
      }
    };
    this.purchaseOrderService.get(request, (response: any) => {
      // this.purchaseOrderList = response["purchaseOrderList"];
      this.purchaseOrderList = response.purchaseOrderDTOList;
    });
  }

  onUnitChange(event: any) {
    let value = event["value"];

    let formValue = {
      dcUnit: value,
      weighBridgeUnit: value,
      deductionUnit: value,
      netUnit: value
    };
    this.purchaseRegisterItemForm.patchValue(formValue);
  }

  // onPurchaseOrderChange
  onPurchaseOrderChange(event: any) {
    let value = event["value"];
    // console.log(JSON.stringify(value));

    let request = {
      purchaseOrderItemSearchDTO: {
        purchaseOrderDTOIdList: [value["id"]]
      }
    };
    this.purchaseOrderItemService.get(request, (response: any) => {
      // this.purchaseOrderList = response["purchaseOrderList"];
      this.purchaseOrderItemList = response.purchaseOrderItemDTOList;
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

    this.purchaseRegisterItemForm = this.formBuilder.group({
      id: [null],
      purchaseRegisterDTOId: [""],
      vendorId: ["", Validators.required],
      purchaseOrderDTOId: ["", Validators.required],
      purchaseOrderItemDTOId: ["", Validators.required],
      dcQuantity: [""],
      dcUnit: [""],
      weighBridgeQuantity: [""],
      weighBridgeUnit: [""],
      deductionQuantity: [""],
      deductionUnit: [""],
      netQuantity: [""],
      netUnit: [""]
    });
  }

  // Purchase Register Functionality
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

  // Purchase Register Item Functionality
  addPurchaseRegisterItem = parentValue => {
    this.purchaseRegisterItemForm.reset();

    let formValue = {
      purchaseRegisterDTOId: parentValue["id"]
    };
    this.purchaseRegisterItemForm.patchValue(formValue);

    this.purchaseRegisterItemDialogVisibilty = true;
  };

  editPurchaseRegisterItem = (rowData, parentValue) => {
    this.populatePurchaseRegisterItemForm(rowData, parentValue, false);
    this.purchaseRegisterItemDialogVisibilty = true;
  };

  copyPurchaseRegisterItem = (rowData, parentValue) => {
    this.populatePurchaseRegisterItemForm(rowData, parentValue);
    this.purchaseRegisterItemDialogVisibilty = true;
  };

  populatePurchaseRegisterItemForm(
    rowData: any,
    parentValue,
    makeIdNull: boolean = true
  ) {
    this.purchaseRegisterItemForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      purchaseRegisterDTOId: parentValue["id"],
      purchaseOrderItemDTOId: { id: rowData["purchaseOrderItemDTOId"] },
      dcQuantity: rowData["bankName"],
      dcUnit: { id: rowData["accountName"] },
      weighBridgeQuantity: rowData["weighBridgeQuantity"],
      weighBridgeUnit: { id: rowData["weighBridgeUnit"] },
      deductionQuantity: rowData["deductionQuantity"],
      deductionUnit: { id: rowData["deductionUnit"] },
      netQuantity: rowData["netQuantity"],
      netUnit: { id: rowData["netUnit"] }
    };

    this.purchaseRegisterItemForm.setValue(formValue);
  }

  savePurchaseRegisterItem = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.purchaseRegisterItemForm.getRawValue();

    let purchaseRegisterDTOId = formData["purchaseRegisterDTOId"];

    let request = {
      purchaseRegisterItemDTO: {
        id: formData["id"],
        purchaseRegisterDTOId: purchaseRegisterDTOId,
        purchaseOrderItemDTOId: formData["purchaseOrderItemDTOId"]["id"],
        dcQuantity: formData["dcQuantity"],
        dcUnit: formData["dcUnit"]["id"],
        weighBridgeQuantity: formData["weighBridgeQuantity"],
        weighBridgeUnit: formData["weighBridgeUnit"]["id"],
        deductionQuantity: formData["deductionQuantity"],
        deductionUnit: formData["deductionUnit"]["id"],
        netQuantity: formData["netQuantity"],
        netUnit: formData["netUnit"]["id"]
      }
    };

    this.purchaseRegisterItemService.save(
      request,
      (response: any) => {
        this.savePurchaseRegisterItemSuccessCallback(
          response,
          purchaseRegisterDTOId
        );
      },
      this.savePurchaseRegisterItemErrorCallback
    );
  };

  savePurchaseRegisterItemSuccessCallback = (
    response: any,
    purchaseRegisterDTOId
  ) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.purchaseRegisterItemDialogVisibilty = false;
    this.getPurchaseRegisterItem({ id: purchaseRegisterDTOId });
  };

  savePurchaseRegisterItemErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelPurchaseRegisterItem = () => {
    this.purchaseRegisterItemForm.reset();
    this.purchaseRegisterItemDialogVisibilty = false;
  };

  getPurchaseRegisterItem = parentValue => {
    let request = {
      purchaseRegisterItemSearchDTO: {
        purchaseRegisterDTOIdList: [parentValue["id"]],
        purchaseOrderItemNeeded: true
      }
    };

    this.purchaseRegisterItemDTOList = [];
    this.purchaseRegisterItemService.get(
      request,
      this.getPurchaseRegisterItemCallback
    );
  };

  getPurchaseRegisterItemCallback = (response: any) => {
    let arr = [];
    response.purchaseRegisterItemDTOList.forEach(element => {
      let obj = this.uiservice.deepClone(element);

      // obj['id'] = element['id'];
      // obj['purchaseRegisterDTOId'] = element['purchaseRegisterDTOId'];
      // obj['purchaseOrderItemDTOId'] = element['purchaseOrderItemDTOId'];
      obj["purchaseOrderItemName"] =
        element["purchaseOrderItemDTO"]["itemName"];
      obj["dc"] = element["dcQuantity"] + " " + element["dcUnit"];
      obj["weighBridge"] =
        element["weighBridgeQuantity"] + " " + element["weighBridgeUnit"];
      obj["deduction"] =
        element["deductionQuantity"] + " " + element["deductionUnit"];
      obj["net"] = element["netQuantity"] + " " + element["netUnit"];

      arr.push(obj);
    });
    this.purchaseRegisterItemDTOList = arr;
    // this.purchaseRegisterItemDTOList = response.purchaseRegisterItemDTOList;
  };

  deletePurchaseRegisterItem = (rowData, parentValue) => {
    this.messageUtilService.clearMessage(this.messages);

    this.purchaseRegisterItemService.delete(
      rowData["id"],
      (response: any) => {
        this.deletePurchaseRegisterItemSuccessCallback(response, parentValue);
      },
      this.deletePurchaseRegisterItemErrorCallback
    );
  };

  deletePurchaseRegisterItemSuccessCallback = (response: any, parentValue) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getPurchaseRegisterItem(parentValue);
  };

  deletePurchaseRegisterItemErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  purchaseRegisterItemOptions: any = {
    caption: "Purchase Register Item Details",
    addCallback: this.addPurchaseRegisterItem,
    editCallback: this.editPurchaseRegisterItem,
    copyCallback: this.copyPurchaseRegisterItem,
    getCallback: this.getPurchaseRegisterItem,
    deleteCallback: this.deletePurchaseRegisterItem,
    childPresent: true,
    columns: [
      {
        name: "Name",
        index: "purchaseOrderItemName"
      },
      {
        name: "DC Quantity",
        index: "dc"
      },
      {
        name: "Weigh Bridge Quantity",
        index: "weighBridge"
      },
      {
        name: "Deduction Quantity",
        index: "deduction"
      },
      {
        name: "Net Quantity",
        index: "net"
      }
    ]
  };

  purchaseRegisterOptions: any = {
    caption: "Purchase Register Details",
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
    ],
    childGridOptions: [this.purchaseRegisterItemOptions]
  };

  getControl(field: any) {
    return this.purchaseRegisterForm.controls[field];
  }

  getItemControl(field: any) {
    return this.purchaseRegisterItemForm.controls[field];
  }
}
