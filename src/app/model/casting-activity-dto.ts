import { BaseDTO } from "./base-dto";

export class CastingActivityDTO extends BaseDTO {
    public elementId: number;
    public castedDate: Date;
    public actualConcentreQuantity: number;

    public get id(): number {
        return this._id;
    }

    public get changeUser(): string {
        return this._changeUser;
    }

    public get lastUpdated(): Date {
        return this._lastUpdated;
    }

    public set id(value: number) {
        this._id = value;
    }

    public set changeUser(value: string) {
        this._changeUser = value;
    }

    public set lastUpdated(value: Date) {
        this._lastUpdated = value;
    }
}
