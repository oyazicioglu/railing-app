import { Project } from '@prisma/client';
import { IpcMain, IpcMainEvent } from 'electron';
import { channels } from '../events/Electron.Channels';
import { ProjectService } from './Project.Service';

export class ProjectEvents {
    private service = new ProjectService();
    private ipc: IpcMain;
    constructor(ipc: IpcMain) {
        this.ipc = ipc;

        this.registerListEvent();
        this.registerAddEvent();
        this.registerGetEvent();
        this.registerDeleteEvent();
        this.registerUpdateEvent();
    }

    private registerListEvent() {
        this.ipc.on(channels.project.list, async (event: IpcMainEvent) => {
            const projects = await this.service.List();
            event.sender.send(channels.project.list, projects);
        });
    }

    private registerAddEvent() {
        this.ipc.on(channels.project.add, async (event: IpcMainEvent, args: any) => {
            const addREsult = await this.service.Add(args as Project).catch((error) => error);
            event.sender.send(channels.project.add, addREsult);
        });
    }

    private registerGetEvent() {
        this.ipc.on(channels.project.get, async (event: IpcMainEvent, args: any) => {
            const { id } = args;
            const getResult = await this.service.Get(id).catch((error) => error);
            event.sender.send(channels.project.get, getResult);
        });
    }

    private registerDeleteEvent() {
        this.ipc.on(channels.project.delete, async (event: IpcMainEvent, args: any) => {
            const { id } = args;
            const deleteResult = await this.service.Delete(id).catch((error) => error);
            event.sender.send(channels.project.delete, deleteResult);
        });
    }

    private registerUpdateEvent() {
        this.ipc.on(channels.project.update, async (event: IpcMainEvent, args: any) => {
            const { project } = args;
            const updateResult = await this.service
                .Update(project as Project)
                .catch((error) => console.log(error));
            event.sender.send(channels.project.update, updateResult);
        });
    }
}
