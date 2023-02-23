import { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { channels } from '../../../lib/electron/events/Electron.Channels';
import { PropsBase } from '../../../lib/electron/Props.Base'
import { SystemSettingsForm } from '../system/SystemSettingsForm';
import { BaseScene } from '../three/BaseScene';
import { Facades } from './facade/Facades';
import { IProject } from './IProject';
import { ProjectSettingsForm } from './ProjectSettingsForm';

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
                system: {
                    name: ''
                }
            })
        }
    }, [])

    return (
        <div className="project-layout">
            <div className="sidebar">
                <Stack direction='vertical'>
                    <ProjectSettingsForm project={project}></ProjectSettingsForm>
                    <SystemSettingsForm system={project?.system}></SystemSettingsForm>
                    <Facades>
                    </Facades>
                </Stack>
            </div>
            <div className="content">
                <div className="canvas-container">
                    <BaseScene></BaseScene>
                </div>
            </div>
        </div>
    )
}


export default Project