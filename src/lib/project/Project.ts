import { System } from "../system/System";
import { IProject } from "./IProject";

export class Project implements IProject {
    constructor(public system: System) {

    }
}