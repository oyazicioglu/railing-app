import { IAccessory } from "../../accessory/IAccessory";
import { KM2050 } from "../../accessory/KM2050";
import { IProfile } from "../../profile/IProfile";
import { KM14079 } from "../../profile/KM14079";
import { Paris } from "./Paris";

export class ParisCreator {
    static Create() {
        const paris = new Paris();
        paris.accessories = ParisCreator.CreateAccessories();
        paris.profiles = ParisCreator.CreateProfiles();
        return new Paris()
    }

    private static CreateAccessories() {
        const accesories: IAccessory[] = [
            new KM2050()
        ]

        return accesories
    }

    private static CreateProfiles() {
        const profiles: IProfile[] = [
            new KM14079()
        ]

        return profiles;
    }
}