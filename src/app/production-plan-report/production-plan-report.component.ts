import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ReportService } from "../services/report.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";
import { CompanyService } from "../services/company.service";
import { UIService } from "../services/ui.service";
import { ProjectService } from "../services/project.service";
import { ElementTypeService } from "../services/element-type.service";
import { ElementService } from "../services/element.service";

@Component({
  selector: "app-production-plan-report",
  templateUrl: "./production-plan-report.component.html",
  styleUrls: ["./production-plan-report.component.css"]
})
export class ProductionPlanReportComponent implements OnInit {
  productionPlanReportDTOList: any[] = [];
  productionPlanReportDTOSearchForm: FormGroup;

  projectDTOList: any[] = [];
  elementTypeDTOList: any[] = [];
  elementDTOList: any[] = [];

  constructor(
    private uiservice: UIService,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private elementTypeService: ElementTypeService,
    private elementService: ElementService,
    private reportService: ReportService
  ) {
    this.createFormGroup();
  }

  createFormGroup() {
    this.productionPlanReportDTOSearchForm = this.formBuilder.group({
      projectIdList: [""],
      elementTypeIdList: [""],
      elementIdList: [""]
    });
  }

  ngOnInit() {
    this.fetchReleventData();
  }

  fetchReleventData() {
    this.getProjectDTOList();
    this.getElementTypeDTOList();
    this.getElementDTOList();
  }

  getProjectDTOList() {
    this.projectService.get({}, (response: any) => {
      this.projectDTOList = response["projectDTOList"];
    });
  }

  getElementTypeDTOList() {
    this.elementTypeService.get({}, (response: any) => {
      this.elementTypeDTOList = response["elementTypeDTOList"];
    });
  }

  getElementDTOList() {
    this.elementService.get({}, (response: any) => {
      this.elementDTOList = response["elementDTOList"];
    });
  }

  getProductionPlanReportDTO = () => {
    let searchFormData = this.productionPlanReportDTOSearchForm.getRawValue();

    let request = {
      reportType: "PRODUCTION_PLAN",
      reportSearchDTO: {
        projectIdList: this.uiservice.getSearchData(
          searchFormData,
          "projectIdList"
        ),
        elementIdList: this.uiservice.getSearchData(
          searchFormData,
          "elementIdList"
        ),
        elementTypeIdList: this.uiservice.getSearchData(
          searchFormData,
          "elementTypeIdList"
        )
      }
    };

    this.productionPlanReportDTOList = [];
    this.reportService.get(request, this.getProductionPlanReportDTOCallback);
  };

  getProductionPlanReportDTOCallback = (response: any) => {
    this.productionPlanReportDTOList =
      response.productionPlanReportDTOList;
  };

  productionPlanReportDTOOptions: any = {
    caption: "Production Plan Report",
    getCallback: this.getProductionPlanReportDTO,
    columns: [
      {
        name: "Project Name",
        index: "projectName"
      },
      {
        name: "Project Code",
        index: "projectCode"
      },
      {
        name: "Type",
        index: "elementTypeName"
      },
      {
        name: "Element",
        index: "elementName"
      },
      {
        name: "Floor",
        index: "floor"
      },
      {
        name: "Status",
        index: "productionPlanStatus"
      },
      {
        name: "Planned Date",
        index: "plannedDate"
      },
      {
        name: "Delivered Date",
        index: "deliveredDate"
      }
    ]
  };
}
