import './Paper.css';
import { PropsBase } from '../../../lib/electron/Props.Base';

interface Props extends PropsBase {
    rounded?: boolean;
}

export const Paper = (props: Props) => {
    return <div className={`paper ${props.rounded ? 'rounded' : ''}`}>{props.children}</div>;
};
