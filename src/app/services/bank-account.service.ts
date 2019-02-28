import { Injectable } from '@angular/core';
import { ClientService } from '../client.service';
import { BankAccountDTO } from '../model/bank-account-dto';
import { BankAccountSearchDTO } from '../model/bank-account-search-dto';

const DELETE_URL: string = 'deleteBankAccount';
const GET_URL: string = 'getBankAccount';
const SAVE_URL: string = 'createBankAccount';
const UPDATE_URL: string = 'updateBankAccount';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private clientService: ClientService) { }

  save(value: BankAccountDTO, callback) {
    var request: any = {
      "bankAccountDTO": value
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

  get(bankAccountSearchDTO: BankAccountSearchDTO, callback) {
    var request: any = {
      "bankAccountSearchDTO": bankAccountSearchDTO,
      "pageIndex": 0,
      "recordstoFetch": 100
    };

    this.clientService.post(GET_URL, request, callback);
  }
}
