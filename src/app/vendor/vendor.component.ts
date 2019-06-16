import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { VendorService } from "../services/vendor.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";

@Component({
  selector: "app-vendor",
  templateUrl: "./vendor.component.html",
  styleUrls: ["./vendor.component.css"]
})
export class VendorComponent implements OnInit {
  vendorDTOList: any[] = [];
  vendorDialogVisibilty: boolean = false;
  vendorForm: FormGroup;
  vendorSearchForm: FormGroup;

  messages: any[] = [];

  constructor(
    private vendorService: VendorService,
    private messageUtilService: MessageUtilService,
    private formBuilder: FormBuilder
  ) {
    this.createVendorFormGroup();
  }

  ngOnInit() {
    this.fetchReleventData();
  }

  fetchReleventData() {}

  createVendorFormGroup() {
    this.vendorForm = this.formBuilder.group({
      id: [null],
      name: [""]
    });

    this.vendorSearchForm = this.formBuilder.group({
      names: [[]]
    });
  }

  addVendor = () => {
    this.vendorForm.reset();
    this.vendorDialogVisibilty = true;
  };

  editVendor = rowData => {
    this.populateVendorForm(rowData, false);
    this.vendorDialogVisibilty = true;
  };

  copyVendor = rowData => {
    this.populateVendorForm(rowData);
    this.vendorDialogVisibilty = true;
  };

  populateVendorForm(rowData: any, makeIdNull: boolean = true) {
    this.vendorForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      name: rowData["name"]
    };

    this.vendorForm.setValue(formValue);
  }

  saveVendor = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.vendorForm.getRawValue();

    let request = {
      vendorDTO: {
        id: formData["id"],
        name: formData["name"]
      }
    };

    this.vendorService.save(
      request,
      this.saveVendorSuccessCallback,
      this.saveVendorErrorCallback
    );
  };

  saveVendorSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.vendorDialogVisibilty = false;
    this.getVendor();
  };

  saveVendorErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelVendor = () => {
    this.vendorForm.reset();
    this.vendorDialogVisibilty = false;
  };

  getVendor = () => {
    // this.messageUtilService.clearMessage(this.messages);

    this.vendorService.get({}, this.getVendorCallback);
  };

  getVendorCallback = (response: any) => {
    this.vendorDTOList = response.vendorDTOList;
  };

  deleteVendor = rowData => {
    this.messageUtilService.clearMessage(this.messages);

    this.vendorService.delete(
      rowData["id"],
      this.deleteVendorSuccessCallback,
      this.deleteVendorErrorCallback
    );
  };

  deleteVendorSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getVendor();
  };

  deleteVendorErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  vendorOptions: any = {
    caption: "Vendor Details",
    addCallback: this.addVendor,
    editCallback: this.editVendor,
    copyCallback: this.copyVendor,
    getCallback: this.getVendor,
    deleteCallback: this.deleteVendor,
    childPresent: true,
    columns: [
      {
        name: "Name",
        index: "name",
        type: "textInput"
        // width: "45%"
      }
    ]
  };
}
