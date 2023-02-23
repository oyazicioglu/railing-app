import { SystemType } from "../../../components/page/system/SystemType";
import { ParisCreator } from "./systems/paris/Paris.Creator";
import { System } from "./System";
import { SystemTypes } from "./System.Types";

export class SystemCreator {
    static CreateByType(type: SystemTypes) {
        switch (type) {
            case SystemTypes.Paris:
                return this.CreateSystemWithParis()

            case SystemTypes.Bodrum:
                return this.CreateSystemWithBodrum()
            default:
                break;
        }
    }

    static Create() {
        // return new System();
    }

    static CreateSystemWithParis() {
        const paris = ParisCreator.Create()
        return new System(paris);
    }

    static CreateSystemWithBodrum() {
        const paris = ParisCreator.Create()
        return new System(paris);
    }
}