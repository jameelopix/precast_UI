import { Injectable } from "@angular/core";
import { ClientService } from "../client.service";
import { MESSAGES } from "../model/messages";

const SAVE_URL: string = "createPurchaseOrderItem";
const UPDATE_URL: string = "updatePurchaseOrderItem";
const GET_URL: string = "getPurchaseOrderItem";
const DELETE_URL: string = "deletePurchaseOrderItem";

@Injectable({
  providedIn: "root"
})
export class PurchaseOrderItemService {
  constructor(private clientService: ClientService) {}

  save(request, successCallback, errorCallback?) {
    let url = SAVE_URL;
    if (request["purchaseOrderItemDTO"]["id"]) {
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
}
