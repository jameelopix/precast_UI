import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { Table } from "primeng/components/table/table";
import { MESSAGES } from "../model/messages";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { MenuItem } from "primeng/components/common/menuitem";

@Component({
  selector: "grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"]
})
export class GridComponent implements OnInit, OnChanges {
  @ViewChild(Table) tableComponent: Table;

  @Input()
  parentValue: any = null;

  @Input()
  values: any[] = [];

  @Input()
  messages: any[] = [];

  @Input()
  childvalue1: any[] = [];

  selectedValues: any[] = [];

  @Input()
  options: any = {};

  ctx = { caption: this.options.caption };

  editState: boolean = false;

  exportDialogDisplay: boolean = false;

  rowDataFormGroup: FormGroup;

  exportData: string = null;
  fileName: string = null;

  items: MenuItem[];

  private readonly rowDataEditMode: string = "editMode";

  constructor(private fb: FormBuilder) {
    console.log("From constructor:" + JSON.stringify(this.options));
  }

  ngOnInit() {
    console.log("From NGinit:" + JSON.stringify(this.options));

    this.rowDataFormGroup = new FormGroup({});
    this.options["columns"].forEach(element => {
      console.log(element);
      if (!element["model"]) {
        element["model"] = element["index"];
      }
      this.rowDataFormGroup.addControl(element["model"], new FormControl(""));
    });

    //   this.items = [{
    //     label: 'Issue',
    //     command: this.issueCommand
    //   },
    //   {
    //     label: 'Close',
    //     command: this.closeCommand
    //   }];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(JSON.stringify("changes.prop:" + changes.prop));
    // throw new Error("Method not implemented.");
  }

  getActions(options, rowData): MenuItem[] {
    let value = rowData;

    let menuItems: MenuItem[] = [];
    options.actions.forEach(element => {
      let menuItem: MenuItem = {};
      menuItem.label = element.label;
      menuItem.icon = element.icon;
      menuItem.command = e => element.action(value, this.parentValue);

      menuItems.push(menuItem);
    });

    return menuItems;
  }

  // getActions1(options, rowData) {
  //   options.actions.forEach(element => {
  //     element.command = (event, rowData) => {
  //       element.fun(rowData);
  //       // console.log("element.command(rowData)");
  //     }
  //   });

  //   return options.actions;
  // }

  issueCommand(event) {
    console.log("issueCommand" + event);
  }

  closeCommand(event) {
    console.log("closeCommand" + event);
  }

  lazyLoad(event) {
    console.log("Inside lazyLoad function.");
    console.table({ event });
    this.options.getCallback(this.parentValue);
    console.log("-----------------------");
  }

  paginate(event) {
    console.log("Inside paginate function.");
    console.table({ event });
    this.options.getCallback(this.parentValue);
    console.log("-----------------------");
  }

  changevalue(event) {
    console.log("Inside changevalue function.");
    console.table({ event });
    console.log("-----------------------");
  }

  getNgModel(rowData: any, column: any) {
    let model = column["model"];
    if (!model) {
      model = column.index;
    }
    return "rowData[model]"; //companyId
  }

  getRowData(): any {
    let obj = {
      oldValue: this.selectedValues[0],
      newValue: this.rowDataFormGroup.getRawValue(),
      errors: this.rowDataFormGroup.errors
    };
    return obj;
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

  add() {
    console.log("Inside save function.");
    let value = {};
    value[this.rowDataEditMode] = true;
    this.values.unshift(value);

    this.selectedValues.push(value);
    this.editState = true;
  }

  exportDialog() {
    this.exportDialogDisplay = true;
  }

  closeExportDialog() {
    this.exportDialogDisplay = false;
  }

  export() {
    console.log("Inside export function.");
    if (!this.tableComponent.columns) {
      let cols = [];
      this.options.columns.forEach(element => {
        cols.push({ field: element.index, header: element.name });
      });
      this.tableComponent.columns = cols;
    }
    this.tableComponent.exportFilename = this.fileName;
    if (this.exportData == "selected") {
      this.tableComponent.exportCSV({ selectionOnly: true });
    } else {
      this.tableComponent.exportCSV();
    }
    this.closeExportDialog();
  }

  getTableValue(options) {
    return options.values;
  }

  save() {
    console.log("Inside save function." + this.rowDataFormGroup.value);
    let value = this.selectedValues[0];
    let rowData = this.rowDataFormGroup.getRawValue();
    // populating reactive form data to value
    for (const key in rowData) {
      value[key] = rowData[key];
    }

    // Cloning the value and using to avoid select2 issue
    let clonedValue = this.deepClone(value);
    delete clonedValue[this.rowDataEditMode];

    this.options.saveCallback(clonedValue, this.parentValue);
    this.editState = false;
    this.clearSelection();
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

  clearSelection() {
    this.selectedValues = [];
  }

  cancel() {
    console.log("Inside cancel function.");
    this.tableComponent.reset();
    this.editState = false;
    this.clearSelection();
    this.options.getCallback(this.parentValue);
  }

  edit(value: any) {
    console.log("Inside edit function.");
    console.table({ value });
    value[this.rowDataEditMode] = true;
    this.selectedValues.push(value);

    let inputValues = {};
    this.options["columns"].forEach(element => {
      let key = element["model"];
      if ("date" == element["type"]) {
        inputValues[key] = new Date(value[key]);
      } else {
        inputValues[key] = value[key];
      }
    });

    this.rowDataFormGroup.setValue(inputValues);

    this.editState = true;
  }

  getColSpan_emptyMsg(options) {
    let len = options.columns.length + 2;
    if (options.childGridOptions) {
      len++;
    }
    return len;
  }

  getColSpan_childTable(options) {
    let len = options.columns.length + 1;
    if (options.childGridOptions) {
      len++;
    }
    return len;
  }

  delete(value: any) {
    console.log("Inside delete function.");
    console.table(value);

    if (window.confirm(MESSAGES.DELETE_CONFIRM_MSG)) {
      this.options.deleteCallback(value.id, this.parentValue);
      this.editState = false;
    }
  }

  copy(value: any) {
    console.log("Inside copy function.");
    console.table(value);

    let rowData = this.clone(value);
    rowData["id"] = null;
    rowData[this.rowDataEditMode] = true;
    this.values.unshift(rowData);

    this.selectedValues.push(rowData);
    this.editState = true;
  }

  clone(src: any) {
    let target = {};
    for (let prop in src) {
      if (src.hasOwnProperty(prop)) {
        target[prop] = src[prop];
      }
    }
    return target;
  }
}
