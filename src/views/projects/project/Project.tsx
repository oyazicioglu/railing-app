import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IProject } from '../../../components/page/project/IProject';
import { channels } from '../../../lib/electron/events/Electron.Channels';
import { PropsBase } from '../../../lib/electron/Props.Base';
import './Project.css';

interface Props extends PropsBase {}

export const Project = () => {
    const { send, on } = window.eventBridge;

    const { id } = useParams();

    const getProject = (id: number) => {
        send(channels.project.get, { id });
    };

    on(channels.project.get, (data: IProject) => {
        console.log(data);
    });

    useEffect(() => {
        getProject(Number(id));
    }, []);
    return <div className="project"></div>;
};
