import { IAccessory } from "../accessory/IAccessory";
import { IProfile } from "../profile/IProfile";

export interface ISubSystem {
    profiles: IProfile[];
    accessories: IAccessory[];
}