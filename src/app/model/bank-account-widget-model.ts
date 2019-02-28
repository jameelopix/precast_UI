import { CompanyDTO } from "./company-dto";
import { CompanySearchDTO } from "./company-search-dto";
import { ColiseumWidgetModel } from "./coliseum-widget-model";
import { BankAccountDTO } from "./bank-account-dto";
import { BankAccountSearchDTO } from "./bank-account-search-dto";

export class BankAccountWidgetModel extends ColiseumWidgetModel {

  private _bankAccountDTO: BankAccountDTO;
  private _bankAccountSearchDTO: BankAccountSearchDTO;
  private _bankAccountDTOs: BankAccountDTO[];


  /**
   * Getter bankAccountDTO
   * @return {BankAccountDTO}
   */
  public get bankAccountDTO(): BankAccountDTO {
    return this._bankAccountDTO;
  }

  /**
   * Getter bankAccountSearchDTO
   * @return {BankAccountSearchDTO}
   */
  public get bankAccountSearchDTO(): BankAccountSearchDTO {
    return this._bankAccountSearchDTO;
  }

  /**
   * Getter bankAccountDTOs
   * @return {BankAccountDTO[]}
   */
  public get bankAccountDTOs(): BankAccountDTO[] {
    return this._bankAccountDTOs;
  }

  /**
   * Setter bankAccountDTO
   * @param {BankAccountDTO} value
   */
  public set bankAccountDTO(value: BankAccountDTO) {
    this._bankAccountDTO = value;
  }

  /**
   * Setter bankAccountSearchDTO
   * @param {BankAccountSearchDTO} value
   */
  public set bankAccountSearchDTO(value: BankAccountSearchDTO) {
    this._bankAccountSearchDTO = value;
  }

  /**
   * Setter bankAccountDTOs
   * @param {BankAccountDTO[]} value
   */
  public set bankAccountDTOs(value: BankAccountDTO[]) {
    this._bankAccountDTOs = value;
  }

}