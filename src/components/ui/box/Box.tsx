import { PropsBase } from '../../../lib/electron/Props.Base';
import { Paper } from '../paper/Paper';
import './Box.css';

interface Props extends PropsBase {
    rounded?: boolean;
}

export const Box = (props: Props) => {
    return (
        <Paper rounded={props.rounded}>
            <div className="box">{props.children}</div>
        </Paper>
    );
};
