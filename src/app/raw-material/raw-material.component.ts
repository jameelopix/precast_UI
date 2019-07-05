import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RawMaterialService } from "../services/raw-material.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";
import { CompanyService } from "../services/company.service";
import { UIService } from "../services/ui.service";
import { ConfigService } from "../services/config.service";

@Component({
  selector: "app-raw-material",
  templateUrl: "./raw-material.component.html",
  styleUrls: ["./raw-material.component.css"]
})
export class RawMaterialComponent implements OnInit {
  rawMaterialDTOList: any[] = [];
  rawMaterialDialogVisibilty: boolean = false;
  rawMaterialForm: FormGroup;
  rawMaterialSearchForm: FormGroup;

  typeList: any[] = [];

  messages: any[] = [];

  result: any = null;

  constructor(
    private rawMaterialService: RawMaterialService,
    private companyService: CompanyService,
    private messageUtilService: MessageUtilService,
    private uiservice: UIService,
    private formBuilder: FormBuilder,
    private configService: ConfigService
  ) {
    this.createFormGroup();
  }

  ngOnInit() {
    this.fetchReleventData();
  }

  fetchReleventData() {
    this.getTypeConfigList();
  }

  getTypeConfigList() {
    this.configService.getConfigList(
      "RAW_MATERIAL_TYPE",
      this.saveRawMaterialTypeSuccessCallback
    );
  }

  saveRawMaterialTypeSuccessCallback = (response: any) => {
    this.typeList = this.uiservice.getDropdownlist(response["values"]);
  };

  createFormGroup() {
    this.rawMaterialForm = this.formBuilder.group({
      id: [null],
      name: ["", Validators.required],
      type: ["", Validators.required]
    });

    this.rawMaterialSearchForm = this.formBuilder.group({
      nameList: [""],
      typeList: [""]
    });
  }

  addRawMaterial = () => {
    this.rawMaterialForm.reset();
    this.rawMaterialDialogVisibilty = true;
  };

  editRawMaterial = rowData => {
    this.populateRawMaterialForm(rowData, false);
    this.rawMaterialDialogVisibilty = true;
  };

  copyRawMaterial = rowData => {
    this.populateRawMaterialForm(rowData);
    this.rawMaterialDialogVisibilty = true;
  };

  populateRawMaterialForm(rowData: any, makeIdNull: boolean = true) {
    this.rawMaterialForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      name: rowData["name"],
      type: { id: rowData["type"] }
    };

    this.rawMaterialForm.setValue(formValue);
  }

  saveRawMaterial = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.rawMaterialForm.getRawValue();

    let request = {
      rawMaterialDTO: {
        id: formData["id"],
        name: formData["name"],
        type: formData["type"]["id"]
      }
    };

    this.rawMaterialService.save(
      request,
      this.saveRawMaterialSuccessCallback,
      this.saveRawMaterialErrorCallback
    );
  };

  saveRawMaterialSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.rawMaterialDialogVisibilty = false;
    this.getRawMaterial();
  };

  saveRawMaterialErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelRawMaterial = () => {
    this.rawMaterialForm.reset();
    this.rawMaterialDialogVisibilty = false;
  };

  getRawMaterial = () => {
    let searchFormData = this.rawMaterialSearchForm.getRawValue();

    let request = {
      rawMaterialSearchDTO: {
        nameList: this.uiservice.getSearchData(searchFormData, "nameList"),
        typeList: this.uiservice.getSearchData(searchFormData, "typeList"),
        companyNeeded: true
      }
    };

    this.rawMaterialDTOList = [];
    this.rawMaterialService.get(request, this.getRawMaterialCallback);
  };

  getRawMaterialCallback = (response: any) => {
    this.rawMaterialDTOList = response.rawMaterialDTOList;
  };

  deleteRawMaterial = rowData => {
    this.messageUtilService.clearMessage(this.messages);

    this.rawMaterialService.delete(
      rowData["id"],
      this.deleteRawMaterialSuccessCallback,
      this.deleteRawMaterialErrorCallback
    );
  };

  deleteRawMaterialSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getRawMaterial();
  };

  deleteRawMaterialErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  rawMaterialOptions: any = {
    caption: "RawMaterial Details",
    addCallback: this.addRawMaterial,
    editCallback: this.editRawMaterial,
    copyCallback: this.copyRawMaterial,
    getCallback: this.getRawMaterial,
    deleteCallback: this.deleteRawMaterial,
    childPresent: true,
    columns: [
      {
        name: "Name",
        index: "name",
        type: "textInput"
      },
      {
        name: "Type",
        index: "type",
        type: "textInput"
      }
    ]
  };

  getControl(field: any) {
    return this.rawMaterialForm.controls[field];
  }
}
