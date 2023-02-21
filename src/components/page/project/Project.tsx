import { useEffect } from 'react';
import { channels } from '../../../lib/electron/events/Electron.Channels';
import { PropsBase } from '../../../lib/electron/Props.Base'
import { IProject } from './IProject';

interface Props extends PropsBase {
    projectId?: number
}

const Project = (props: Props) => {
    const { on, send } = window.eventBridge;

    const getProject = () => {
        send(channels.project.get, { id: props.projectId });
    }

    on(channels.project.get, (data: IProject) => {
        console.log(data)
    })

    useEffect(() => {
        console.log(props)
        if (props.projectId) {
            getProject();
        }
    }, [])

    return (
        <div>
            {JSON.stringify(props)}
        </div>
    )
}


export default Project