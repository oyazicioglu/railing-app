import HolderOutlined from '@ant-design/icons/lib/icons/HolderOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Collapse } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useEffect, useState } from 'react';
import { channels } from '../../../lib/electron/events/Electron.Channels';
import { PropsBase } from '../../../lib/electron/Props.Base'
import { SystemSettingsForm } from '../system/SystemSettingsForm';
import { BaseScene } from '../three/BaseScene';
import { IProject } from './IProject';
import { contentLayoutProperties, contentProperties, mainLayoutProperties, siderProperties } from './Project.CSS.Properties';
import { ProjectSettingsForm } from './ProjectSettingsForm';

interface Props extends PropsBase {
    projectId?: number
}
const { Panel } = Collapse;

const Project = (props: Props) => {
    const { on, send } = window.eventBridge;
    const [project, setProject] = useState<IProject>(undefined)

    const getProject = () => {
        send(channels.project.get, { id: props.projectId });
    }

    on(channels.project.get, (data: IProject) => {
        setProject(data);
        console.log(data)
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
                <Collapse size='small' bordered={false} defaultActiveKey={['1']} expandIcon={() => { return (<HolderOutlined />) }}>
                    <Panel header="Proje" key="1">
                        <ProjectSettingsForm project={project}></ProjectSettingsForm>
                    </Panel>
                    <Panel header="Sistem" key="2">
                        <SystemSettingsForm system={project?.system}></SystemSettingsForm>
                    </Panel>
                    <Panel header="Cepheler" key="3">
                    </Panel>
                </Collapse>
            </div>
            <div className="content">
                <BaseScene></BaseScene>
            </div>
        </div>
    )
}


export default Project