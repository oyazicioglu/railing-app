// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export interface IBrideEvents {
    send: <T>(channel: string, args?: T[] | T) => void;
    on: (channel: string, callback: CallableFunction) => void;
}

declare global {
    interface Window {
        eventBridge: IBrideEvents;
    }
}

contextBridge.exposeInMainWorld('eventBridge', {
    send: <T>(channel: string, args?: T[] | T) => {
        ipcRenderer.send(channel, args);
    },
    on: (channel: string, callback: CallableFunction) => {
        ipcRenderer.removeAllListeners(channel);
        ipcRenderer.on(channel, (event: IpcRendererEvent, args: []) => {
            callback(args);
        });
    },
});
