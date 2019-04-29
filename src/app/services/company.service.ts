import { Injectable } from '@angular/core';
import { ClientService } from '../client.service';
import { MESSAGES } from '../model/messages';

const DELETE_URL: string = 'deleteCompany';
const GET_URL: string = 'getCompany';
const SAVE_URL: string = 'createCompany';
const UPDATE_URL: string = 'updateCompany';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private clientService: ClientService) { }

  save(request, successCallback, errorCallback?) {
    let url = SAVE_URL;
    if (request['companyDTO']['id']) {
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