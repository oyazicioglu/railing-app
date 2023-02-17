import './Form.css';
import { FormEvent } from 'react';
import { PropsBase } from '../../../lib/electron/Props.Base';

interface Props extends PropsBase {
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

export const Form = ({ children, onSubmit }: Props) => {
    return <form onSubmit={onSubmit}>{children}</form>;
};
