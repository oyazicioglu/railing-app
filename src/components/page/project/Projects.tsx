import { useContext, useEffect, useState } from 'react';
import { channels } from '../../../lib/electron/events/Electron.Channels';
import { PropsBase } from '../../../lib/electron/Props.Base'
import { IProject } from './IProject'
import ProjectContext from './ProjectContext';
import "./Project.css";
import "./Projects.css";
import { Button, Table } from 'react-bootstrap';

interface Props extends PropsBase {
    project?: IProject
}

const Projects = (props: Props) => {
    const { on, send } = window.eventBridge;
    const [projects, setProjects] = useState<IProject[]>([])
    const context = useContext(ProjectContext)
    const [showPopover, setShowPopover] = useState(false);

    const deleteProject = (projectId: number) => {
        send(channels.project.delete, { id: projectId })
    };

    const getProjects = () => {
        send(channels.project.list);
    }

    on(channels.project.list, (data: IProject[]) => {
        setProjects(data)
    })

    on(channels.project.delete, (data: IProject) => {
        if (data) {
            getProjects();
        }
    })

    const openProject = (project: IProject) => {
        context.open(project.id, project.name)
    }

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div className="projects-page">
            {projects.length > 0 &&
                <Table hover size='sm' >
                    <thead >
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Sistem</th>
                            <th>Oluşturma</th>
                            <th>Son Erişim</th>
                            <th>...</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => {
                            return <tr style={{ verticalAlign: 'middle' }} key={index + 1}>
                                <td width={64}>{index + 1}</td>
                                <td>
                                    <Button onClick={() => { openProject(project) }} variant="link">{project.name}</Button>
                                </td>
                                <td width={160}>{project.system.name}</td>
                                <td width={120}>{project.createdAt.toLocaleString('tr', { dateStyle: 'short' })}</td>
                                <td width={120}>{project.updatedAt ? project.updatedAt.toLocaleString('tr', { dateStyle: 'short' }) : project.createdAt.toLocaleString('tr', { dateStyle: 'short' })}</td>
                                <td width={60}>
                                    <Button onClick={() => { deleteProject(project.id) }} size='sm' variant='danger'>Sil</Button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            }
        </div>
    )
}


export default Projects