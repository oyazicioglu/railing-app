import { IpcMain, IpcMainEvent } from "electron";
import { channels } from "../../electron/events/Electron.Channels";
import { SystemService } from "../System.Service";

export class SystemEvents {
    private service = new SystemService();
    private ipc: IpcMain;

    constructor(ipc: IpcMain) {
        this.ipc = ipc;

        this.registerListEvent();
        this.registerGetEvent()
    }

    private registerListEvent() {
        this.ipc.on(channels.system.list, async (event: IpcMainEvent) => {
            const systems = await this.service.List();
            event.sender.send(channels.system.list, systems);
        });
    }

    private registerGetEvent() {
        this.ipc.on(channels.system.get, async (event: IpcMainEvent, args: any) => {
            const system = await this.service.Get(args.id);
            event.sender.send(channels.system.get, system);
        });
    }
}