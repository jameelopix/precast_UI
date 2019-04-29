import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { PurchaseOrderDTO } from '../model/purchase-order-dto';
import { ClientService } from '../client.service';
import { OrderItemDTO } from '../model/order-item-dto';
import { OrderItemService } from '../services/order-item.service';
import { log } from 'util';
import { PurchaseOrderService } from '../services/purchase-order.service';
import { Message, MessageService, SelectItem } from 'primeng/components/common/api';

const DELETE_URL: string = 'deletePurchaseOrder';
const GET_URL: string = 'getPurchaseOrder';
const SAVE_URL: string = 'createPurchaseOrder';
const UPDATE_URL: string = 'updatePurchaseOrder';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css'],
  providers: [MessageService]
})
export class PurchaseOrderComponent implements OnInit {

  // @ViewChild('purchaseOrderGrid')
  // purchaseOrderGrid: GridComponent;

  messages: Message[] = [];

  purchaseOrderDTOList: PurchaseOrderDTO[] = [];

  orderItemDTOList: OrderItemDTO[] = [];

  itemNameSelectOptions: SelectItem[] = [
    { label: 'Select Item', value: null },
    { label: 'Cement', value: 'Cement' },
    { label: 'Admixture', value: 'Admixture' },
    { label: 'Gravel', value: 'Gravel' },
    { label: 'Stone', value: 'Stone' },
  ];

  unitTypeSelectOptions: SelectItem[] = [
    { label: 'Select Unit', value: null },
    { label: 'Ton', value: 'TONNE' },
    { label: 'Kg', value: 'KG' },
    { label: 'Nos', value: 'COUNT' },
    { label: 'Litre', value: 'LITRE' },
  ];

  constructor(private clientService: ClientService, private messageService: MessageService, private purchaseOrderService: PurchaseOrderService, private orderItemService: OrderItemService) { }

  ngOnInit() {
    this.fetchRequiredData();

    // this.purchaseOrderGrid.get
  }

  fetchRequiredData() {
    // this.get();
  }

  save = (rowData) => {
    console.log("Inside save function.");
    console.table(rowData);

    let url = SAVE_URL;
    if (rowData['id']) {
      url = UPDATE_URL;
    }

    let request = {
      "purchaseOrderDTO": rowData
    };

    this.clientService.post(url, request, this.saveCallback);
  }

  saveCallback = (response: any) => {
    this.clearMessages();
    this.showSuccessMessages("Data saved Successfully!!!");
    this.get();
  }

  get = () => {
    let request = {};

    this.clientService.post(GET_URL, request, this.getCallback);
  }

  getCallback = (response: any) => {
    this.purchaseOrderDTOList = response.purchaseOrderDTOList;
  }

  delete = (id: number) => {
    let request = {
      "idsToDelete": [
        id
      ]
    };

    this.clientService.post(DELETE_URL, request, this.deleteCallback);
  }

  deleteCallback = (response: any) => {
    this.get();
  }

  saveOrderItem = (rowData, parentValue) => {
    rowData['purchaseOrderId'] = parentValue.id;
    let request = {
      "orderItemDTO": rowData
    };

    this.orderItemService.save(request, (response: any) => {
      this.getOrderItem(parentValue);
    });
  }

  // saveOrderItemCallback = (response: any) => {
  //   this.getOrderItem();
  // }

  getOrderItem = (parentValue) => {// this.parentValue
    let request = {};
    if (parentValue) {
      request = {
        "orderItemSearchDTO": {
          "purchaseOrderIdList": [
            parentValue.id
          ]
        }
      };
    }
    this.orderItemService.get(request, this.getOrderItemCallback);
  }

  getOrderItemCallback = (response: any) => {
    this.orderItemDTOList = response.orderItemDTOList;
  }

  deleteOrderItem = (id: number, parentValue) => {
    this.orderItemService.delete(id, (response: any) => {
      this.getOrderItem(parentValue);
    });
  }

  // deleteOrderItemCallback = (response: any) => {
  //   this.getOrderItem();
  // }

  issueOrder = (rowData) => {
    this.purchaseOrderService.issuePurchaseOrder(rowData['id'], (response: any) => {
      this.showSuccessMessages("Order have been issued Successfully!!!");
    }, (response: any) => {
      console.log(JSON.stringify(response));
    });
  }

  closeOrder = (rowData) => {
    this.purchaseOrderService.closePurchaseOrder(rowData['id'], (response: any) => {
      this.showSuccessMessages("Order have been closed Successfully!!!");
    }, (errors: any) => {
      this.clearMessages();
      errors.forEach(element => {
        this.showErrorMessages(element['message'])
      });
      // console.log(JSON.stringify(response));
    });
  }

  actionItems = [{
    label: 'Issue',
    icon: 'pi pi-fw pi-plus',
    action: this.issueOrder
  },
  {
    label: 'Close',
    icon: 'pi pi-fw pi-plus',
    action: this.closeOrder
  }];

  orderItemsOptions: any = {
    values: this.orderItemDTOList,
    caption: "Order Item Details",
    saveCallback: this.saveOrderItem,
    getCallback: this.getOrderItem,
    deleteCallback: this.deleteOrderItem,
    columns: [
      {
        name: "Item Name",
        index: "itemName",
        type: "select",
        selectOptions: this.itemNameSelectOptions
        // width: "300px"
      },
      {
        name: "Quantity",
        index: "quantity",
        type: "textInput",
        // width: "300px"
      }, {
        name: "Rate",
        index: "rate",
        type: "textInput",
        // width: "300px"
      },
      {
        name: "Unit",
        index: "unitType",
        type: "select",
        selectOptions: this.unitTypeSelectOptions
        // width: "300px"
      }
    ]
  };

  purchaseOrderOptions: any = {
    values: this.purchaseOrderDTOList,
    caption: "Purchase Order",
    saveCallback: this.save,
    getCallback: this.get,
    deleteCallback: this.delete,
    actions: this.actionItems,
    columns: [
      {
        name: "Purchase Order No",
        index: "purchaseOrderNo",
        type: "textInput",
        // width: "45%"
      },
      {
        name: "Date",
        index: "purchaseDate",
        type: "date",
        // width: "45%"
      }
    ],
    childGridOptions: this.orderItemsOptions
  };

  clearMessages() {
    this.messages = [];
  }

  showSuccessMessages(data: string, title?: string) {
    this.writeMessage('success', data, title ? title : 'Success');
  }

  showInfoMessages(data: string, title?: string) {
    this.writeMessage('info', data, title ? title : 'Info');
  }

  showErrorMessages(data: string, title?: string) {
    this.writeMessage('error', data, title ? title : 'Error');
  }

  showWarnMessages(data: string, title?: string) {
    this.writeMessage('warn', data, title ? title : 'Warning');
  }

  writeMessage(severity: string, data: string, title: string) {
    this.messages.push({ severity: severity, summary: title, detail: data });
  }
}