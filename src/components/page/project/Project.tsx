import { useEffect, useState } from 'react';
import { channels } from '../../../lib/electron/events/Electron.Channels';
import { PropsBase } from '../../../lib/electron/Props.Base'
import { BaseScene } from '../three/BaseScene';
import { IProject } from './IProject';

interface Props extends PropsBase {
    projectId?: number
}

const Project = (props: Props) => {
    const { on, send } = window.eventBridge;
    const [project, setProject] = useState<IProject>(undefined)

    const getProject = () => {
        send(channels.project.get, { id: props.projectId });
    }

    on(channels.project.get, (data: IProject) => {
        setProject(data);
    })

    useEffect(() => {
        if (props.projectId) {
            getProject();
        } else {
            setProject({
                name: 'Yeni Proje',
            })
        }
    }, [])

    return (
        <div className="project-layout">
            <div className="sidebar">
                <p>Project</p>
            </div>
            <div className="content">
                <BaseScene></BaseScene>
            </div>
        </div>
    )
}


export default Project