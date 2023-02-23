import { createContext } from "react";

const ProjectContext = createContext({
    open: (projectId: number, projectName: string) => { },
})

export default ProjectContext;