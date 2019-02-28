import { Component, OnInit, Inject, ElementRef, AfterViewInit } from '@angular/core';

import { ReportService } from '../services/report.service';
import { RawMaterialCostQueryDTO } from '../model/raw-material-cost-query-dto';
import { TreeNode } from 'primeng/api';
import { SelectItem } from 'primeng/api';

declare var jQuery: any;
declare var $: any;

// import 'pivottable/pivot.min.js';
// import 'pivottable/pivot.min.css';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  private el: ElementRef;

  private _raw: RawMaterialCostQueryDTO[] = [];
  nodes: TreeNode[] = [];

  columsOptions: SelectItem[];

  pivotColumns: any[] = [];

  selectedColumns: any[] = [];

  // @Inject(ElementRef) el: ElementRef

  // contructor(private reportService: ReportService) {
  //   this.el = el;
  // }

  constructor(@Inject(ElementRef) el: ElementRef, private reportService: ReportService) {
    this.el = el;
  }



  ngAfterViewInit() {
    console.log("indide ngAfterViewInit");
    if (!this.el ||
      !this.el.nativeElement ||
      !this.el.nativeElement.children) {
      console.log('cant build without element');
      return;
    }

    var container = this.el.nativeElement;
    var inst = jQuery(container);
    var targetElement = inst.find('#output');

    if (!targetElement) {
      console.log('cant find the pivot element');
      return;
    }

    //this helps if you build more than once as it will wipe the dom for that element
    while (targetElement.firstChild) {
      targetElement.removeChild(targetElement.firstChild);
    }
    console.log(targetElement);
    //here is the magic
    // targetElement.pivotUI([
    //   { color: "blue", shape: "circle" },
    //   { color: "red", shape: "triangle" }
    // ],
    //   {
    //     rows: ["color"],
    //     cols: ["shape"]
    //   });

    var renderers = $.pivotUtilities.renderers;
    var aggregator = $.pivotUtilities.aggregators["Count"]();

    targetElement.pivotUI([
      { 'Province': 'Quebec', 'Party': 'NDP', 'Age': 22, 'Name': 'Liu, Laurin', 'Gender': 'Female' },
      { 'Province': 'Quebec', 'Party': 'Bloc Quebecois', 'Age': 43, 'Name': 'Mourani, Maria', 'Gender': 'Female' },
      { 'Province': 'Quebec', 'Party': 'NDP', 'Age': '', 'Name': 'Sellah, Djaouida', 'Gender': 'Female' },
      { 'Province': 'Quebec', 'Party': 'NDP', 'Age': 72, 'Name': 'St-Denis, Lise', 'Gender': 'Female' },
      { 'Province': 'British Columbia', 'Party': 'Liberal', 'Age': 71, 'Name': 'Fry, Hedy', 'Gender': 'Female' }],
      {
        renderers: renderers,
        // aggregators: aggregator(["Age", "Gender"]),
        aggregatorName: "Count JAmeel",
        cols: ['Party'], rows: ['Province'],
        rendererName: 'Horizontal Stacked Bar Chart',
        rowOrder: 'value_z_to_a', colOrder: 'value_z_to_a',
        rendererOptions: {
          c3: {
            data: {
              colors: {
                Liberal: '#dc3912', Conservative: '#3366cc', NDP: '#ff9900',
                Green: '#109618', 'Bloc Quebecois': '#990099'
              }
            }
          }
        }
      });
  }

  private buildPivot() {

    if (!this.el ||
      !this.el.nativeElement ||
      !this.el.nativeElement.children) {
      console.log('cant build without element');
      return;
    }

    var container = this.el.nativeElement;
    var inst = jQuery(container);

    //the below id should be on your html element like div for the pivot
    //per the exmapmle in thepivot docs
    var targetElement = inst.find('#pivot');

    if (!targetElement) {
      console.log('cant find the pivot element');
      return;
    }

    //this helps if you build more than once as it will wipe the dom for that element
    while (targetElement.firstChild) {
      targetElement.removeChild(targetElement.firstChild);
    }

    var utils = $.pivotUtilities;
    var heatmap = utils.renderers["Heatmap"];
    var sumOverSum = utils.aggregators["Sum over Sum"];

    //here is the magic
    //targetElement.pivot(<your data here > , <your options here > );
    targetElement.pivotUI([
      { 'Province': 'Quebec', 'Party': 'NDP', 'Age': 22, 'Name': 'Liu, Laurin', 'Gender': 'Female' },
      { 'Province': 'Quebec', 'Party': 'Bloc Quebecois', 'Age': 43, 'Name': 'Mourani, Maria', 'Gender': 'Female' },
      { 'Province': 'Quebec', 'Party': 'NDP', 'Age': '', 'Name': 'Sellah, Djaouida', 'Gender': 'Female' },
      { 'Province': 'Quebec', 'Party': 'NDP', 'Age': 72, 'Name': 'St-Denis, Lise', 'Gender': 'Female' },
      { 'Province': 'British Columbia', 'Party': 'Liberal', 'Age': 71, 'Name': 'Fry, Hedy', 'Gender': 'Female' }],
      {
        //renderers: renderers,
        cols: ['Party'], rows: ['Province'],
        rendererName: 'Horizontal Stacked Bar Chart',
        rowOrder: 'value_z_to_a', colOrder: 'value_z_to_a',
        rendererOptions: {
          c3: {
            data: {
              colors: {
                Liberal: '#dc3912', Conservative: '#3366cc', NDP: '#ff9900',
                Green: '#109618', 'Bloc Quebecois': '#990099'
              }
            }
          }
        }
      });

    //voila!
  }

  ngOnInit() {
    // this._raw = this.reportService.raw;
    this.getData();

    this.pivotColumns = [
      { field: 'projectName', header: 'Project Name' },
      { field: 'floor', header: 'Floor' },
      { field: 'elementType', header: 'Element Type' },
      { field: 'elementID', header: 'Element ID' }
    ];

    // pivotta

    //this.selectedColumns = this.pivotColumns;

    let baseMap: Map<any, any> = new Map();
    baseMap.set("data", this._raw);

    let valueMap: Map<any, any> = new Map();
    let dataMap: Map<any, any> = new Map();
    valueMap = this.constructMap(this._raw, 'projectName');
    dataMap.set('projectName', valueMap);

    let projectNameMap: Map<any, any> = this.groupBy(baseMap, 'projectName');
    let elementTypeMap: Map<any, any> = this.groupBy(projectNameMap, 'elementType');

    this.printMap(baseMap);
  }

  onChange(event) {
    console.log("EVENT:" + JSON.stringify(event));
  }

  groupBy1(sourceData: any[], fields: string[]) {
    let pivotDataMap0 = new Map();
    let pivotDataMap1 = new Map();
    sourceData.forEach(element => {
      let key0 = element[fields[0]];
      let value0 = pivotDataMap0.get(key0);
      if (!value0) {
        value0 = [];
      }
      value0.push(element);

      if (fields.length > 1) {
        let key1 = element[fields[1]];
        pivotDataMap1 = pivotDataMap0.get(key0);
      }


      pivotDataMap0.set(key0, value0);
    });

    this.printMap(pivotDataMap0);
  }

  groupBy(sourceData: Map<any, any>, field: string) {
    let pivotDataMap = new Map();
    sourceData.forEach((value: any, key1: any) => {
      console.log(key1 + "===================");
      sourceData.get(key1).forEach(element => {
        let key0 = element[field];
        let value0 = pivotDataMap.get(key0);
        if (!value0) {
          value0 = [];
        }
        value0.push(element);
        pivotDataMap.set(key0, value0);
      });
    });
    return pivotDataMap;
  }

  constructMap(sourceData: any[], field: string) {
    let map = new Map();
    sourceData.forEach(element => {
      let key = element[field];
      let value = map.get(key);
      if (!value) {
        value = [];
      }
      value.push(element);
      map.set(key, value);
    });
    return map;
  }

  printMap(pivotDataMap) {
    console.log("------------------------");
    pivotDataMap.forEach((value: any, key: any) => {
      if (value instanceof Map) {
        this.printMap(value);
      } else {
        console.log(pivotDataMap);
      }
    });
    console.log("------------------------");
  }

  getData() {
    //let data:TreeNode = [];

    this._raw.forEach(element => {
      let children: TreeNode[] = [];
      for (let i = 1; i <= 10; i++) {
        let ss = {
          floor: "First",
          elementType: "Heavy Duty Beam",
          elementID: "Beam 0-10"
        }
        let child: TreeNode = {
          data: ss
        };
        children.push(child);
      }

      let da: TreeNode = {
        data: element,
        children: children
      };
      //da.data = element;
      this.nodes.push(da);
    });
  }

}
