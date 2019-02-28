import { CompanyDTO } from "./company-dto";
import { CompanySearchDTO } from "./company-search-dto";
import { ColiseumWidgetModel } from "./coliseum-widget-model";

export class CompanyWidgetModel extends ColiseumWidgetModel {

  private _companyDTO: CompanyDTO;
  private _companySearchDTO: CompanySearchDTO;
  private _companyDTOs: CompanyDTO[];


  /**
   * Getter companyDTO
   * @return {CompanyDTO}
   */
  public get companyDTO(): CompanyDTO {
    return this._companyDTO;
  }

  /**
   * Getter companySearchDTO
   * @return {CompanySearchDTO}
   */
  public get companySearchDTO(): CompanySearchDTO {
    return this._companySearchDTO;
  }

  /**
   * Getter companyDTOs
   * @return {CompanyDTO[]}
   */
  public get companyDTOs(): CompanyDTO[] {
    return this._companyDTOs;
  }

  /**
   * Setter companyDTO
   * @param {CompanyDTO} value
   */
  public set companyDTO(value: CompanyDTO) {
    this._companyDTO = value;
  }

  /**
   * Setter companySearchDTO
   * @param {CompanySearchDTO} value
   */
  public set companySearchDTO(value: CompanySearchDTO) {
    this._companySearchDTO = value;
  }

  /**
   * Setter companyDTOs
   * @param {CompanyDTO[]} value
   */
  public set companyDTOs(value: CompanyDTO[]) {
    this._companyDTOs = value;
  }

}
