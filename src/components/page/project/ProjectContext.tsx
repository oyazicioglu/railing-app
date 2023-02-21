import { createContext } from "react";
import { IProject } from "./IProject";

const ProjectContext = createContext({
    open: (projectId: number, projectName: string) => { },
    close: (project: IProject) => { }
})

export default ProjectContext;