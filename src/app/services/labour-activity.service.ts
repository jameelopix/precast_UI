import { Injectable } from '@angular/core';

import { LabourActivityDTO } from '../model/labour-activity-dto';

import { ClientService } from '../client.service';
import { MESSAGES } from '../model/messages';

const DELETE_URL: string = 'deleteLabourActivity';
const GET_URL: string = 'getLabourActivity';
const SAVE_URL: string = 'createLabourActivity';
const UPDATE_URL: string = 'updateLabourActivity';

@Injectable({
  providedIn: 'root'
})
export class LabourActivityService {

  constructor(private clientService: ClientService) { }

  save(value: LabourActivityDTO, callback) {
    var request: any = {
      "labourActivityDTO": value
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
      "labourActivitySearchDTO": {
        "ids": ids
      }
    };

    this.clientService.post(GET_URL, request, callback);
  }
}
