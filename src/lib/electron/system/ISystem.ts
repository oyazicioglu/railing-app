import { IProject } from "../../../components/page/project/IProject";

export interface ISystem {
    id?: number;
    name: string;
    projects?: IProject[]
}