import { SteelItemDTO } from "./steel-item-dto";
import { baseDirectiveCreate } from "@angular/core/src/render3/instructions";
import { BaseDTO } from "./base-dto";

export class ElementDTO extends BaseDTO {

    public name: string;
    public code: string;
    public type: string;
    public projectId: number;
    public mixtureId: number;
    public steelItemIds: number[];
    public steelItemDTOs: SteelItemDTO[];
    public theoryQuantity: number;
    public weight: number;
    public length: number;
    public breadth: number;
    public theoryArea: number;
    public billingConcreteQuantity: number;

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
