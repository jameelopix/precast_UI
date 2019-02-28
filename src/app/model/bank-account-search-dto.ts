import { ColiseumSearchDTO } from "./coliseum-search-dto";

export class BankAccountSearchDTO extends ColiseumSearchDTO {

    private _accountNos: string[];
    private _defaultAccounts: boolean[];
    private _disableds: boolean[];
    private _companyIds: number[];


    /**
     * Getter accountNos
     * @return {string[]}
     */
    public get accountNos(): string[] {
        return this._accountNos;
    }

    /**
     * Getter defaultAccounts
     * @return {boolean[]}
     */
    public get defaultAccounts(): boolean[] {
        return this._defaultAccounts;
    }

    /**
     * Getter disableds
     * @return {boolean[]}
     */
    public get disableds(): boolean[] {
        return this._disableds;
    }

    /**
     * Getter companyIds
     * @return {number[]}
     */
    public get companyIds(): number[] {
        return this._companyIds;
    }

    /**
     * Setter accountNos
     * @param {string[]} value
     */
    public set accountNos(value: string[]) {
        this._accountNos = value;
    }

    /**
     * Setter defaultAccounts
     * @param {boolean[]} value
     */
    public set defaultAccounts(value: boolean[]) {
        this._defaultAccounts = value;
    }

    /**
     * Setter disableds
     * @param {boolean[]} value
     */
    public set disableds(value: boolean[]) {
        this._disableds = value;
    }

    /**
     * Setter companyIds
     * @param {number[]} value
     */
    public set companyIds(value: number[]) {
        this._companyIds = value;
    }

}