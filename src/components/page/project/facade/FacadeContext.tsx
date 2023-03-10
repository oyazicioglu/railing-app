import { createContext } from "react";

export type IFacade = {
    index: number;
    id: string;
    width?: number;
    height?: number
}

const FacadeContext = createContext({
    create: (facade: IFacade) => { },
    remove: (facade: IFacade) => { },
    update: (facade: IFacade) => { }
})

export default FacadeContext;