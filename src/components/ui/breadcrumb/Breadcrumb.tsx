import { PropsBase } from '../../../lib/electron/Props.Base';
import './Breadcrumb.css';

interface Props extends PropsBase {}

export const Breadcrumb = (props: Props) => {
    return <div className="breadcrumb">{props.children}</div>;
};
