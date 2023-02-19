import { useContext } from 'react';
import { PropsBase } from '../../../lib/electron/Props.Base';
import { ISelectOption } from './ISelectOption';
import SelectContext from './SelectContext';
import './SelectItem.css';

interface Props extends PropsBase {
    value: string;
    text?: string;
}

export const SelectItem = ({ value, text, children }: Props) => {
    const item: ISelectOption = { value, text };

    const context = useContext(SelectContext);

    context.addItem(item);
    const activeItem = context.activeItem;

    return (
        <option
            className={`select-item ${activeItem?.value === value ? 'active' : ''}`}
            key={value}
            value={value}
        >
            {text ? text : children}
        </option>
    );
};
