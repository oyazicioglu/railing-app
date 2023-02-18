import { MouseEventHandler } from 'react';
import { NavLink } from 'react-router-dom';
import { PropsBase } from '../../../lib/electron/Props.Base';
import './Button.css';

interface Props extends PropsBase {
    kind?: 'primary' | 'secondary' | 'danger';
    size?: 'normal' | 'small' | 'large';
    hasShadow?: boolean;
    isCircle?: boolean;
    href?: string;
    fullWidth?: boolean;
    isTransparent?: boolean;
    isSubmit?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = (props: Props) => {
    const size = props.size || 'normal';

    return (
        <div className="button-container">
            <button
                type={props.isSubmit ? 'submit' : 'button'}
                onClick={props.onClick}
                className={`qbutton ${props.kind ? props.kind : ''} 
                size-${size}
                ${props.fullWidth ? 'full-width' : ''}
                ${props.isTransparent ? 'transparent' : ''}
                ${props.hasShadow ? 'has-shadow' : ''} 
                ${props.href ? 'as-link' : ''} 
                ${props.isCircle ? 'is-circle' : ''}`}
            >
                {props.href ? <NavLink to={props.href}>{props.children}</NavLink> : props.children}
                <div className="hover"></div>
            </button>
        </div>
    );
};
