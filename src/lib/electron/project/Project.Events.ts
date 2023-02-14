import { IpcMain, IpcMainEvent } from 'electron';
import { channels } from '../events/Electron.Channels';
import { ProjectService } from './Project.Service';

export class ProjectEvents {
    private service = new ProjectService();
    private ipc: IpcMain;
    constructor(ipc: IpcMain) {
        this.ipc = ipc;

        this.registerListEvent();
    }

    private registerListEvent() {
        this.ipc.on(channels.project.list, async (event: IpcMainEvent) => {
            const projects = await this.service.List();
            event.sender.send(channels.project.list, projects);
        });
    }
}
