import { IProject } from "../project/IProject";

export interface ISystem {
    id?: number;
    name: string;
    projects?: IProject[]
}