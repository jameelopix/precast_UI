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

  constructor(private gridService: GridService) {}

  ngOnInit() {
    // console.log("VALUES:" + JSON.stringify(this.values));
    // console.log("options:" + JSON.stringify(this.options));
    // console.log("parentValue:" + JSON.stringify(this.parentValue));

    // At initial compent creation stage, both options and parentvalue is same.
    // Only God wil know the reason
    if (this.parentValue["id"]) {
      this.options.getCallback(this.parentValue);
    }
  }
}
