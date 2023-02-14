import { PropsBase } from '../../../lib/electron/Props.Base';
import { IProject } from './IProject';

interface Props extends PropsBase {
    project: IProject;
}

export const Project = (props: Props) => {
    return (
        <ul>
            <li key={1}>{props.project.id}</li>
            <li key={2}>{props.project.name}</li>
            <li key={3}>{props.project.active.toString()}</li>
        </ul>
    );
};
