import { IAccessory } from "./accessories/IAccessory";
import { IProfile } from "./profiles/IProfile";

export interface ISystem {

    profiles: IProfile[];
    accessories: IAccessory[];
}