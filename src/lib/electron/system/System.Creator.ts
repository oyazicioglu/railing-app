import { ParisCreator } from "./subsystem/paris/Paris.Creator";
import { System } from "./System";

export class SystemCreator {
    static CreateByType(type: string) {
        switch (type) {
            case 'paris':
                return this.CreateSystemWithParis()

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
}