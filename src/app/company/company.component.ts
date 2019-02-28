import { Component, OnInit } from '@angular/core';
import { CompanyWidgetModel } from '../model/company-widget-model';
import { CompanyDTO } from '../model/company-dto';
import { CompanyService } from '../services/company.service';
import { CompanySearchDTO } from '../model/company-search-dto';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companyDTOs: CompanyDTO[] = [];

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
  }

  save = (rowData) => {
    console.log("Inside save function.");
    console.table(rowData);

    this.companyService.save(rowData, this.saveCallback);
  }

  saveCallback = (response: CompanyWidgetModel) => {
    this.get();
  }

  get = () => {
    this.companyService.get(new CompanySearchDTO(), this.getCallback);
  }

  getCallback = (response: CompanyWidgetModel) => {
    this.companyDTOs = response.companyDTOs;
  }

  delete = (id: number) => {
    this.companyService.delete(id, this.deleteCallback);
  }

  deleteCallback = (response: CompanyWidgetModel) => {
    this.get();
  }

  options: any = {
    caption: "Company Details",
    saveCallback: this.save,
    getCallback: this.get,
    deleteCallback: this.delete,
    columns: [
      {
        name: "Name",
        index: "name",
        type: "textInput",
        width: "700px"
      }
    ]
  };

}
