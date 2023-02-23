import { IAccessory } from "./accessories/IAccessory";
import { IProfile } from "./profiles/IProfile";

export interface HasHandrailOptions {
    Handrails: IProfile[];
    WallConnections: IAccessory[]
}