import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UIService {
  constructor() {}

  public getSearchData(formData: any[], fieldName: string): any {
    let arr: any[] = [];

    let data = this.getData(formData, fieldName);
    if (data != null) {
      arr.push(data);
    }
    return arr;
  }

  public getData(formData: any[], fieldName: string): any {
    if (formData && formData[fieldName]) {
      if (formData[fieldName]["id"]) {
        return formData[fieldName]["id"];
      } else {
        return formData[fieldName];
      }
    }
    return null;
  }
}
