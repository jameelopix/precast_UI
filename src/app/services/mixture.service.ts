import { Injectable } from '@angular/core';

import { MixtureDTO } from '../model/mixture-dto';

import { ClientService } from '../client.service';
import { MESSAGES } from '../model/messages';

const DELETE_URL: string = 'deleteMixture';
const GET_URL: string = 'getMixture';
const SAVE_URL: string = 'createMixture';
const UPDATE_URL: string = 'updateMixture';

@Injectable({
  providedIn: 'root'
})
export class MixtureService {

  constructor(private clientService: ClientService) { }

  save(value: MixtureDTO, callback) {
    var request: any = {
      "mixtureDTO": value
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
      "mixtureSearchDTO": {
        "ids": ids
      }
    };

    this.clientService.post(GET_URL, request, callback);
  }
}
