import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { PropsBase } from "../../../../lib/electron/Props.Base";
import { createUId } from "../../../../lib/utils/uid-creator";
import { Facade } from "./Facade";
import FacadeContext, { IFacade } from "./FacadeContext";
import "./Facades.css";

interface Props extends PropsBase {

}

export const Facades = (props: Props) => {
    const [facades, setFacades] = useState<IFacade[]>([])

    const createFacade = (facade: IFacade) => {
        setFacades([...facades, facade])
    }

    const createNewFacade = () => {
        const newFacade: IFacade = {
            id: createUId(),
            index: facades.length + 1
        }

        createFacade(newFacade);
    }

    const removeFacade = (facade: IFacade) => {
        const restFacades = facades.filter(f => f.id !== facade.id);
        setFacades(restFacades)
    }

    const updateFacade = (facade: IFacade) => {
        const foundFacadeIndex = facades.indexOf(facade)

        if (foundFacadeIndex === -1) return

        facades[foundFacadeIndex] = facade;
        setFacades([...facades])
    }

    return (
        <section className="facades mini-section">
            <FacadeContext.Provider value={{
                create: createFacade,
                remove: removeFacade,
                update: updateFacade
            }} >
                <Stack direction="vertical" gap={2}>
                    <h5>Cepheler</h5>
                    <Stack gap={2} direction="vertical">
                        {facades.map((facade, index) => {
                            return <Facade facade={facade} key={index}></Facade>
                        })}
                    </Stack>

                    <Button onClick={createNewFacade} variant='outline-secondary' size='sm'> Yeni Cephe </Button>
                </Stack>
            </FacadeContext.Provider>
        </section>
    )
}
