import { Injectable } from '@angular/core';

import { SubContractorDTO } from '../model/sub-contractor-dto';

import { ClientService } from '../client.service';
import { MESSAGES } from '../model/messages';

const DELETE_URL: string = 'deleteSubContractor';
const GET_URL: string = 'getSubContractor';
const SAVE_URL: string = 'createSubContractor';
const UPDATE_URL: string = 'updateSubContractor';

@Injectable({
  providedIn: 'root'
})
export class SubContractorService {

  constructor(private clientService: ClientService) { }

  save(value: SubContractorDTO, callback) {
    var request: any = {
      "subContractorDTO": value
    };

    let url = SAVE_URL;
    if (value.id) {
      url = UPDATE_URL;
    }

    this.clientService.post(url, request, callback);
  }

  delete(id: number, callback) {
    if (window.confirm(MESSAGES.DELETE_CONFIRM_MSG)) {
      this.clientService.post(DELETE_URL, { idsToDelete: [id] }, callback);
    }
  }

  get(ids: number[], callback) {
    var request: any = {
      "subContractorSearchDTO": {
        "ids": ids
      }
    };

    this.clientService.post(GET_URL, request, callback);
  }
}
