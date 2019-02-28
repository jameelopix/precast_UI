import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';

import { RawMaterialService } from '../services/raw-material.service';

import { SelectItem } from 'primeng/api';

import { RawMaterialDTO } from '../model/raw-material-dto';
import { RawMaterialWidgetModel } from '../model/raw-material-widget-model';

const DELETE_URL: string = 'deleteRawMaterial';
const GET_URL: string = 'getRawMaterial';
const SAVE_URL: string = 'createRawMaterial';
const UPDATE_URL: string = 'updateRawMaterial';

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.css']
})
export class RawMaterialComponent implements OnInit {

  rawMaterialDTOs: RawMaterialDTO[] = [];

  rawMaterialTypes: SelectItem[] = [
    { label: 'Select Type', value: null },
    { label: 'Concrete', value: 'Concrete' },
    { label: 'Reinforcement', value: 'Reinforcement' },
    { label: 'Precast Accessories', value: 'Precast Accessories' }
  ];

  unitTypes: SelectItem[] = [
    { label: 'Select Unit', value: null },
    { label: 'Cum', value: 'Cum' },
    { label: 'Kg', value: 'Kg' },
    { label: 'Nos', value: 'Nos' },
    { label: 'sq.m.', value: 'sq.m.' },
    { label: 'Tonne', value: 'Tonne' }
  ];

  save = (rowData) => {
    console.log("Inside save function.");
    console.table(rowData);

    this.rawMaterialService.save(rowData, this.saveCallback);
  }

  saveCallback = (response: RawMaterialWidgetModel) => {
    this.get();
  }

  get = () => {
    this.rawMaterialService.get1([], this.getCallback);
  }

  getCallback = (response: RawMaterialWidgetModel) => {
    this.rawMaterialDTOs = response.rawMaterialDTOs;
  }

  delete = (id: number) => {
    this.rawMaterialService.delete(id, this.deleteCallback);
  }

  deleteCallback = (response: RawMaterialWidgetModel) => {
    this.get();
  }

  options: any = {
    caption: "Material Details",
    saveCallback: this.save,
    getCallback: this.get,
    deleteCallback: this.delete,
    columns: [
      {
        name: "Name",
        index: "name",
        type: "textInput",
        width: "300px"
      },
      {
        name: "Type",
        index: "type",
        type: "select",
        width: "300px",
        selectOptions: this.rawMaterialTypes
      },
      {
        name: "Unit",
        index: "unit",
        type: "select",
        width: "300px",
        selectOptions: this.unitTypes
      }
    ]
  };

  display: boolean = false;

  constructor(private formBuilder: FormBuilder, private rawMaterialService: RawMaterialService) { }

  ngOnInit() {

  }
}