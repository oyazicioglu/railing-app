import './Projects.css';
import { useEffect, useState } from 'react';
import { IProject } from '../../components/page/project/IProject';
import { ProjectList } from '../../components/page/project/ProjectList';
import { Title } from '../../components/ui/title/Title';
import { channels } from '../../lib/electron/events/Electron.Channels';

export const Projects = () => {
    const { send, on } = window.eventBridge;
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        send(channels.project.list);

        on(channels.project.list, (data: IProject[]) => {
            setProjects(data);
        });
    }, []);

    return (
        <div className="projects">
            <Title title="Projeler"></Title>
            <ProjectList projects={projects}></ProjectList>
        </div>
    );
};
