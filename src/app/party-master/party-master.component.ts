import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PartyMasterService } from "../services/party-master.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";

@Component({
  selector: "app-party-master",
  templateUrl: "./party-master.component.html",
  styleUrls: ["./party-master.component.css"]
})
export class PartyMasterComponent implements OnInit {
  partyMasterDTOList: any[] = [];
  partyMasterDialogVisibilty: boolean = false;
  partyMasterForm: FormGroup;
  partyMasterSearchForm: FormGroup;

  messages: any[] = [];

  result: any = null;

  partyTypes: any[] = [
    {
      id: "Vendor",
      name: "Vendor"
    },
    {
      id: "Project",
      name: "Project"
    }
  ];

  constructor(
    private partyMasterService: PartyMasterService,
    private messageUtilService: MessageUtilService,
    private formBuilder: FormBuilder
  ) {
    this.createFormGroup();
  }

  ngOnInit() {
    this.fetchReleventData();
  }

  fetchReleventData() {}

  createFormGroup() {
    this.partyMasterForm = this.formBuilder.group({
      id: [null],
      name: ["", Validators.required],
      type: ["", Validators.required]
    });

    this.partyMasterSearchForm = this.formBuilder.group({
      names: [""],
      types: [""]
    });
  }

  addPartyMaster = () => {
    this.partyMasterForm.reset();
    this.partyMasterDialogVisibilty = true;
  };

  editPartyMaster = rowData => {
    this.populatePartyMasterForm(rowData, false);
    this.partyMasterDialogVisibilty = true;
  };

  copyPartyMaster = rowData => {
    this.populatePartyMasterForm(rowData);
    this.partyMasterDialogVisibilty = true;
  };

  populatePartyMasterForm(rowData: any, makeIdNull: boolean = true) {
    this.partyMasterForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      name: rowData["name"],
      type: { id: rowData["type"], name: rowData["type"] }
    };

    this.partyMasterForm.setValue(formValue);
  }

  searchPartyMaster = () => {
    let searchFormData = this.partyMasterSearchForm.getRawValue();

    let request = {
      partyMasterSearchDTO: {
        nameList: [searchFormData["names"]],
        typeList: [searchFormData["types"]["id"]]
      }
    };

    this.result = request;

    this.partyMasterService.get(request, this.getPartyMasterCallback);
  };

  savePartyMaster = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.partyMasterForm.getRawValue();

    let request = {
      partyMasterDTO: {
        id: formData["id"],
        name: formData["name"],
        type: formData["type"]["id"]
      }
    };

    this.partyMasterService.save(
      request,
      this.savePartyMasterSuccessCallback,
      this.savePartyMasterErrorCallback
    );
  };

  savePartyMasterSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.partyMasterDialogVisibilty = false;
    this.getPartyMaster();
  };

  savePartyMasterErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelPartyMaster = () => {
    this.partyMasterForm.reset();
    this.partyMasterDialogVisibilty = false;
  };

  getPartyMaster = () => {
    this.partyMasterService.get({}, this.getPartyMasterCallback);
  };

  getPartyMasterCallback = (response: any) => {
    this.partyMasterDTOList = response.partyMasterDTOList;
  };

  deletePartyMaster = rowData => {
    this.messageUtilService.clearMessage(this.messages);

    this.partyMasterService.delete(
      rowData["id"],
      this.deletePartyMasterSuccessCallback,
      this.deletePartyMasterErrorCallback
    );
  };

  deletePartyMasterSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getPartyMaster();
  };

  deletePartyMasterErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  partyMasterOptions: any = {
    caption: "PartyMaster Details",
    addCallback: this.addPartyMaster,
    editCallback: this.editPartyMaster,
    copyCallback: this.copyPartyMaster,
    getCallback: this.getPartyMaster,
    deleteCallback: this.deletePartyMaster,
    childPresent: true,
    columns: [
      {
        name: "Name",
        index: "name",
        type: "textInput"
      },
      {
        name: "Type",
        index: "type"
      }
    ]
  };

  getControl(field: any) {
    return this.partyMasterForm.controls[field];
  }
}
