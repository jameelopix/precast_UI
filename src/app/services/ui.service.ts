import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UIService {
  constructor() {}

  public getDropdownlist(array: any[]): any[] {
    let dropdownList = [];
    array.forEach(element => {
      let obj = {
        id: element,
        name: element
      };

      dropdownList.push(obj);
    });

    return dropdownList;
  }

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

  deepClone(obj) {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.deepClone(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.deepClone(obj[attr]);
      }
      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  }
}
