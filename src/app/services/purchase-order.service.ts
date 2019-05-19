import { Injectable } from "@angular/core";
import { ClientService } from "../client.service";
import { MESSAGES } from "../model/messages";

const DELETE_URL: string = "deletePurchaseOrder";
const GET_URL: string = "getPurchaseOrder";
const SAVE_URL: string = "createPurchaseOrder";
const UPDATE_URL: string = "updatePurchaseOrder";
const ISSUE_URL: string = "issuePurchaseOrder";
const CLOSE_URL: string = "closePurchaseOrder";

@Injectable({
  providedIn: "root"
})
export class PurchaseOrderService {
  constructor(private clientService: ClientService) {}

  save(request, successCallback, errorCallback?) {
    let url = SAVE_URL;
    if (request["purchaseOrderDTO"]["id"]) {
      url = UPDATE_URL;
    }

    this.clientService.post(url, request, successCallback, errorCallback);
  }

  delete(id: number, successCallback, errorCallback?) {
    if (window.confirm(MESSAGES.DELETE_CONFIRM_MSG)) {
      this.clientService.post(
        DELETE_URL,
        { idsToDelete: [id] },
        successCallback,
        errorCallback
      );
    }
  }

  get(request, successCallback, errorCallback?) {
    this.clientService.post(GET_URL, request, successCallback, errorCallback);
  }

  issuePurchaseOrder(id: number, successCallback, errorCallback?) {
    let request = {
      purchaseOrderDTO: {
        id: id
      }
    };
    if (window.confirm(MESSAGES.PURCHASE_ORDER_ISSUE)) {
      this.clientService.post(
        ISSUE_URL,
        request,
        successCallback,
        errorCallback
      );
    }
  }

  closePurchaseOrder(id: number, successCallback, errorCallback?) {
    let request = {
      purchaseOrderDTO: {
        id: id
      }
    };
    if (window.confirm(MESSAGES.PURCHASE_ORDER_CLOSE)) {
      this.clientService.post(
        CLOSE_URL,
        request,
        successCallback,
        errorCallback
      );
    }
  }
}
