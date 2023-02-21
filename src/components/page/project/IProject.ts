import { ISystem } from "../../../lib/electron/system/ISystem";

export type IProject = {
    id?: number;
    name: string;
    createdAt: Date;
    updatedAt?: Date;
    system?: ISystem;
};
