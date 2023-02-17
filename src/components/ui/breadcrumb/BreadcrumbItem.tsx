import { NavLink } from 'react-router-dom';
import { PropsBase } from '../../../lib/electron/Props.Base';

export interface Props extends PropsBase {
    href: string;
    active?: boolean;
}

export const BreadcrumbItem = (props: Props) => {
    return (
        <NavLink to={props.href} className={`breadcrumb-item ${props.active ? 'active' : ''}`}>
            {props.children}
        </NavLink>
    );
};
