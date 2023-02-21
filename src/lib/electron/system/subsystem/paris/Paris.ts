import { IAccessory } from "../../accessory/IAccessory";
import { IProfile } from "../../profile/IProfile";
import { ISubSystem } from "../ISubSystem";

export class Paris implements ISubSystem {
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

    public get profilesAndAccessories(): { profiles: IProfile[], accessories: IAccessory[] } {
        return { profiles: this.profiles, accessories: this.accessories }
    }
}