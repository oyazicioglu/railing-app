// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export interface IBrideEvents {
    send: (channel: string, args?: []) => void;
    on: (channel: string, callback: CallableFunction) => void;
}

declare global {
    interface Window {
        eventBridge: IBrideEvents;
    }
}

contextBridge.exposeInMainWorld('eventBridge', {
    send: (channel: string, args?: []) => {
        ipcRenderer.removeAllListeners(channel);
        ipcRenderer.send(channel, args);
    },
    on: (channel: string, callback: CallableFunction) => {
        ipcRenderer.on(channel, (event: IpcRendererEvent, args: []) => {
            ipcRenderer.removeAllListeners(channel);
            callback(args);
        });
    },
});
