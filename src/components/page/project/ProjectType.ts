import { SystemType } from "../system/SystemType";

export type ProjectType = {
    id?: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    system?: SystemType;
};
