import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PurchaseOrderService } from "../services/purchase-order.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";
import { CompanyService } from "../services/company.service";
import { UIService } from "../services/ui.service";
import { VendorService } from "../services/vendor.service";
import { PurchaseOrderItemService } from "../services/purchase-order-item.service";
import { RawMaterialService } from "../services/raw-material.service";
import { ConfigService } from "../services/config.service";

@Component({
  selector: "app-purchase-order",
  templateUrl: "./purchase-order.component.html",
  styleUrls: ["./purchase-order.component.css"]
})
export class PurchaseOrderComponent implements OnInit {
  purchaseOrderDTOList: any[] = [];
  purchaseOrderDialogVisibilty: boolean = false;
  purchaseOrderForm: FormGroup;
  purchaseOrderSearchForm: FormGroup;

  purchaseOrderItemDTOList: any[] = [];
  purchaseOrderItemDialogVisibilty: boolean = false;
  purchaseOrderItemForm: FormGroup;

  vendorList: any[] = [];
  rawMaterialDTOList: any[] = [];
  unitList: any[] = [];
  statusList: any[] = [
    {
      id: "OPEN",
      name: "OPEN"
    },
    {
      id: "ISSUED",
      name: "ISSUED"
    },
    {
      id: "CLOSED",
      name: "CLOSED"
    }
  ];

  messages: any[] = [];

  result: any = null;

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private purchaseOrderItemService: PurchaseOrderItemService,
    private vendorService: VendorService,
    private rawMaterialService: RawMaterialService,
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
    this.getRawMaterialDTOList();
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

  getRawMaterialDTOList() {
    this.rawMaterialService.get({}, (response: any) => {
      let arr: any[] = [];

      response["rawMaterialDTOList"].forEach(element => {
        arr.push(element["name"]);
      });

      this.rawMaterialDTOList = this.uiservice.getDropdownlist(arr);
    });
  }

  getVendorDTOList() {
    this.vendorService.get({}, (response: any) => {
      this.vendorList = response["vendorDTOList"];
    });
  }

  createFormGroup() {
    this.purchaseOrderForm = this.formBuilder.group({
      id: [null],
      purchaseOrderNo: ["", Validators.required],
      vendorDTOId: ["", Validators.required],
      purchaseDate: ["", Validators.required],
      purchaseOrderStatus: [""]
    });

    this.purchaseOrderSearchForm = this.formBuilder.group({
      purchaseOrderStatusList: [""],
      vendorDTOIdList: [""]
    });

    this.purchaseOrderItemForm = this.formBuilder.group({
      id: [null],
      itemName: ["", Validators.required],
      quantity: ["", Validators.required],
      unit: ["", Validators.required],
      rate: ["", Validators.required],
      purchaseOrderDTOId: [""]
    });
  }

  // Purchase Order Functionality
  addPurchaseOrder = () => {
    this.purchaseOrderForm.reset();
    this.purchaseOrderDialogVisibilty = true;
  };

  editPurchaseOrder = rowData => {
    this.populatePurchaseOrderForm(rowData, false);
    this.purchaseOrderDialogVisibilty = true;
  };

  copyPurchaseOrder = rowData => {
    this.populatePurchaseOrderForm(rowData);
    this.purchaseOrderDialogVisibilty = true;
  };

  populatePurchaseOrderForm(rowData: any, makeIdNull: boolean = true) {
    this.purchaseOrderForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      vendorDTOId: { id: rowData["vendorDTOId"] },
      purchaseDate: new Date(rowData["purchaseDate"]),
      purchaseOrderNo: rowData["purchaseOrderNo"],
      purchaseOrderStatus: rowData["purchaseOrderStatus"]
    };

    this.purchaseOrderForm.setValue(formValue);
  }

  savePurchaseOrder = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.purchaseOrderForm.getRawValue();

    let request = {
      purchaseOrderDTO: {
        id: formData["id"],
        vendorDTOId: formData["vendorDTOId"]["id"],
        purchaseOrderStatus: formData["purchaseOrderStatus"],
        purchaseDate: formData["purchaseDate"],
        purchaseOrderNo: formData["purchaseOrderNo"]
      }
    };

    this.purchaseOrderService.save(
      request,
      this.savePurchaseOrderSuccessCallback,
      this.savePurchaseOrderErrorCallback
    );
  };

  savePurchaseOrderSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.purchaseOrderDialogVisibilty = false;
    this.getPurchaseOrder();
  };

  savePurchaseOrderErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  issueOrder = rowData => {
    this.purchaseOrderService.issuePurchaseOrder(
      rowData["id"],
      (response: any) => {
        this.messageUtilService.showSuccessMessages(
          this.messages,
          "Order have been issued Successfully!!!"
        );
      },
      (response: any) => {
        console.log(JSON.stringify(response));
      }
    );
  };

  closeOrder = rowData => {
    this.purchaseOrderService.closePurchaseOrder(
      rowData["id"],
      (response: any) => {
        this.messageUtilService.showSuccessMessages(
          this.messages,
          "Order have been closed Successfully!!!"
        );
      },
      (errors: any) => {
        this.messageUtilService.clearMessage(this.messages);
        errors.forEach(element => {
          this.messageUtilService.showErrorMessages(
            this.messages,
            element["message"]
          );
        });
      }
    );
  };

  cancelPurchaseOrder = () => {
    this.purchaseOrderForm.reset();
    this.purchaseOrderDialogVisibilty = false;
  };

  getPurchaseOrder = () => {
    let searchFormData = this.purchaseOrderSearchForm.getRawValue();

    let request = {
      purchaseOrderSearchDTO: {
        purchaseOrderStatusList: this.uiservice.getSearchData(
          searchFormData,
          "purchaseOrderStatusList"
        ),
        vendorDTOIdList: this.uiservice.getSearchData(
          searchFormData,
          "vendorDTOIdList"
        ),
        vendorNeeded: true
      }
    };

    this.purchaseOrderDTOList = [];
    this.purchaseOrderService.get(request, this.getPurchaseOrderCallback);
  };

  getPurchaseOrderCallback = (response: any) => {
    this.purchaseOrderDTOList = response.purchaseOrderDTOList;
  };

  deletePurchaseOrder = rowData => {
    this.messageUtilService.clearMessage(this.messages);

    this.purchaseOrderService.delete(
      rowData["id"],
      this.deletePurchaseOrderSuccessCallback,
      this.deletePurchaseOrderErrorCallback
    );
  };

  deletePurchaseOrderSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getPurchaseOrder();
  };

  deletePurchaseOrderErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  actionItems = [
    {
      label: "Issue",
      icon: "pi pi-fw pi-plus",
      action: this.issueOrder
    },
    {
      label: "Close",
      icon: "pi pi-fw pi-plus",
      action: this.closeOrder
    }
  ];

  // Purchase Order Functionality
  addPurchaseOrderItem = parentValue => {
    this.purchaseOrderItemForm.reset();

    let formValue = {
      purchaseOrderDTOId: parentValue["id"]
    };
    this.purchaseOrderItemForm.patchValue(formValue);

    this.purchaseOrderItemDialogVisibilty = true;
  };

  editPurchaseOrderItem = (rowData, parentValue) => {
    this.populatePurchaseOrderItemForm(rowData, parentValue, false);
    this.purchaseOrderItemDialogVisibilty = true;
  };

  copyPurchaseOrderItem = (rowData, parentValue) => {
    this.populatePurchaseOrderItemForm(rowData, parentValue);
    this.purchaseOrderItemDialogVisibilty = true;
  };

  populatePurchaseOrderItemForm(
    rowData: any,
    parentValue,
    makeIdNull: boolean = true
  ) {
    this.purchaseOrderItemForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      itemName: { id: rowData["itemName"] },
      unit: { id: rowData["unit"] },
      purchaseOrderDTOId: parentValue["id"],
      quantity: rowData["quantity"],
      rate: rowData["rate"]
    };

    this.purchaseOrderItemForm.setValue(formValue);
  }

  savePurchaseOrderItem = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.purchaseOrderItemForm.getRawValue();

    let purchaseOrderDTOId = formData["purchaseOrderDTOId"];

    let request = {
      purchaseOrderItemDTO: {
        id: formData["id"],
        itemName: formData["itemName"]["id"],
        unit: formData["unit"]["id"],
        quantity: formData["quantity"],
        rate: formData["rate"],
        purchaseOrderDTOId: purchaseOrderDTOId
      }
    };

    this.purchaseOrderItemService.save(
      request,
      (response: any) => {
        this.savePurchaseOrderItemSuccessCallback(response, purchaseOrderDTOId);
      },
      this.savePurchaseOrderItemErrorCallback
    );
  };

  savePurchaseOrderItemSuccessCallback = (
    response: any,
    purchaseOrderDTOId
  ) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.purchaseOrderItemDialogVisibilty = false;
    this.getPurchaseOrderItem({ id: purchaseOrderDTOId });
  };

  savePurchaseOrderItemErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelPurchaseOrderItem = () => {
    this.purchaseOrderItemForm.reset();
    this.purchaseOrderItemDialogVisibilty = false;
  };

  getPurchaseOrderItem = parentValue => {
    let request = {
      purchaseOrderItemSearchDTO: {
        purchaseOrderDTOIdList: [parentValue["id"]]
      }
    };

    this.purchaseOrderItemDTOList = [];
    this.purchaseOrderItemService.get(
      request,
      this.getPurchaseOrderItemCallback
    );
  };

  getPurchaseOrderItemCallback = (response: any) => {
    this.purchaseOrderItemDTOList = response.purchaseOrderItemDTOList;
  };

  deletePurchaseOrderItem = (rowData, parentValue) => {
    this.messageUtilService.clearMessage(this.messages);

    this.purchaseOrderItemService.delete(
      rowData["id"],
      (response: any) => {
        this.deletePurchaseOrderItemSuccessCallback(response, parentValue);
      },
      this.deletePurchaseOrderItemErrorCallback
    );
  };

  deletePurchaseOrderItemSuccessCallback = (response: any, parentValue) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getPurchaseOrderItem(parentValue);
  };

  deletePurchaseOrderItemErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  purchaseOrderItemOptions: any = {
    caption: "PurchaseOrderItem Details",
    addCallback: this.addPurchaseOrderItem,
    editCallback: this.editPurchaseOrderItem,
    copyCallback: this.copyPurchaseOrderItem,
    getCallback: this.getPurchaseOrderItem,
    deleteCallback: this.deletePurchaseOrderItem,
    columns: [
      {
        name: "Item",
        index: "itemName"
      },
      {
        name: "Quantity",
        index: "quantity"
      },
      {
        name: "Unit",
        index: "unit"
      },
      {
        name: "Rate",
        index: "rate"
      }
    ]
  };

  purchaseOrderOptions: any = {
    caption: "Purchase Order",
    addCallback: this.addPurchaseOrder,
    editCallback: this.editPurchaseOrder,
    copyCallback: this.copyPurchaseOrder,
    getCallback: this.getPurchaseOrder,
    deleteCallback: this.deletePurchaseOrder,
    actions: this.actionItems,
    childPresent: true,
    columns: [
      {
        name: "Vendor",
        index: "vendorDTO.name"
      },
      {
        name: "Purchase Order",
        index: "purchaseOrderNo"
      },
      {
        name: "Date",
        index: "purchaseDate",
        type: "date"
      }
    ],
    childGridOptions: [this.purchaseOrderItemOptions]
  };

  getControl(field: any) {
    return this.purchaseOrderForm.controls[field];
  }

  getOrderControl(field: any) {
    return this.purchaseOrderItemForm.controls[field];
  }
}
