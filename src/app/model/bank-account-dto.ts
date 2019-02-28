import { ColiseumDTO } from "./coliseum-dto";
import { CompanyDTO } from "./company-dto";

export class BankAccountDTO extends ColiseumDTO {
  private _id: number;
  private _accountNo: string;
  private _defaultAccount: boolean;
  private _disabled: boolean;
  private _companyId: number;
  private _companyDTO: CompanyDTO;


  /**
   * Getter id
   * @return {number}
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Getter accountNo
   * @return {string}
   */
  public get accountNo(): string {
    return this._accountNo;
  }

  /**
   * Getter defaultAccount
   * @return {boolean}
   */
  public get defaultAccount(): boolean {
    return this._defaultAccount;
  }

  /**
   * Getter disabled
   * @return {boolean}
   */
  public get disabled(): boolean {
    return this._disabled;
  }

  /**
   * Getter companyId
   * @return {number}
   */
  public get companyId(): number {
    return this._companyId;
  }

  /**
   * Getter companyDTO
   * @return {CompanyDTO}
   */
  public get companyDTO(): CompanyDTO {
    return this._companyDTO;
  }

  /**
   * Setter id
   * @param {number} value
   */
  public set id(value: number) {
    this._id = value;
  }

  /**
   * Setter accountNo
   * @param {string} value
   */
  public set accountNo(value: string) {
    this._accountNo = value;
  }

  /**
   * Setter defaultAccount
   * @param {boolean} value
   */
  public set defaultAccount(value: boolean) {
    this._defaultAccount = value;
  }

  /**
   * Setter disabled
   * @param {boolean} value
   */
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  /**
   * Setter companyId
   * @param {number} value
   */
  public set companyId(value: number) {
    this._companyId = value;
  }

  /**
   * Setter companyDTO
   * @param {CompanyDTO} value
   */
  public set companyDTO(value: CompanyDTO) {
    this._companyDTO = value;
  }
}
