import { ISystem } from "./ISystem";
import { ISubSystem } from "./systems/ISubSystem";

export class System implements ISystem {
    constructor(public subSystem: ISubSystem) {

    }
}