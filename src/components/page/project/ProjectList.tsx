import { PropsBase } from '../../../lib/electron/Props.Base';
import { IProject } from './IProject';
import { Project } from './Project';

interface Props extends PropsBase {
    projects?: IProject[];
}

export const ProjectList = (props: Props) => {
    const projects = props.projects?.map((project, index) => {
        return <Project key={index} project={project}></Project>;
    });

    return <div>{projects}</div>;
};
