import { createContext } from "react";
import { IProject } from "./IProject";

const ProjectContext = createContext({
    open: (project: IProject) => { }
})

export default ProjectContext;