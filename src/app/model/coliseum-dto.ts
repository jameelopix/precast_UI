export class ColiseumDTO {
    private _version: number;
    private _createdBy: string;
    private _createdDate: Date;
    private _lastModifiedBy: string;
    private _lastModifiedDate: Date;

    public get version(): number {
        return this._version;
    }

    public get createdBy(): string {
        return this._createdBy;
    }

    public get createdDate(): Date {
        return this._createdDate;
    }

    public get lastModifiedBy(): string {
        return this._lastModifiedBy;
    }

    public get lastModifiedDate(): Date {
        return this._lastModifiedDate;
    }

    public set version(value: number) {
        this._version = value;
    }

    public set createdBy(value: string) {
        this._createdBy = value;
    }

    public set createdDate(value: Date) {
        this._createdDate = value;
    }

    public set lastModifiedBy(value: string) {
        this._lastModifiedBy = value;
    }

    public set lastModifiedDate(value: Date) {
        this._lastModifiedDate = value;
    }
}