import { Component, OnInit, Input } from "@angular/core";
import { log } from "util";
import { GridService } from "../services/grid.service";
import { MenuItem } from "primeng/components/common/menuitem";

@Component({
  selector: "cui-grid",
  templateUrl: "./coliseum-grid.component.html",
  styleUrls: ["./coliseum-grid.component.css"]
})
export class ColiseumGridComponent implements OnInit {
  @Input()
  values: any[] = [];

  @Input()
  childValue: any[] = [];

  @Input()
  childValue2: any[] = [];

  @Input()
  options: any = {};

  constructor(private gridService: GridService) {}

  ngOnInit() {}

  lazyLoad(event) {
    this.options.getCallback();
  }

  getActions(options, rowData): MenuItem[] {
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

  // getColSpan_emptyMsg(options) {
  //   let len = options.columns.length + 2;
  //   if (options.childGridOptions) {
  //     len++;
  //   }
  //   return len;
  // }
}
