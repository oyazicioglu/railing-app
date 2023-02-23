import { SystemCreator } from "../system/System.Creator";
import { SystemTypes } from "../system/System.Types";
import { Project } from "./Project";

export class ProjectCreator {
    static Create(systemType: SystemTypes) {
        const system = SystemCreator.CreateByType(systemType);
        const project = new Project(system);
        return project;
    }

}