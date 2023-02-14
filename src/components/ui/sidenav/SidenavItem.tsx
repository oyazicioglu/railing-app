import { useState } from 'react';
import { PropsBase } from '../../../lib/electron/Props.Base';
import './SidenavItem.css';
interface Props extends PropsBase {
    active?: boolean;
}

export const SidenavItem = (props: Props) => {
    const [active] = useState<boolean>(props.active);

    return <div className={`sidenav-item ${active ? 'active' : ''}`}>{props.children}</div>;
};
