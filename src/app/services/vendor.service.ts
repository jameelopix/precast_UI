import { Injectable } from "@angular/core";
import { ClientService } from "../client.service";
import { MESSAGES } from "../model/messages";

const DELETE_URL: string = "deleteVendor";
const GET_URL: string = "getVendor";
const SAVE_URL: string = "createVendor";
const UPDATE_URL: string = "updateVendor";

@Injectable({
  providedIn: "root"
})
export class VendorService {
  constructor(private clientService: ClientService) {}

  save(request, callback) {
    let url = SAVE_URL;
    if (request["vendorDTO"]["id"]) {
      url = UPDATE_URL;
    }

    this.clientService.post(url, request, callback);
  }

  delete(id: number, callback) {
    if (window.confirm(MESSAGES.DELETE_CONFIRM_MSG)) {
      this.clientService.post(DELETE_URL, { idsToDelete: [id] }, callback);
    }
  }

  get(request, callback) {
    this.clientService.post(GET_URL, request, callback);
  }
}
