import { Injectable } from "@angular/core";
import { ClientService } from "../client.service";
import { MESSAGES } from "../model/messages";

const SAVE_URL: string = "createItemFreightAmountDetails";
const UPDATE_URL: string = "updateItemFreightAmountDetails";
const GET_URL: string = "getItemFreightAmountDetails";
const DELETE_URL: string = "deleteItemFreightAmountDetails";

@Injectable({
  providedIn: "root"
})
export class ItemFreightAmountDetailsService {
  constructor(private clientService: ClientService) {}

  save(request, successCallback, errorCallback?) {
    let url = SAVE_URL;
    if (request["itemFreightAmountDetailsDTO"]["id"]) {
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