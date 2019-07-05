import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MixtureService } from "../services/mixture.service";
import { MixtureItemService } from "../services/mixture-item.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";
import { UIService } from "../services/ui.service";
import { ConfigService } from "../services/config.service";
import { RawMaterialService } from "../services/raw-material.service";

@Component({
  selector: "app-mixture",
  templateUrl: "./mixture.component.html",
  styleUrls: ["./mixture.component.css"]
})
export class MixtureComponent implements OnInit {
  mixtureDTOList: any[] = [];
  mixtureDialogVisibilty: boolean = false;
  mixtureForm: FormGroup;
  mixtureSearchForm: FormGroup;

  mixtureItemDTOList: any[] = [];
  mixtureItemDialogVisibilty: boolean = false;
  mixtureItemForm: FormGroup;

  unitList: any[] = [];
  rawMaterialList: any[] = [];

  accTypeList: any[] = [
    {
      id: "CASH",
      name: "CASH"
    },
    {
      id: "BANK",
      name: "BANK"
    }
  ];

  messages: any[] = [];

  constructor(
    private mixtureService: MixtureService,
    private mixtureItemService: MixtureItemService,
    private rawMaterialService: RawMaterialService,
    private messageUtilService: MessageUtilService,
    private uiservice: UIService,
    private configService: ConfigService,
    private formBuilder: FormBuilder
  ) {
    this.createFormGroup();
  }

  ngOnInit() {
    this.fetchReleventData();
  }

  fetchReleventData() {
    this.getUnitConfigList();
    this.getRawMaterialList();
  }

  getUnitConfigList() {
    this.configService.getConfigList(
      "SUPPORTED_UNIT_Weight",
      this.weightSuccessCallback
    );
  }

  getRawMaterialList() {
    let request = {
      rawMaterialSearchDTO: {
        typeList: ["Concrete"]
      }
    };

    this.rawMaterialService.get(request, this.rawMaterialSuccessCallback);
  }

  rawMaterialSuccessCallback = (response: any) => {
    let list = [];

    response["rawMaterialDTOList"].forEach(element => {
      let obj = {
        id: element["name"],
        name: element["name"]
      };
      list.push(obj);
    });
    this.rawMaterialList = list;

    // console.log("JSON:" + JSON.stringify(this.rawMaterialList));
  };

  weightSuccessCallback = (response: any) => {
    this.unitList = this.uiservice.getDropdownlist(response["values"]);
  };

  createFormGroup() {
    this.mixtureForm = this.formBuilder.group({
      id: [null],
      name: ["", Validators.required]
    });

    this.mixtureSearchForm = this.formBuilder.group({
      nameList: [""]
    });

    this.mixtureItemForm = this.formBuilder.group({
      id: [null],
      mixtureDTOId: ["", Validators.required],
      rawMaterialName: ["", Validators.required],
      unit: ["", Validators.required],
      quantity: ["", Validators.required]
    });
  }

  addMixture = () => {
    this.mixtureForm.reset();
    this.mixtureDialogVisibilty = true;
  };

  editMixture = rowData => {
    this.populateMixtureForm(rowData, false);
    this.mixtureDialogVisibilty = true;
  };

  copyMixture = rowData => {
    this.populateMixtureForm(rowData);
    this.mixtureDialogVisibilty = true;
  };

  populateMixtureForm(rowData: any, makeIdNull: boolean = true) {
    this.mixtureForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      name: rowData["name"]
    };

    this.mixtureForm.setValue(formValue);
  }

  saveMixture = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.mixtureForm.getRawValue();

    let request = {
      mixtureDTO: {
        id: formData["id"],
        name: formData["name"]
      }
    };

    this.mixtureService.save(
      request,
      this.saveMixtureSuccessCallback,
      this.saveMixtureErrorCallback
    );
  };

  saveMixtureSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.mixtureDialogVisibilty = false;
    this.getMixture();
  };

  saveMixtureErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelMixture = () => {
    this.mixtureForm.reset();
    this.mixtureDialogVisibilty = false;
  };

  getMixture = () => {
    let searchFormData = this.mixtureSearchForm.getRawValue();

    let request = {
      mixtureSearchDTO: {
        nameList: this.uiservice.getSearchData(searchFormData, "nameList")
      }
    };

    this.mixtureDTOList = [];
    this.mixtureService.get(request, this.getMixtureCallback);
  };

  getMixtureCallback = (response: any) => {
    this.mixtureDTOList = response.mixtureDTOList;
  };

  deleteMixture = rowData => {
    this.messageUtilService.clearMessage(this.messages);

    this.mixtureService.delete(
      rowData["id"],
      this.deleteMixtureSuccessCallback,
      this.deleteMixtureErrorCallback
    );
  };

  deleteMixtureSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getMixture();
  };

  deleteMixtureErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  // Mixtur ITem
  addMixtureItem = parentValue => {
    this.mixtureItemForm.reset();

    let formValue = {
      mixtureDTOId: parentValue["id"]
    };

    this.mixtureItemForm.patchValue(formValue);

    this.mixtureItemDialogVisibilty = true;
  };

  editMixtureItem = (rowData, parentValue) => {
    this.populateMixtureItemForm(rowData, parentValue, false);
    this.mixtureItemDialogVisibilty = true;
  };

  copyMixtureItem = (rowData, parentValue) => {
    this.populateMixtureItemForm(rowData, parentValue);
    this.mixtureItemDialogVisibilty = true;
  };

  populateMixtureItemForm(
    rowData: any,
    parentValue,
    makeIdNull: boolean = true
  ) {
    this.mixtureItemForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      mixtureDTOId: parentValue["id"],
      rawMaterialName: { id: rowData["rawMaterialName"] },
      unit: { id: rowData["unit"] },
      quantity: rowData["quantity"]
    };

    this.mixtureItemForm.setValue(formValue);
  }

  cancelMixtureItem = () => {
    this.mixtureItemForm.reset();
    this.mixtureItemDialogVisibilty = false;
  };

  saveMixtureItem = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.mixtureItemForm.getRawValue();

    let mixtureDTOId = formData["mixtureDTOId"];

    let request = {
      mixtureItemDTO: {
        id: formData["id"],
        mixtureDTOId: mixtureDTOId,
        rawMaterialName: formData["rawMaterialName"]["id"],
        unit: formData["unit"]["id"],
        quantity: formData["quantity"]
      }
    };

    this.mixtureItemService.save(
      request,
      (response: any) => {
        this.saveMixtureItemSuccessCallback(response, mixtureDTOId);
      },
      this.saveMixtureItemErrorCallback
    );
  };

  saveMixtureItemSuccessCallback = (response: any, mixtureDTOId) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.mixtureItemDialogVisibilty = false;
    this.getMixtureItem({ id: mixtureDTOId });
  };

  saveMixtureItemErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  getMixtureItem = parentValue => {
    let request = {
      mixtureItemSearchDTO: {
        mixtureDTOIdList: [parentValue["id"]]
      }
    };

    this.mixtureItemDTOList = [];
    this.mixtureItemService.get(request, this.getMixtureItemCallback);
  };

  getMixtureItemCallback = (response: any) => {
    this.mixtureItemDTOList = response.mixtureItemDTOList;
  };

  deleteMixtureItem = (rowData, parentValue) => {
    this.messageUtilService.clearMessage(this.messages);

    this.mixtureItemService.delete(
      rowData["id"],
      (response: any) => {
        this.deleteMixtureItemSuccessCallback(response, parentValue);
      },
      this.deleteMixtureItemErrorCallback
    );
  };

  deleteMixtureItemSuccessCallback = (response: any, parentValue) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getMixtureItem(parentValue);
  };

  deleteMixtureItemErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  mixtureItemOptions: any = {
    caption: "Mix Design Details",
    addCallback: this.addMixtureItem,
    editCallback: this.editMixtureItem,
    copyCallback: this.copyMixtureItem,
    getCallback: this.getMixtureItem,
    deleteCallback: this.deleteMixtureItem,
    columns: [
      {
        name: "Name",
        index: "rawMaterialName",
        type: "textInput"
      },
      {
        name: "Quantity",
        index: "quantity",
        type: "textInput"
      },
      {
        name: "Unit",
        index: "unit",
        type: "textInput"
      }
    ]
  };

  mixtureOptions: any = {
    caption: "Mix Design",
    addCallback: this.addMixture,
    editCallback: this.editMixture,
    copyCallback: this.copyMixture,
    getCallback: this.getMixture,
    deleteCallback: this.deleteMixture,
    childPresent: true,
    columns: [
      {
        name: "Name",
        index: "name",
        type: "textInput"
      }
    ],
    childGridOptions: [this.mixtureItemOptions]
  };

  getControl(field: any) {
    return this.mixtureForm.controls[field];
  }

  getItemControl(field: any) {
    return this.mixtureItemForm.controls[field];
  }
}
