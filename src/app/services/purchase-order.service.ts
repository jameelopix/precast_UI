import { Injectable } from '@angular/core';
import { ClientService } from '../client.service';
import { MESSAGES } from '../model/messages';

const DELETE_URL: string = '';
const GET_URL: string = '';
const SAVE_URL: string = '';
const UPDATE_URL: string = '';
const ISSUE_URL: string = 'issuePurchaseOrder';
const CLOSE_URL: string = 'closePurchaseOrder';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor(private clientService: ClientService) { }

  issuePurchaseOrder(id: number, successCallback, errorCallback?) {
    let request = {
      "purchaseOrderDTO": {
        "id": id
      }
    }
    if (window.confirm(MESSAGES.PURCHASE_ORDER_ISSUE)) {
      this.clientService.post(ISSUE_URL, request, successCallback, errorCallback);
    }
  }

  closePurchaseOrder(id: number, successCallback, errorCallback?) {
    let request = {
      "purchaseOrderDTO": {
        "id": id
      }
    }
    if (window.confirm(MESSAGES.PURCHASE_ORDER_CLOSE)) {
      this.clientService.post(CLOSE_URL, request, successCallback, errorCallback);
    }
  }
}
