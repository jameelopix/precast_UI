import { Injectable } from '@angular/core';
import { ClientService } from '../client.service';
import { MESSAGES } from '../model/messages';

const DELETE_URL: string = 'deleteAccountDetails';
const GET_URL: string = 'getAccountDetails';
const SAVE_URL: string = 'createAccountDetails';
const UPDATE_URL: string = 'updateAccountDetails';

@Injectable({
  providedIn: 'root'
})
export class AccountDetailService {

  constructor(private clientService: ClientService) { }

  save(request, successCallback, errorCallback?) {
    let url = SAVE_URL;
    if (request['accountDetailsDTO']['id']) {
      url = UPDATE_URL;
    }

    this.clientService.post(url, request, successCallback, errorCallback);
  }

  delete(id: number, successCallback, errorCallback?) {
    if (window.confirm(MESSAGES.DELETE_CONFIRM_MSG)) {
      this.clientService.post(DELETE_URL, { idsToDelete: [id] }, successCallback, errorCallback);
    }
  }

  get(request, successCallback, errorCallback?) {
    this.clientService.post(GET_URL, request, successCallback, errorCallback);
  }
}
