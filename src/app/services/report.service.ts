import { Injectable } from '@angular/core';
import { RawMaterialCostQueryDTO } from '../model/raw-material-cost-query-dto';
import * as _ from "underscore";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private _raw: RawMaterialCostQueryDTO[] = [];

  constructor() {
    // for (let i = 1; i <= 10; i++) {
    //   let raw: RawMaterialCostQueryDTO = new RawMaterialCostQueryDTO();
    //   raw.projectName = "Project1";
    //   raw.floor = "First";
    //   raw.elementType = "Heavy Duty Beam";
    //   raw.elementID = "Beam 0-10";
    //   this._raw.push(raw);
    // }

   // _.each([1, 2, 3], alert);

    let json = this.constructJson();
    json.forEach(element => {
      let raw: RawMaterialCostQueryDTO = new RawMaterialCostQueryDTO();
      raw = element;
      this._raw.push(raw);
    });
  }

  get raw() {
    return this._raw;
  }

  constructJson() {
    let json = [
      {
        "projectName": "Special Products",
        "floor": "Ground",
        "elementType": "Heavy Duty Beam",
        "elementID": "Beam 0-10",
        "type": "Concrete",
        "rawMaterials": "12.5mm Aggregate",
        "unit": "Tonne",
        "theoriticalQuantity": 0.0796,
        "actualQuantity": 0.0796,
        "castedDate": "20-09-2017",
        "rate": 840,
        "estimatedAmount": 66.864,
        "actualAmount": 66.864
      },
      {
        "projectName": "Special Products",
        "floor": "Ground",
        "elementType": "Heavy Duty Beam",
        "elementID": "Beam 0-10",
        "type": "Concrete",
        "rawMaterials": "20mm Aggregate",
        "unit": "Tonne",
        "theoriticalQuantity": 0.142,
        "actualQuantity": 0.142,
        "castedDate": "20-09-2017",
        "rate": 840,
        "estimatedAmount": 119.28,
        "actualAmount": 119.28
      },
      {
        "projectName": "Special Products",
        "floor": "Ground",
        "elementType": "Heavy Duty Beam",
        "elementID": "Beam 0-10",
        "type": "Concrete",
        "rawMaterials": "6mm Chips",
        "unit": "Tonne",
        "theoriticalQuantity": 0,
        "actualQuantity": 0,
        "castedDate": "20-09-2017",
        "rate": 0,
        "estimatedAmount": 0,
        "actualAmount": 0
      }
    ]
    return json;
  }
}
