import { Injectable } from '@angular/core';

import { RawMaterialDTO } from '../model/raw-material-dto';

import { ClientService } from '../client.service';

const DELETE_URL: string = 'deleteRawMaterial';
const GET_URL: string = 'getRawMaterial';
const SAVE_URL: string = 'createRawMaterial';
const UPDATE_URL: string = 'updateRawMaterial';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {

  constructor(private clientService: ClientService) { }

  save(value: RawMaterialDTO, callback) {
    var request: any = {
      "rawMaterialDTO": value
    };

    let url = SAVE_URL;
    if (value.id) {
      url = UPDATE_URL;
    }

    this.clientService.post(url, request, callback);
  }

  delete(id: number, callback) {
    this.clientService.post(DELETE_URL, { idsToDelete: [id] }, callback);
  }

  get1(ids: number[], callback) {
    var request: any = {
      "rawMaterialSearchDTO": {
        "ids": ids
      }
    };

    this.clientService.post(GET_URL, request, callback);
  }
}
