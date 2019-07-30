import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ElementService } from "../services/element.service";
import { ProjectService } from "../services/project.service";
import { MessageUtilService } from "../services/message-util.service";
import { MESSAGES } from "../model/messages";
import { UIService } from "../services/ui.service";
import { ElementTypeService } from "../services/element-type.service";
import { ElementDetailsService } from "../services/element-details.service";
import { MixtureService } from "../services/mixture.service";
import { SteelDetailsService } from "../services/steel-detail.service";
import { RawMaterialService } from "../services/raw-material.service";
import { ConfigService } from "../services/config.service";

@Component({
  selector: "app-element",
  templateUrl: "./element.component.html",
  styleUrls: ["./element.component.css"]
})
export class ElementComponent implements OnInit {
  elementDTOList: any[] = [];
  elementDialogVisibilty: boolean = false;
  elementForm: FormGroup;
  elementSearchForm: FormGroup;

  elementDetailsDTOList: any[] = [];
  elementDetailsDialogVisibilty: boolean = false;
  elementDetailsForm: FormGroup;

  steelDetailsDTOList: any[] = [];
  steelDetailsDialogVisibilty: boolean = false;
  steelDetailsForm: FormGroup;

  unitList: any[] = [];
  projectDTOList: any[] = [];
  rawMaterialDTOList: any[] = [];
  mixtureDTOList: any[] = [];
  elementTypeDTOList: any[] = [];

  messages: any[] = [];

  result: any = null;

  constructor(
    private elementService: ElementService,
    private elementDetailsService: ElementDetailsService,
    private steelDetailsService: SteelDetailsService,
    private projectService: ProjectService,
    private mixtureService: MixtureService,
    private elementTypeService: ElementTypeService,
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
    this.getProjectDTOList();
    this.getMixtureDTOList();
    this.getRawMaterialDTOList();
    this.getElementTypeDTOList();
    this.getUnitConfigList();
  }

  getUnitConfigList() {
    this.configService.getConfigList(
      "SUPPORTED_UNIT_Weight",
      this.weightSuccessCallback
    );
  }

  weightSuccessCallback = (response: any) => {
    this.unitList = this.uiservice.getDropdownlist(response["values"]);
  };

  getProjectDTOList() {
    this.projectService.get({}, (response: any) => {
      this.projectDTOList = response["projectDTOList"];
    });
  }

  getMixtureDTOList() {
    this.mixtureService.get({}, (response: any) => {
      let arr: any[] = [];

      response["mixtureDTOList"].forEach(element => {
        arr.push(element["name"]);
      });

      this.mixtureDTOList = this.uiservice.getDropdownlist(arr);
    });
  }

  getRawMaterialDTOList() {
    this.rawMaterialService.get({}, (response: any) => {
      let arr: any[] = [];

      response["rawMaterialDTOList"].forEach(element => {
        arr.push(element["name"]);
      });

      this.rawMaterialDTOList = this.uiservice.getDropdownlist(arr);
    });
  }

  getElementTypeDTOList() {
    this.elementTypeService.get({}, (response: any) => {
      this.elementTypeDTOList = response["elementTypeDTOList"];
    });
  }

  createFormGroup() {
    this.elementForm = this.formBuilder.group({
      id: [null],
      name: ["", Validators.required],
      floor: [""],
      projectId: ["", Validators.required],
      elementTypeId: ["", Validators.required]
    });

    this.elementDetailsForm = this.formBuilder.group({
      id: [null],
      mixDesignName: ["", Validators.required],
      elementId: [""],
      weight: [""],
      length: [""],
      width: [""],
      theoriticalQuantity: [""],
      unit: [""],
      thickness: [""]
    });

    this.steelDetailsForm = this.formBuilder.group({
      id: [null],
      rawMaterialName: ["", Validators.required],
      elementId: [""],
      unit: [""],
      theoriticalQuantity: [""]
    });

    this.elementSearchForm = this.formBuilder.group({
      nameList: [""],
      floorList: [""],
      projectIdList: [""],
      elementTypeIdList: [""]
    });
  }

  // Element functionality
  addElement = () => {
    this.elementForm.reset();
    this.elementDialogVisibilty = true;
  };

  editElement = rowData => {
    this.populateElementForm(rowData, false);
    this.elementDialogVisibilty = true;
  };

  copyElement = rowData => {
    this.populateElementForm(rowData);
    this.elementDialogVisibilty = true;
  };

  populateElementForm(rowData: any, makeIdNull: boolean = true) {
    this.elementForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      projectId: { id: rowData["projectId"] },
      elementTypeId: { id: rowData["elementTypeId"] },
      name: rowData["name"],
      floor: rowData["floor"]
    };

    this.elementForm.setValue(formValue);
  }

  saveElement = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.elementForm.getRawValue();

    let request = {
      elementDTO: {
        id: formData["id"],
        projectId: formData["projectId"]["id"],
        elementTypeId: formData["elementTypeId"]["id"],
        name: formData["name"],
        floor: formData["floor"]
      }
    };

    this.elementService.save(
      request,
      this.saveElementSuccessCallback,
      this.saveElementErrorCallback
    );
  };

  saveElementSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.elementDialogVisibilty = false;
    this.getElement();
  };

  saveElementErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelElement = () => {
    this.elementForm.reset();
    this.elementDialogVisibilty = false;
  };

  getElement = () => {
    let searchFormData = this.elementSearchForm.getRawValue();

    let request = {
      elementSearchDTO: {
        nameList: this.uiservice.getSearchData(searchFormData, "nameList"),
        floorList: this.uiservice.getSearchData(searchFormData, "floorList"),
        projectIdList: this.uiservice.getSearchData(
          searchFormData,
          "projectIdList"
        ),
        elementTypeIdList: this.uiservice.getSearchData(
          searchFormData,
          "elementTypeIdList"
        ),
        projectNeeded: true,
        elementTypeNeeded: true
      }
    };

    this.elementDTOList = [];
    this.elementService.get(request, this.getElementCallback);
  };

  getElementCallback = (response: any) => {
    this.elementDTOList = response.elementDTOList;
  };

  deleteElement = rowData => {
    this.messageUtilService.clearMessage(this.messages);

    this.elementService.delete(
      rowData["id"],
      this.deleteElementSuccessCallback,
      this.deleteElementErrorCallback
    );
  };

  deleteElementSuccessCallback = (response: any) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getElement();
  };

  deleteElementErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  // Element Details functionality
  addElementDetails = parentValue => {
    this.elementDetailsForm.reset();

    let formValue = {
      elementId: parentValue["id"]
    };

    this.elementDetailsForm.patchValue(formValue);

    this.elementDetailsDialogVisibilty = true;
  };

  editElementDetails = (rowData, parentValue) => {
    this.populateElementDetailsForm(rowData, parentValue, false);
    this.elementDetailsDialogVisibilty = true;
  };

  copyElementDetails = (rowData, parentValue) => {
    this.populateElementDetailsForm(rowData, parentValue);
    this.elementDetailsDialogVisibilty = true;
  };

  populateElementDetailsForm(
    rowData: any,
    parentValue,
    makeIdNull: boolean = true
  ) {
    this.elementDetailsForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let formValue = {
      id: id,
      mixDesignName: { id: rowData["mixDesignName"] },
      elementId: parentValue["id"],
      weight: rowData["weight"],
      length: rowData["length"],
      width: rowData["width"],
      thickness: rowData["thickness"],
      theoriticalQuantity: rowData["theoriticalQuantity"],
      unit: rowData["unit"]
    };

    this.elementDetailsForm.setValue(formValue);
  }

  saveElementDetails = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.elementDetailsForm.getRawValue();

    let elementId = formData["elementId"];

    let request = {
      elementDetailsDTO: {
        id: formData["id"],
        mixDesignName: formData["mixDesignName"]["id"],
        elementId: elementId,
        weight: formData["weight"],
        length: formData["length"],
        width: formData["width"],
        thickness: formData["thickness"],
        theoriticalQuantity: formData["theoriticalQuantity"],
        unit: formData["unit"]["id"]
      }
    };

    this.elementDetailsService.save(
      request,
      (response: any) => {
        this.saveElementDetailsSuccessCallback(response, elementId);
      },
      this.saveElementDetailsErrorCallback
    );
  };

  saveElementDetailsSuccessCallback = (response: any, elementId) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.elementDetailsDialogVisibilty = false;
    this.getElementDetails({ id: elementId });
  };

  saveElementDetailsErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelElementDetails = () => {
    this.elementDetailsForm.reset();
    this.elementDetailsDialogVisibilty = false;
  };

  getElementDetails = parentValue => {
    let request = {
      elementDetailsSearchDTO: {
        elementIdList: [parentValue["id"]],
        elementNeeded: true
      }
    };

    this.elementDetailsDTOList = [];
    this.elementDetailsService.get(request, this.getElementDetailsCallback);
  };

  getElementDetailsCallback = (response: any) => {
    this.elementDetailsDTOList = response.elementDetailsDTOList;
  };

  deleteElementDetails = (rowData, parentValue) => {
    this.messageUtilService.clearMessage(this.messages);

    this.elementDetailsService.delete(
      rowData["id"],
      (response: any) => {
        this.deleteElementDetailsSuccessCallback(response, parentValue);
      },
      this.deleteElementDetailsErrorCallback
    );
  };

  deleteElementDetailsSuccessCallback = (response: any, parentValue) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getElementDetails(parentValue);
  };

  deleteElementDetailsErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  // Steel Details functionality
  addSteelDetails = parentValue => {
    this.steelDetailsForm.reset();
    let formValue = {
      elementId: parentValue["id"]
    };

    this.steelDetailsForm.patchValue(formValue);
    this.steelDetailsDialogVisibilty = true;
  };

  editSteelDetails = (rowData, parentValue) => {
    this.populateSteelDetailsForm(rowData, parentValue, false);
    this.steelDetailsDialogVisibilty = true;
  };

  copySteelDetails = (rowData, parentValue) => {
    this.populateSteelDetailsForm(rowData, parentValue);
    this.steelDetailsDialogVisibilty = true;
  };

  populateSteelDetailsForm(
    rowData: any,
    parentValue,
    makeIdNull: boolean = true
  ) {
    this.steelDetailsForm.reset();

    let id = null;
    if (!makeIdNull) {
      id = rowData["id"];
    }

    let elementId = parentValue["id"];

    let formValue = {
      id: id,
      rawMaterialName: { id: rowData["rawMaterialName"] },
      elementId: elementId,
      unit: { id: rowData["unit"] },
      theoriticalQuantity: rowData["theoriticalQuantity"]
    };

    this.steelDetailsForm.setValue(formValue);
  }

  saveSteelDetails = () => {
    this.messageUtilService.clearMessage(this.messages);
    let formData = this.steelDetailsForm.getRawValue();

    let elementId = formData["elementId"];

    let request = {
      steelDetailsDTO: {
        id: formData["id"],
        rawMaterialName: formData["rawMaterialName"]["id"],
        elementId: elementId,
        unit: formData["unit"]["id"],
        theoriticalQuantity: formData["theoriticalQuantity"]
      }
    };

    this.steelDetailsService.save(
      request,
      (response: any) => {
        this.saveSteelDetailsSuccessCallback(response, elementId);
      },
      this.saveSteelDetailsErrorCallback
    );
  };

  saveSteelDetailsSuccessCallback = (response: any, elementId) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.SAVE_ACK_MSG
    );
    this.steelDetailsDialogVisibilty = false;
    this.getSteelDetails({ id: elementId });
  };

  saveSteelDetailsErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  cancelSteelDetails = () => {
    this.steelDetailsForm.reset();
    this.steelDetailsDialogVisibilty = false;
  };

  getSteelDetails = parentValue => {
    let request = {
      steelDetailsSearchDTO: {
        elementIdList: [parentValue["id"]],
        elementNeeded: true
      }
    };

    this.steelDetailsDTOList = [];
    this.steelDetailsService.get(request, this.getSteelDetailsCallback);
  };

  getSteelDetailsCallback = (response: any) => {
    this.steelDetailsDTOList = response.steelDetailsDTOList;
  };

  deleteSteelDetails = (rowData, parentValue) => {
    this.messageUtilService.clearMessage(this.messages);

    this.steelDetailsService.delete(
      rowData["id"],
      (response: any) => {
        this.deleteSteelDetailsSuccessCallback(response, parentValue);
      },
      this.deleteSteelDetailsErrorCallback
    );
  };

  deleteSteelDetailsSuccessCallback = (rowData, parentValue) => {
    this.messageUtilService.showSuccessMessages(
      this.messages,
      MESSAGES.DELETE_ACK_MSG
    );
    this.getSteelDetails(parentValue);
  };

  deleteSteelDetailsErrorCallback = (response: any) => {
    this.messageUtilService.showErrorMessages(this.messages, response[0]);
  };

  steelDetailsOptions: any = {
    caption: "Steel Details",
    addCallback: this.addSteelDetails,
    editCallback: this.editSteelDetails,
    copyCallback: this.copySteelDetails,
    getCallback: this.getSteelDetails,
    deleteCallback: this.deleteSteelDetails,
    childPresent: true,
    columns: [
      {
        name: "Raw Material",
        index: "rawMaterialName"
      },
      {
        name: "Theoritical Quantity",
        index: "theoriticalQuantity"
      },
      {
        name: "Unit",
        index: "unit"
      }
    ]
  };

  elementDetailsOptions: any = {
    caption: "Element Details",
    addCallback: this.addElementDetails,
    editCallback: this.editElementDetails,
    copyCallback: this.copyElementDetails,
    getCallback: this.getElementDetails,
    deleteCallback: this.deleteElementDetails,
    columns: [
      {
        name: "Mix Design",
        index: "mixDesignName"
      },
      {
        name: "Theoritical Quantity",
        index: "theoriticalQuantity"
      },
      {
        name: "Unit",
        index: "unit"
      },
      {
        name: "Weight",
        index: "weight"
      },
      {
        name: "Length",
        index: "length"
      },
      {
        name: "Width",
        index: "width"
      },
      {
        name: "Thickness",
        index: "thickness"
      }
    ]
  };

  elementOptions: any = {
    caption: "Element",
    addCallback: this.addElement,
    editCallback: this.editElement,
    copyCallback: this.copyElement,
    getCallback: this.getElement,
    deleteCallback: this.deleteElement,
    childPresent: true,
    columns: [
      {
        name: "Name",
        index: "name",
        type: "textInput"
      },
      {
        name: "Floor",
        index: "floor",
        type: "textInput"
      },
      {
        name: "Project",
        index: "projectDTO.name",
        type: "textInput"
      },
      {
        name: "Element Type",
        index: "elementTypeDTO.name",
        type: "textInput"
      }
    ],
    childGridOptions: [this.elementDetailsOptions, this.steelDetailsOptions]
  };

  getControl(field: any) {
    return this.elementForm.controls[field];
  }

  getElementControl(field: any) {
    return this.elementDetailsForm.controls[field];
  }

  getSteelControl(field: any) {
    return this.steelDetailsForm.controls[field];
  }
}
