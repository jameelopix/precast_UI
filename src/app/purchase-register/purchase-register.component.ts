import { Component, OnInit } from '@angular/core';
import { PurchaseOrderDTO } from '../model/purchase-order-dto';
import { ClientService } from '../client.service';

const DELETE_URL: string = 'deletePurchaseOrder';
const GET_URL: string = 'getPurchaseOrder';
const SAVE_URL: string = 'createPurchaseOrder';
const UPDATE_URL: string = 'updatePurchaseOrder';

@Component({
  selector: 'app-purchase-register',
  templateUrl: './purchase-register.component.html',
  styleUrls: ['./purchase-register.component.css']
})
export class PurchaseRegisterComponent implements OnInit {

  purchaseOrderDTOList: PurchaseOrderDTO[] = [];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    // this.get();
  }

  get = () => {
    let request = {};

    this.clientService.post(GET_URL, request, this.getCallback);
  }

  getCallback = (response: any) => {
    this.purchaseOrderDTOList = response.purchaseOrderDTOList;
  }

  purchaseOrderOptions: any = {
    // values: this.purchaseOrderDTOList,
    caption: "Purchase Order",
    // saveCallback: this.save,
    getCallback: this.get,
    // deleteCallback: this.delete,
    // actions: this.actionItems,
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
    // childGridOptions: this.orderItemsOptions
  };


}
