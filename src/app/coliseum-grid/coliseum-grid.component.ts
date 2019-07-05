import { Component, OnInit, Input } from "@angular/core";
import { log } from "util";
import { GridService } from "../services/grid.service";

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
  options: any = {};

  constructor(private gridService: GridService) {}

  ngOnInit() {}

  lazyLoad(event) {
    this.options.getCallback();
  }

  // getColSpan_emptyMsg(options) {
  //   let len = options.columns.length + 2;
  //   if (options.childGridOptions) {
  //     len++;
  //   }
  //   return len;
  // }
}
