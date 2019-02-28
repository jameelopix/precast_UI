import { Injectable } from '@angular/core';

import { ElementTypeDTO } from '../model/element-type-dto';

import { ClientService } from '../client.service';
import { MESSAGES } from '../model/messages';

const DELETE_URL: string = 'deleteElementType';
const GET_URL: string = 'getElementType';
const SAVE_URL: string = 'createElementType';
const UPDATE_URL: string = 'updateElementType';

@Injectable({
  providedIn: 'root'
})
export class ElementTypeService {

  constructor(private clientService: ClientService) { }

  save(value: ElementTypeDTO, callback) {
    var request: any = {
      "elementTypeDTO": value
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

  get(ids: number[],callback) {
    var request: any = {
      "elementTypeSearchDTO": {
        "ids": ids
      }
    };

    this.clientService.post(GET_URL, request, callback);
  }
}
