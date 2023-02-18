import { PropsBase } from '../../../lib/electron/Props.Base';
import './Stack.css';

interface Props extends PropsBase {
    gap?: number;
    orientation?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
}

export const Stack = ({ gap, children, orientation }: Props) => {
    if (!gap) gap = 0;
    if (!orientation) orientation = 'row';

    return (
        <div className="stack" style={{ gap: gap, flexDirection: orientation }}>
            {children}
        </div>
    );
};
