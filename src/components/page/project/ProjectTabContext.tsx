import { createContext } from "react";
import { ProjectType } from "./ProjectType";

const ProjectTabContext = createContext({
    open: (project: ProjectType) => { },
    changeProjectName: (projectId: number, projectName: string) => { }
})

export default ProjectTabContext;