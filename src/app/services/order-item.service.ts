import { Injectable } from '@angular/core';
import { ClientService } from '../client.service';
import { OrderItemDTO } from '../model/order-item-dto';
import { MESSAGES } from '../model/messages';

const DELETE_URL: string = 'deleteOrderItem';
const GET_URL: string = 'getOrderItem';
const SAVE_URL: string = 'createOrderItem';
const UPDATE_URL: string = 'updateOrderItem';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  constructor(private clientService: ClientService) { }

  save(request, callback) {
    let url = SAVE_URL;
    if (request['orderItemDTO']['id']) {
      url = UPDATE_URL;
    }

    this.clientService.post(url, request, callback);
  }

  delete(id: number, callback) {
    if (window.confirm(MESSAGES.DELETE_CONFIRM_MSG)) {
      this.clientService.post(DELETE_URL, { idsToDelete: [id] }, callback);
    }
  }

  get(request, callback) {
    // var request: any = {
    //   "projectSearchDTO": projectSearchDTO
    // };

    this.clientService.post(GET_URL, request, callback);
  }
}
