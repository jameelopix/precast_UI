import { BaseDTO } from "./base-dto";

export class LabourActivityDTO extends BaseDTO {

    public castingActivityId: number;
    public subContractorId: number;
    public natureOfWork: string;
    public quantity: number;

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
