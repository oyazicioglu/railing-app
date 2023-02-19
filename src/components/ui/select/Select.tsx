import { ChangeEvent, useEffect, useState } from 'react';
import { PropsBase } from '../../../lib/electron/Props.Base';
import { ISelectOption } from './ISelectOption';
import './Select.css';
import SelectContext from './SelectContext';

interface Props extends PropsBase {
    name: string;
}

export const Select = ({ children, name }: Props) => {
    let items: ISelectOption[] = [];

    const [activeItem, setActiveItem] = useState<ISelectOption>(undefined);
    const onItemAdded = (item: ISelectOption) => {
        items.push(item);
    };

    const onChangeItem = (item: ISelectOption) => {
        console.log(item);
        setActiveItem(item);
    };

    const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const foundItem = items.find((i) => i.value === event.target.value);
        onChangeItem(foundItem);
    };

    useEffect(() => {
        if (items.length > 0 && !activeItem) {
            onChangeItem(items[0]);
        }
    }, []);

    return (
        <SelectContext.Provider
            value={{
                addItem: onItemAdded,
                changeItem: onChangeItem,
                activeItem: activeItem,
            }}
        >
            <select onChange={onChangeHandler} name={name}>
                {children}
            </select>
        </SelectContext.Provider>
    );
};
