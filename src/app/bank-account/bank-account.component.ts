import { Component, OnInit } from '@angular/core';
import { BankAccountDTO } from '../model/bank-account-dto';
import { BankAccountService } from '../services/bank-account.service';
import { BankAccountWidgetModel } from '../model/bank-account-widget-model';
import { BankAccountSearchDTO } from '../model/bank-account-search-dto';
import { SelectItem } from 'primeng/api';
import { CompanyService } from '../services/company.service';
import { CompanySearchDTO } from '../model/company-search-dto';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  bankAccountDTOs: BankAccountDTO[] = [];

  companyOptions: SelectItem[] = [];

  constructor(private bankAccountService: BankAccountService,
    private companyService: CompanyService) { }

  ngOnInit() {
    this.fetchRequiredData();
  }

  fetchRequiredData() {
    this.getCompany();
    this.get();
  }

  getCompany() {
    this.companyService.get(new CompanySearchDTO(), (response: any) => {
      let companys = response['companyDTOs'];
      companys.forEach(element => {
        let companyOption: SelectItem = {
          label: element.name,
          value: element.id
        }

        this.companyOptions.push(companyOption);
      });
    });
  }

  save = (rowData) => {
    console.log("Inside save function.");
    console.table(rowData);

    this.bankAccountService.save(rowData, this.saveCallback);
  }

  saveCallback = (response: BankAccountWidgetModel) => {
    this.get();
  }

  get = () => {
    this.bankAccountService.get(new BankAccountSearchDTO(), this.getCallback);
  }

  getCallback = (response: BankAccountWidgetModel) => {
    this.bankAccountDTOs = response.bankAccountDTOs;
  }

  delete = (id: number) => {
    this.bankAccountService.delete(id, this.deleteCallback);
  }

  deleteCallback = (response: BankAccountWidgetModel) => {
    this.get();
  }

  options: any = {
    caption: "BankAccount Details",
    saveCallback: this.save,
    getCallback: this.get,
    deleteCallback: this.delete,
    columns: [
      {
        name: "Company",
        index: "companyDTO.name",
        model: "companyId",
        type: "select",
        width: "300px",
        selectOptions: this.companyOptions
      },
      {
        name: "Account No",
        index: "accountNo",
        type: "textInput",
        width: "300px"
      },
      {
        name: "Default",
        index: "defaultAccount",
        type: "checkBox",
        width: "300px"
      },
      {
        name: "Disabled",
        index: "disabled",
        type: "checkBox",
        width: "300px"
      }
    ]
  };

}
