import './TextInput.css';
import { PropsBase } from '../../../../lib/electron/Props.Base';
import { ChangeEvent, ChangeEventHandler } from 'react';

interface Props extends PropsBase {
    placeholder?: string;
    width?: string;
    fullWidth?: boolean;
    value?: string;
    autoFocus?: boolean;
    onValueChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = ({ value, placeholder, width, fullWidth, onValueChange }: Props) => {
    if (!width) width = 'auto';
    if (!value) value = '';

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        onValueChange(event);
    };

    return (
        <input
            autoFocus
            onChange={handleChange}
            value={value}
            className={`text-input ${fullWidth ? 'full-width' : ''}`}
            style={{ width: width }}
            placeholder={placeholder}
            type="text"
        />
    );
};
