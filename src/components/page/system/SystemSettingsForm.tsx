import { useEffect, useState } from 'react';
import { channels } from '../../../lib/electron/events/Electron.Channels';
import { ISystem } from './ISystem'

interface Props {
    system?: ISystem
}

export const SystemSettingsForm = (props: Props) => {
    const { on, send } = window.eventBridge;
    const [systemNames, setSystemNames] = useState([]);

    const getSystemNames = () => {
        send(channels.system.list);
    }

    on(channels.system.list, (data: ISystem[]) => {
        const convertedSystemOptions = data.map((system, index) => {
            return { value: system.id, label: system.name }
        })

        setSystemNames(convertedSystemOptions)
    })

    useEffect(() => {
        getSystemNames()
    }, [props.system])

    return (
        <></>
    )
}
