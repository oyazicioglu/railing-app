import { PropsBase } from '../../../lib/electron/Props.Base';
import './Section.css';

interface Props extends PropsBase {}

export const Section = (props: Props) => {
    return <section className="qsection">{props.children}</section>;
};
