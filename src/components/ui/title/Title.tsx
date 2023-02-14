import { PropsBase } from '../../../lib/electron/Props.Base';
import './Title.css';

interface Props extends PropsBase {
    title: string;
    subtitle?: string;
}

export const Title = (props: Props) => {
    return (
        <header className="title">
            <h1>{props.title}</h1>
            {props.subtitle && <h3>{props.subtitle}</h3>}
            <hr></hr>
        </header>
    );
};
