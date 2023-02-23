import { IAccessory } from "../../accessories/IAccessory";
import { ISystem } from "../../ISystem";
import { IProfile } from "../../profiles/IProfile";

export class Paris implements ISystem {
    constructor() {
    }

    private _profiles: IProfile[];
    public get profiles(): IProfile[] {
        return this._profiles;
    }
    public set profiles(v: IProfile[]) {
        this._profiles = v;
    }

    private _accessories: IAccessory[];
    public get accessories(): IAccessory[] {
        return this._accessories;
    }
    public set accessories(v: IAccessory[]) {
        this._accessories = v;
    }
}