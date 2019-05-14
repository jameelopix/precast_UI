import { Component, OnInit, Input } from '@angular/core';
import { log } from 'util';

@Component({
  selector: 'cui-grid',
  templateUrl: './coliseum-grid.component.html',
  styleUrls: ['./coliseum-grid.component.css']
})
export class ColiseumGridComponent implements OnInit {

  @Input()
  values: any[] = [];

  @Input()
  options: any = {};

  constructor() { }

  ngOnInit() {
  }

  lazyLoad(event) {
    this.options.getCallback();
  }

  private getValue(rowData: any, index: string, type?: string) {
    let values = index.split(".");
    let output = rowData;
    values.forEach(element => {
      output = output[element];
    });
    // console.table(output);
    // if ('date' == type) {
    //   output = new Date(output);
    // }
    return output;
  }
}
