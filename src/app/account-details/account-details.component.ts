import { Component, OnInit } from '@angular/core';
import { Message, SelectItem, MessageService } from 'primeng/components/common/api';
import { AccountDetailsDTO } from '../model/account-details-dto';
import { ClientService } from '../client.service';
import { PurchaseOrderService } from '../services/purchase-order.service';
import { OrderItemService } from '../services/order-item.service';
import { CompanyService } from '../services/company.service';
import { AccountDetailService } from '../services/account-detail.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
  providers: [MessageService]
})
export class AccountDetailsComponent implements OnInit {

  messages: Message[] = [];

  accountDetailsDTOList: AccountDetailsDTO[] = [];

  accountTypeSelectOptions: SelectItem[] = [
    { label: 'Select Item', value: null },
    { label: 'Cash', value: 'CASH' },
    { label: 'Bank', value: 'BANK' }
  ];

  companySelectOptions: SelectItem[] = [];

  constructor(
    private messageService: MessageService,
    private companyService: CompanyService,
    private accountDetailService: AccountDetailService) { }

  ngOnInit() {
    this.fetchRequiredData();

    // this.purchaseOrderGrid.get
  }

  fetchRequiredData() {
    this.getCompany();
  }

  getCompany = () => {
    let request = {};
    this.companyService.get(request, (response: any) => {
      let companyDTOList = response.companyDTOList;

      this.companySelectOptions = [];
      companyDTOList.forEach(element => {
        this.companySelectOptions.push({
          label: element.name,
          value: element.id
        });
      });

      console.log("this.companySelectOptions:" + JSON.stringify(this.companySelectOptions));
    });
  }

  saveAccountDetails = (rowData) => {
    let request = {
      "accountDetailsDTO": rowData
    };

    this.accountDetailService.save(request, (response: any) => {
      this.getAccountDetails();
    });
  }

  getAccountDetails = () => {
    let request = {};
    this.accountDetailService.get(request, (response: any) => {
      this.accountDetailsDTOList = response.accountDetailsDTOList;
    });
  }

  deleteAccountDetails = (id: number) => {
    this.accountDetailService.delete(id, (response: any) => {
      this.getAccountDetails();
    });
  }

  accountDetailsOptions: any = {
    values: this.accountDetailsDTOList,
    caption: "Account Details",
    saveCallback: this.saveAccountDetails,
    getCallback: this.getAccountDetails,
    deleteCallback: this.deleteAccountDetails,
    columns: [
      {
        name: "Company",
        index: "companyId",
        type: "select",
        selectOptions: this.companySelectOptions
        // width: "300px"
      },
      {
        name: "Account Type",
        index: "accountType",
        type: "select",
        selectOptions: this.accountTypeSelectOptions
        // width: "300px"
      }, {
        name: "Account Name",
        index: "accountName",
        type: "textInput",
        // width: "300px"
      },
      {
        name: "Account No",
        index: "accountNumber",
        type: "textInput"
        // width: "300px"
      }
    ]
  };

  clearMessages() {
    this.messages = [];
  }

  showSuccessMessages(data: string, title?: string) {
    this.writeMessage('success', data, title ? title : 'Success');
  }

  showInfoMessages(data: string, title?: string) {
    this.writeMessage('info', data, title ? title : 'Info');
  }

  showErrorMessages(data: string, title?: string) {
    this.writeMessage('error', data, title ? title : 'Error');
  }

  showWarnMessages(data: string, title?: string) {
    this.writeMessage('warn', data, title ? title : 'Warning');
  }

  writeMessage(severity: string, data: string, title: string) {
    this.messages.push({ severity: severity, summary: title, detail: data });
  }

}
