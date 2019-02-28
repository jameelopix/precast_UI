import { Injectable } from '@angular/core';

import { ElementDTO } from '../model/element-dto';

import { ClientService } from '../client.service';
import { MESSAGES } from '../model/messages';

const DELETE_URL: string = 'deleteElement';
const GET_URL: string = 'getElement';
const SAVE_URL: string = 'createElement';
const UPDATE_URL: string = 'updateElement';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  constructor(private clientService: ClientService) { }

  save(value: ElementDTO, callback) {
    var request: any = {
      "elementDTO": value
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
      "elementSearchDTO": {
        "ids": ids
      }
    };

    this.clientService.post(GET_URL, request, callback);
  }
}
