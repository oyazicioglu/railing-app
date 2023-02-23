import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
import { Button, CloseButton, Form, Stack } from 'react-bootstrap'
import { PropsBase } from '../../../../lib/electron/Props.Base'
import FacadeContext, { IFacade } from './FacadeContext'

import "./Facade.css";

interface Props extends PropsBase {
    facade: IFacade;
}

export const Facade = (props: Props) => {
    const [facadeWidth, setFacadeWidth] = useState(100)
    const [facadeHeight, setFacadeHeight] = useState(90)
    const context = useContext(FacadeContext);
    const form = useRef();

    const handleWidthChange = (event: ChangeEvent<HTMLInputElement>) => { setFacadeWidth(Number(event.target.value)) }
    const handleHeightChange = (event: ChangeEvent<HTMLInputElement>) => { setFacadeHeight(Number(event.target.value)) }

    const removeFacade = () => {
        context.remove(props.facade)
    }

    const handleForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(facadeWidth, facadeHeight)
    }

    return (
        <div className="facade">
            <Form ref={form} onSubmit={handleForm}>
                <Stack gap={1}>
                    <Stack direction="horizontal" gap={3}>
                        <h6>{`Cephe ${props.facade.index}`}</h6>
                        <CloseButton onClick={removeFacade} className='ms-auto'></CloseButton>
                    </Stack>
                    <Form.Control size="sm" type="number" value={facadeWidth} id="facade-width" onChange={handleWidthChange} placeholder="Genişlik" />
                    <Form.Control size="sm" type="number" value={facadeHeight} id="facade-height" onChange={handleHeightChange} placeholder="Yükseklik" />
                    <Button variant='outline-secondary' type='submit' size='sm'> Kaydet </Button>
                </Stack>
            </Form>
        </div>
    )
}
