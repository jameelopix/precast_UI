import { Injectable } from "@angular/core";
import { ClientService } from "../client.service";

const CONFIG_URL: string = "getConfig";
const CONFIG_LIST_URL: string = "getConfigList";
const CONFIG_MAP_URL: string = "getConfigMap";

@Injectable({
  providedIn: "root"
})
export class ConfigService {
  constructor(private clientService: ClientService) {}

  getConfig(code, successCallback, errorCallback?) {
    let request = {
      code: code
    };

    this.performFetch(CONFIG_URL, request, successCallback, errorCallback);
  }

  getConfigList(code, successCallback, errorCallback?) {
    let request = {
      code: code
    };
    this.performFetch(CONFIG_LIST_URL, request, successCallback, errorCallback);
  }

  getConfigMap(code, successCallback, errorCallback?) {
    let request = {
      code: code
    };
    this.performFetch(CONFIG_MAP_URL, request, successCallback, errorCallback);
  }

  private performFetch(url, request, successCallback, errorCallback?) {
    this.clientService.post(url, request, successCallback, errorCallback);
  }
}
