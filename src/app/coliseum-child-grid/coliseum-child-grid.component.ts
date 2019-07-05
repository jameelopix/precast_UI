import { Component, OnInit, Input } from "@angular/core";
import { GridService } from "../services/grid.service";

@Component({
  selector: "cui-child-grid",
  templateUrl: "./coliseum-child-grid.component.html",
  styleUrls: ["./coliseum-child-grid.component.css"]
})
export class ColiseumChildGridComponent implements OnInit {
  @Input()
  values: any[] = [];

  @Input()
  options: any = {};

  @Input()
  parentValue: any = {};

  getPresent: boolean = false;
  deletePresent: boolean = false;
  editPresent: boolean = false;
  copyPresent: boolean = false;
  addPresent: boolean = false;
  exportPresent: boolean = false;

  constructor(private gridService: GridService) {}

  ngOnInit() {
    console.log("VALUES:" + JSON.stringify(this.values));
    console.log("options:" + JSON.stringify(this.options));
    console.log("parentValue:" + JSON.stringify(this.parentValue));

    // At initial compent creation stage, both options and parentvalue is same.
    // Only God wil know the reason
    // if (this.parentValue["id"]) {
    //   this.options.getCallback(this.parentValue);
    // }

    if (this.options.getCallback) {
      this.getPresent = true;
    }
    if (this.options.deleteCallback) {
      this.deletePresent = true;
    }
    if (this.options.editCallback) {
      this.editPresent = true;
    }
    if (this.options.copyCallback) {
      this.copyPresent = true;
    }
    if (this.options.addCallback) {
      this.addPresent = true;
    }
    if (this.options.exportCallback) {
      this.exportPresent = true;
    }
  }

  lazyLoad(event) {
    if (this.getPresent) {
      this.options.getCallback(this.parentValue);
    }
  }

  edit(rowData) {
    if (this.editPresent) {
      this.options.editCallback(rowData, this.parentValue);
    }
  }

  copy(rowData) {
    if (this.copyPresent) {
      this.options.copyCallback(rowData, this.parentValue);
    }
  }

  delete(rowData) {
    if (this.deletePresent) {
      this.options.deleteCallback(rowData, this.parentValue);
    }
  }

  add(rowData) {
    if (this.addPresent) {
      this.options.addCallback(this.parentValue);
    }
  }
}
