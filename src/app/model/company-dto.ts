import { ColiseumDTO } from "./coliseum-dto";

export class CompanyDTO extends ColiseumDTO {
  private _id: number;
  private _name: string;
  private _selfCompany: boolean;
  private _disabled: boolean;


  /**
   * Getter id
   * @return {number}
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Getter name
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Getter selfCompany
   * @return {boolean}
   */
  public get selfCompany(): boolean {
    return this._selfCompany;
  }

  /**
   * Getter disabled
   * @return {boolean}
   */
  public get disabled(): boolean {
    return this._disabled;
  }

  /**
   * Setter id
   * @param {number} value
   */
  public set id(value: number) {
    this._id = value;
  }

  /**
   * Setter name
   * @param {string} value
   */
  public set name(value: string) {
    this._name = value;
  }

  /**
   * Setter selfCompany
   * @param {boolean} value
   */
  public set selfCompany(value: boolean) {
    this._selfCompany = value;
  }

  /**
   * Setter disabled
   * @param {boolean} value
   */
  public set disabled(value: boolean) {
    this._disabled = value;
  }
}
