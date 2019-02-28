import { Injectable } from '@angular/core';

import { SteelItemDTO } from '../model/steel-item-dto';

import { ClientService } from '../client.service';
import { MESSAGES } from '../model/messages';

const DELETE_URL: string = 'deleteSteelItem';
const GET_URL: string = 'getSteelItem';
const SAVE_URL: string = 'createSteelItem';
const UPDATE_URL: string = 'updateSteelItem';

@Injectable({
  providedIn: 'root'
})
export class SteelItemService {

  constructor(private clientService: ClientService) { }

  save(value: SteelItemDTO, callback) {
    var request: any = {
      "steelItemDTO": value
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
      "steelItemSearchDTO": {
        "ids": ids
      }
    };

    this.clientService.post(GET_URL, request, callback);
  }
}
