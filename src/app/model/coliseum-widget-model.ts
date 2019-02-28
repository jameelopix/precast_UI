import { ErrorDTO } from "./error-dto";

export class ColiseumWidgetModel {

  private _recordstoFetch: number;
  private _pageIndex: number;
  private _totalRecords: number;
  private _idsToDelete: number[];
  private _errorDTOs: ErrorDTO[];


  /**
   * Getter recordstoFetch
   * @return {number}
   */
  public get recordstoFetch(): number {
    return this._recordstoFetch;
  }

  /**
   * Getter pageIndex
   * @return {number}
   */
  public get pageIndex(): number {
    return this._pageIndex;
  }

  /**
   * Getter totalRecords
   * @return {number}
   */
  public get totalRecords(): number {
    return this._totalRecords;
  }

  /**
   * Getter idsToDelete
   * @return {number[]}
   */
  public get idsToDelete(): number[] {
    return this._idsToDelete;
  }

  /**
   * Getter errorDTOs
   * @return {ErrorDTO[]}
   */
  public get errorDTOs(): ErrorDTO[] {
    return this._errorDTOs;
  }

  /**
   * Setter recordstoFetch
   * @param {number} value
   */
  public set recordstoFetch(value: number) {
    this._recordstoFetch = value;
  }

  /**
   * Setter pageIndex
   * @param {number} value
   */
  public set pageIndex(value: number) {
    this._pageIndex = value;
  }

  /**
   * Setter totalRecords
   * @param {number} value
   */
  public set totalRecords(value: number) {
    this._totalRecords = value;
  }

  /**
   * Setter idsToDelete
   * @param {number[]} value
   */
  public set idsToDelete(value: number[]) {
    this._idsToDelete = value;
  }

  /**
   * Setter errorDTOs
   * @param {ErrorDTO[]} value
   */
  public set errorDTOs(value: ErrorDTO[]) {
    this._errorDTOs = value;
  }

}
