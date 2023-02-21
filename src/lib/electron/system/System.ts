import { ISystem } from "./ISystem";
import { ISubSystem } from "./subsystem/ISubSystem";

export class System implements ISystem {
    constructor(public subSystem: ISubSystem) {

    }
}