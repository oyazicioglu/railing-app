import { useEffect, useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import { channels } from '../../../lib/electron/events/Electron.Channels';
import { PropsBase } from '../../../lib/electron/Props.Base'
import { SystemSettingsForm } from '../system/SystemSettingsForm';
import { BaseScene } from '../three/BaseScene';
import { Facades } from './facade/Facades';
import { ProjectType } from './ProjectType';
import { ProjectSettingsForm } from './ProjectSettingsForm';

interface Props extends PropsBase {
    projectId?: number
}

const Project = (props: Props) => {
    const { on, send } = window.eventBridge;
    const [project, setProject] = useState<ProjectType>(undefined)

    const getProject = () => {
        send(channels.project.get, { id: props.projectId });
    }

    on(channels.project.get, (data: ProjectType) => {
        console.log(data);

        setProject(data);
    })

    useEffect(() => {
        if (props.projectId) {
            getProject();
        } else {
            setProject({
                name: 'Yeni Proje',
                system: {
                    name: '',
                    type: 0
                }
            })
        }
    }, [])

    return (
        <div className="project-layout">
            <div className="sidebar">
                <div className="sidebar-container">
                    <Stack className='sidebar-scroll' direction='vertical'>
                        <Stack direction='horizontal' className='save-button-container'>
                            <Button size='sm' style={{ width: '100%' }} variant='outline-primary'>Kaydet</Button>
                        </Stack>
                        <ProjectSettingsForm project={project}></ProjectSettingsForm>
                        <SystemSettingsForm system={project?.system}></SystemSettingsForm>
                        <Facades>
                        </Facades>
                    </Stack>
                </div>
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