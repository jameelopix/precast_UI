import { Injectable } from "@angular/core";
import { ClientService } from "../client.service";
import { MESSAGES } from "../model/messages";

const GET_URL: string = "getReports";

@Injectable({
  providedIn: "root"
})
export class ReportService {
  constructor(private clientService: ClientService) {}

  get(request, successCallback, errorCallback?) {
    this.clientService.post(GET_URL, request, successCallback, errorCallback);
  }
}