import { Injectable } from '@angular/core';

import { CastingActivityDTO } from '../model/casting-activity-dto';

import { ClientService } from '../client.service';
import { MESSAGES } from '../model/messages';

const DELETE_URL: string = 'deleteCastingActivity';
const GET_URL: string = 'getCastingActivity';
const SAVE_URL: string = 'createCastingActivity';
const UPDATE_URL: string = 'updateCastingActivity';

@Injectable({
  providedIn: 'root'
})
export class CastingActivityService {

  constructor(private clientService: ClientService) { }

  save(value: CastingActivityDTO, callback) {
    var request: any = {
      "castingActivityDTO": value
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
      "castingActivitySearchDTO": {
        "ids": ids
      }
    };

    this.clientService.post(GET_URL, request, callback);
  }
}