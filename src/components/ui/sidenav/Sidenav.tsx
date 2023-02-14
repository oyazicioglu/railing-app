import { PropsBase } from '../../../lib/electron/Props.Base';
import './Sidenav.css';

interface Props extends PropsBase {}

export const Sidenav = (props: Props) => {
    return <div className="sidenav">{props.children}</div>;
};
