import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';

import { ProjectService } from '../services/project.service';

import { ProjectDTO } from '../model/project-dto';
import { ProjectWidgetModel } from '../model/project-widget-model';
import { ProjectSearchDTO } from '../model/project-search-dto';
import { GridComponent } from '../grid/grid.component';

const DELETE_URL: string = 'deleteProject';
const GET_URL: string = 'getProject';
const SAVE_URL: string = 'createProject';
const UPDATE_URL: string = 'updateProject';
const ESTIMATE_URL: string = 'estimateProject';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @ViewChild('projectGrid')
  projectGrid: GridComponent;

  projectDTOs: ProjectDTO[] = [];

  unitTypeOptions: SelectItem[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.fetchRequiredData();
  }

  fetchRequiredData() {
    this.getUnitType();
    this.get();
  }

  getUnitType() {
    let options = [
      { label: 'Sq. Feet', value: 'SQ_FT' },
      { label: 'Sq. Metre', value: 'SQ_MT' },
      { label: 'Litres', value: 'LITRES' },
      { label: 'Count', value: 'NOS' }
    ];

    options.forEach(element => {
      this.unitTypeOptions.push(element);
    });
  }

  save = (rowData) => {
    console.log("Inside save function.");
    console.table(rowData);

    console.log(this.projectGrid.getRowData());

    this.projectService.save(rowData, this.saveCallback);
  }

  saveCallback = (response: ProjectWidgetModel) => {
    this.get();
  }

  get = () => {
    this.projectService.get(new ProjectSearchDTO(), this.getCallback);
  }

  getCallback = (response: ProjectWidgetModel) => {
    this.projectDTOs = response.projectDTOs;
  }

  delete = (id: number) => {
    this.projectService.delete(id, this.deleteCallback);
  }

  deleteCallback = (response: ProjectWidgetModel) => {
    this.get();
  }

  projectOptions: any = {
    caption: "Project Details",
    saveCallback: this.save,
    getCallback: this.get,
    deleteCallback: this.delete,
    columns: [
      {
        name: "Code",
        index: "code",
        type: "textInput",
        width: "300px"
      },
      {
        name: "Name",
        index: "name",
        type: "textInput",
        width: "300px"
      },
      {
        name: "Unit",
        index: "unitType",
        type: "select",
        width: "300px",
        selectOptions: this.unitTypeOptions
      },
      {
        name: "Quantity",
        index: "quantity",
        type: "textInput",
        width: "300px"
      }
    ]
  };
}