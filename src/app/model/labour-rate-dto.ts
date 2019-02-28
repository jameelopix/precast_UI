import { BaseDTO } from "./base-dto";

export class LabourRateDTO extends BaseDTO {
    public workType: string;
    public projectId: number;
    public elementTypeId: number;
    public natureOfWork: string;
    public workDesc: string;
    public unit: string;
    public rate: string;

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
