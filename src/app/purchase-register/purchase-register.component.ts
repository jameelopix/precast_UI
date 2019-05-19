import { Component, OnInit } from "@angular/core";
import { PurchaseOrderDTO } from "../model/purchase-order-dto";
import { ClientService } from "../client.service";
import { GridService } from "../services/grid.service";
import { OrderItemService } from "../services/order-item.service";
import { OrderItemDTO } from "../model/order-item-dto";
import { FormBuilder, FormGroup } from "@angular/forms";
import { VendorService } from "../services/vendor.service";
import { PurchaseOrderService } from "../services/purchase-order.service";
import { MessageUtilService } from "../services/message-util.service";

const DELETE_URL: string = "deletePurchaseOrder";
const GET_URL: string = "getPurchaseOrder";
const SAVE_URL: string = "createPurchaseOrder";
const UPDATE_URL: string = "updatePurchaseOrder";

@Component({
  selector: "app-purchase-register",
  templateUrl: "./purchase-register.component.html",
  styleUrls: ["./purchase-register.component.css"]
})
export class PurchaseRegisterComponent implements OnInit {
  purchaseOrderDTOList: PurchaseOrderDTO[] = [];
  purchaseOrderDialogVisibilty: boolean = false;
  purchaseOrderForm: FormGroup;

  orderItemDTOList: OrderItemDTO[] = [];
  orderItemDialogVisibilty: boolean = false;
  orderItemForm: FormGroup;

  vendorDTOList: any[] = [];

  messages: any[] = [];

  constructor(
    private clientService: ClientService,
    private purchaseOrderService: PurchaseOrderService,
    private orderItemService: OrderItemService,
    private vendorService: VendorService,
    private formBuilder: FormBuilder,
    private messageUtilService: MessageUtilService
  ) {
    this.createPurchaseOrderFormGroup();
    this.createOrderItemFormGroup();
  }

  ngOnInit() {
    this.fetchReleventData();
  }

  fetchReleventData() {
    this.vendorService.get({}, this.getVendorCallback);
  }

  getVendorCallback = (response: any) => {
    this.vendorDTOList = response.vendorDTOList;
  };

  createPurchaseOrderFormGroup() {
    this.purchaseOrderForm = this.formBuilder.group({
      id: [null],
      vendorId: [""],
      purchaseOrderNo: [""],
      purchaseDate: [new Date()]
    });
  }

  createOrderItemFormGroup() {
    this.orderItemForm = this.formBuilder.group({
      // vendorName: [""],
      // poNo: [""],
      // date: [new Date()]
    });
  }

  childget = () => {
    console.log("CHILD GET.");
  };

  deleteOrderItem = (id: number) => {
    console.log("CHILD deleteOrderItem.");
  };

  saveOrderItem = (id: number) => {
    console.log("CHILD saveOrderItem.");
  };

  getOrderItem = parentValue => {
    // this.parentValue
    let request = {};
    if (parentValue) {
      request = {
        orderItemSearchDTO: {
          purchaseOrderIdList: [parentValue.id]
        }
      };
    }
    this.orderItemService.get(request, this.getOrderItemCallback);
  };

  getOrderItemCallback = (response: any) => {
    this.orderItemDTOList = response.orderItemDTOList;
  };

  orderItemsOptions: any = {
    caption: "Order Item Details",
    saveCallback: this.saveOrderItem,
    getCallback: this.getOrderItem,
    deleteCallback: this.deleteOrderItem,
    columns: [
      {
        name: "Item Name",
        index: "itemName"
        // type: "select",
        // selectOptions: this.itemNameSelectOptions
        // width: "300px"
      },
      {
        name: "Quantity",
        index: "quantity",
        type: "textInput"
        // width: "300px"
      },
      {
        name: "Rate",
        index: "rate",
        type: "textInput"
        // width: "300px"
      },
      {
        name: "Unit",
        index: "unitType"
        // type: "select",
        // selectOptions: this.unitTypeSelectOptions
        // width: "300px"
      }
    ]
  };

  ////////////////////////////////////////
  // Purchase Order Section
  ////////////////////////////////////////
  savePurchaseOrder = () => {
    console.log("Inside savePurchaseOrder");
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.purchaseOrderForm.getRawValue();

    let url = SAVE_URL;
    if (formData["id"]) {
      url = UPDATE_URL;
    }

    let request = {
      purchaseOrderDTO: {
        id: formData["id"],
        vendorId: formData["vendorId"],
        purchaseOrderNo: formData["purchaseOrderNo"],
        purchaseDate: formData["purchaseDate"]
      }
    };

    this.purchaseOrderService.save(
      request,
      this.savePurchaseOrderSuccessCallback,
      this.savePurchaseOrderErrorCallback
    );
  };

  savePurchaseOrderSuccessCallback = (response: any) => {
    this.getPurchaseOrder();
  };

  savePurchaseOrderErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  issueOrder = rowData => {
    this.messageUtilService.clearMessage(this.messages);
    this.purchaseOrderService.issuePurchaseOrder(
      rowData["id"],
      this.issuePurchaseOrderSuccessCallback,
      this.issuePurchaseOrderErrorCallback
    );
  };

  issuePurchaseOrderSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      "Order have been issued Successfully!!!"
    );
  };

  issuePurchaseOrderErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  closeOrder = rowData => {
    this.messageUtilService.clearMessage(this.messages);
    this.purchaseOrderService.closePurchaseOrder(
      rowData["id"],
      this.closePurchaseOrderSuccessCallback,
      this.closePurchaseOrderErrorCallback
    );
  };

  closePurchaseOrderSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      "Order have been closed Successfully!!!"
    );
  };

  closePurchaseOrderErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelPurchaseOrder() {
    this.messageUtilService.clearMessage(this.messages);
    this.purchaseOrderForm.reset();
    this.purchaseOrderDialogVisibilty = false;
  }

  editPurchaseOrder = rowData => {
    console.log("Inside editPurchaseOrder");
    console.log("PurchaseOrder:" + JSON.stringify(rowData));
    this.messageUtilService.clearMessage(this.messages);
    // this.purchaseOrderForm.setValue(rowData);
    this.purchaseOrderDialogVisibilty = true;
  };

  addPurchaseOrder = () => {
    console.log("Inside addPurchaseOrder");
    this.purchaseOrderForm.reset();
    this.purchaseOrderDialogVisibilty = true;
  };

  exportPurchaseOrder = () => {
    console.log("Inside exportPurchaseOrder");
  };
  copyPurchaseOrder = rowData => {
    console.log("Inside copyPurchaseOrder");
    this.messageUtilService.clearMessage(this.messages);
    this.purchaseOrderForm.setValue(rowData);
    this.purchaseOrderForm.setValue({ id: null });
    this.purchaseOrderDialogVisibilty = true;
  };

  getPurchaseOrder = () => {
    console.log("Inside getPurchaseOrder");
    this.messageUtilService.clearMessage(this.messages);

    this.purchaseOrderService.get({}, this.getPurchaseOrderCallback);
  };

  getPurchaseOrderCallback = (response: any) => {
    this.purchaseOrderDTOList = response.purchaseOrderDTOList;
  };

  deletePurchaseOrder = rowData => {
    console.log("Inside deletePurchaseOrder");
    this.messageUtilService.clearMessage(this.messages);

    this.purchaseOrderService.delete(
      rowData["id"],
      this.deletePurchaseOrderSuccessCallback,
      this.deletePurchaseOrderErrorCallback
    );
  };

  deletePurchaseOrderSuccessCallback = (response: any) => {
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

  purchaseOrderOptions: any = {
    caption: "Purchase Order",
    addCallback: this.addPurchaseOrder,
    // exportCallback: this.exportPurchaseOrder,
    editCallback: this.editPurchaseOrder,
    copyCallback: this.copyPurchaseOrder,
    getCallback: this.getPurchaseOrder,
    deleteCallback: this.deletePurchaseOrder,
    // actions: this.actionItems,
    childPresent: true,
    childGridOptions: [this.orderItemsOptions],
    columns: [
      {
        name: "Purchase Order No",
        index: "purchaseOrderNo",
        type: "textInput"
        // width: "45%"
      },
      {
        name: "Date",
        index: "purchaseDate",
        type: "date"
        // width: "45%"
      }
    ]
  };
}
