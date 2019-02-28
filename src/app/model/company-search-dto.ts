import { ColiseumSearchDTO } from "./coliseum-search-dto";

export class CompanySearchDTO extends ColiseumSearchDTO {

    private _names: string[];
    private _selfCompanys: boolean[];
    private _disableds: boolean[];

    /**
     * Getter names
     * @return {string[]}
     */
    public get names(): string[] {
        return this._names;
    }

    /**
     * Getter selfCompanys
     * @return {boolean[]}
     */
    public get selfCompanys(): boolean[] {
        return this._selfCompanys;
    }

    /**
     * Getter disableds
     * @return {boolean[]}
     */
    public get disableds(): boolean[] {
        return this._disableds;
    }

    /**
     * Setter names
     * @param {string[]} value
     */
    public set names(value: string[]) {
        this._names = value;
    }

    /**
     * Setter selfCompanys
     * @param {boolean[]} value
     */
    public set selfCompanys(value: boolean[]) {
        this._selfCompanys = value;
    }

    /**
     * Setter disableds
     * @param {boolean[]} value
     */
    public set disableds(value: boolean[]) {
        this._disableds = value;
    }

}
