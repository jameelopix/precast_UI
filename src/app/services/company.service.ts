import { Injectable } from '@angular/core';
import { ClientService } from '../client.service';
import { CompanyDTO } from '../model/company-dto';
import { CompanySearchDTO } from '../model/company-search-dto';

const DELETE_URL: string = 'deleteCompany';
const GET_URL: string = 'getCompany';
const SAVE_URL: string = 'createCompany';
const UPDATE_URL: string = 'updateCompany';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private clientService: ClientService) { }

  save(value: CompanyDTO, callback) {
    var request: any = {
      "companyDTO": value
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

  get(companySearchDTO: CompanySearchDTO, callback) {
    var request: any = {
      "companySearchDTO": companySearchDTO,
      "pageIndex": 0,
      "recordstoFetch": 100
    };

    this.clientService.post(GET_URL, request, callback);
  }
}