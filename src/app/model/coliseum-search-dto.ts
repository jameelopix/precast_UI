export class ColiseumSearchDTO {
    private _ids: number[];

    /**
     * Getter ids
     * @return {number[]}
     */
    public get ids(): number[] {
        return this._ids;
    }

    /**
     * Setter ids
     * @param {number[]} value
     */
    public set ids(value: number[]) {
        this._ids = value;
    }
}