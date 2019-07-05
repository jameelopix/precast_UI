import { Injectable } from "@angular/core";
import { MenuItem } from "primeng/api";

@Injectable({
  providedIn: "root"
})
export class GridService {
  constructor() {}

  public getValue(rowData: any, index: string, type?: string) {
    let values = index.split(".");
    let output = rowData;
    values.forEach(element => {
      output = output[element];
    });
    return output;
  }

  public getColSpan_emptyMsg(options) {
    let len = options.columns.length + 2;
    if (options.childPresent) {
      len++;
    }
    return len;
  }

  public getColSpan_childTable(options) {
    let len = options.columns.length + 1;
    if (options.childPresent) {
      len++;
    }
    return len;
  }

  public getActions(options, rowData): MenuItem[] {
    let value = rowData;

    let menuItems: MenuItem[] = [];
    options.actions.forEach(element => {
      let menuItem: MenuItem = {};
      menuItem.label = element.label;
      menuItem.icon = element.icon;
      menuItem.command = e => element.action(value);

      menuItems.push(menuItem);
    });

    return menuItems;
  }

  public lazyLoad(options, parentValue?) {
    console.log(JSON.stringify(options));
    if (parentValue) {
      options.getCallback(parentValue);
    } else {
      options.getCallback();
    }
  }

  // public getValue(rowData: any, index: string, type?: string) {
  //   let values = index.split(".");
  //   let output = rowData;
  //   values.forEach(element => {
  //     output = output[element];
  //   });
  // console.table(output);
  // if ('date' == type) {
  //   output = new Date(output);
  // }
  //   return output;
  // }
}
