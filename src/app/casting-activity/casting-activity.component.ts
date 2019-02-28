import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';

import { ClientService } from '../client.service';
import { ProjectService } from '../services/project.service';
import { ElementService } from '../services/element.service';


import { ProjectDTO } from '../model/project-dto';
import { ProjectWidgetModel } from '../model/project-widget-model';
import { ElementDTO } from '../model/element-dto';
import { ElementTypeDTO } from '../model/element-type-dto';
import { CastingActivityDTO } from '../model/casting-activity-dto';
import { SteelItemDTO } from '../model/steel-item-dto';
import { MixtureDTO } from '../model/mixture-dto';
import { LabourActivityDTO } from '../model/labour-activity-dto';

@Component({
  selector: 'app-casting-activity',
  templateUrl: './casting-activity.component.html',
  styleUrls: ['./casting-activity.component.css']
})
export class CastingActivityComponent implements OnInit {

  projectDTOs: ProjectDTO[] = [];
  elementDTOs: ElementDTO[] = [];
  elementTypeDTOs: ElementTypeDTO[] = [];
  steelItemDTOs: SteelItemDTO[] = [];
  mixtureDTOs: MixtureDTO[] = [];
  labourActivityDTOs: LabourActivityDTO[] = [];

  projectCodes:any[]=[];

  castingActivityDTO: CastingActivityDTO = new CastingActivityDTO();

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private clientService: ClientService,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      projectCode: '',
      floor: '',
      elementType: '',
      elementName: '',
      mixDesign: '',
      theoryQuantity: '',
      theoryArea: '',
      date: '',
      actualQuantity: '',
    });

    this.fetchAllRequiredData();
  }

  fetchAllRequiredData() {
    this.projectService.get([], this.getProjectCallback);
  }

  getProjectCallback = (response: ProjectWidgetModel) => {
    this.projectDTOs = response.projectDTOs;
  }

  cancel(){  }

  save(){  }
}
