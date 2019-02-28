import { Injectable } from '@angular/core';

import { LabourRateDTO } from '../model/labour-rate-dto';

import { ClientService } from '../client.service';
import { MESSAGES } from '../model/messages';

const DELETE_URL: string = 'deleteLabourRate';
const GET_URL: string = 'getLabourRate';
const SAVE_URL: string = 'createLabourRate';
const UPDATE_URL: string = 'updateLabourRate';

@Injectable({
  providedIn: 'root'
})
export class LabourRateService {

  constructor(private clientService: ClientService) { }

  save(value: LabourRateDTO, callback) {
    var request: any = {
      "labourRateDTO": value
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
      "labourRateSearchDTO": {
        "ids": ids
      }
    };

    this.clientService.post(GET_URL, request, callback);
  }
}
