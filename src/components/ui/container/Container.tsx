import { PropsBase } from '../../../lib/electron/Props.Base';
import './Container.css';

interface Props extends PropsBase {
    fluid?: boolean;
}

export const Container = (props: Props) => {
    return <div className={`container ${props.fluid && 'fluid'}`}>{props.children}</div>;
};
