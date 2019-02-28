import { Injectable } from '@angular/core';

import { MixtureItemDTO } from '../model/mixture-item-dto';

import { ClientService } from '../client.service';
import { MESSAGES } from '../model/messages';

const DELETE_URL: string = 'deleteMixtureItem';
const GET_URL: string = 'getMixtureItem';
const SAVE_URL: string = 'createMixtureItem';
const UPDATE_URL: string = 'updateMixtureItem';

@Injectable({
  providedIn: 'root'
})
export class MixtureItemService {

  constructor(private clientService: ClientService) { }

  save(value: MixtureItemDTO, callback) {
    var request: any = {
      "mixtureItemDTO": value
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
      "mixtureItemSearchDTO": {
        "ids": ids
      }
    };

    this.clientService.post(GET_URL, request, callback);
  }
}
