import { createContext } from 'react';
import { ISelectOption } from './ISelectOption';

const SelectContext = createContext({
    addItem(item: ISelectOption) {},
    changeItem(item: ISelectOption) {},
    activeItem: undefined as ISelectOption,
});

export default SelectContext;
