import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Form, Stack, Button } from 'react-bootstrap';
import { channels } from '../../../lib/electron/events/Electron.Channels';
import { ISystem } from './ISystem'

interface Props {
    system?: ISystem
}

export const SystemSettingsForm = (props: Props) => {
    const { on, send } = window.eventBridge;
    const [systemNames, setSystemNames] = useState<{ value: string, label: string }[]>([]);
    const [systemName, setSystemName] = useState(props.system?.name);
    const [system, setSystem] = useState(props.system);
    const form = useRef();

    const getSystemNames = () => {
        send(channels.system.list);
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => { setSystemName(event.target.value) }

    on(channels.system.list, (data: ISystem[]) => {
        const convertedSystemOptions = data.map((system) => {
            return { value: system.id.toString(), label: system.name }
        })

        setSystemNames(convertedSystemOptions)
    })

    const handleForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(systemName)
    }

    useEffect(() => {
        getSystemNames()
        setSystem(props.system)
    }, [props.system])

    return (
        <section className='mini-section'>
            {system &&
                <Form ref={form} onSubmit={handleForm} >
                    <Stack gap={1}>
                        <h5>Sistem Ayarları</h5>
                        <Form.Select size='sm' defaultValue={system.id}>
                            <option>Bir Sistem Seçin</option>
                            {systemNames.map((systemInfo) => {
                                return <option key={systemInfo.value} value={systemInfo.value}>{systemInfo.label}</option>
                            })}
                        </Form.Select>
                        <Button variant='outline-secondary' type='submit' size='sm'> Kaydet </Button>
                    </Stack>
                </Form>
            }
        </section>
    )
}
