import { PropsBase } from '../../../lib/electron/Props.Base';
import './Avatar.css';

interface Props extends PropsBase {
    letters: string;
}

export const Avatar = (props: Props) => {
    return (
        <div className="avatar">
            <span>{props.letters}</span>
        </div>
    );
};
