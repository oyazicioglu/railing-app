import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Form, Stack, Button } from 'react-bootstrap';
import { channels } from '../../../lib/electron/events/Electron.Channels';
import { SystemType } from './SystemType'

interface Props {
    system?: SystemType
}

export const SystemSettingsForm = (props: Props) => {
    const { on, send } = window.eventBridge;
    const [systemNames, setSystemNames] = useState<{ value: string, label: string }[]>([]);
    const [systemType, setSystemType] = useState(props.system?.id);
    const [system, setSystem] = useState(props.system);
    const form = useRef();

    const getSystemNames = () => {
        send(channels.system.list);
    }
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSystemType(Number(event.target.value))
        console.log(event.target.value);
    }

    on(channels.system.list, (data: SystemType[]) => {
        const convertedSystemOptions = data.map((system) => {
            return { value: system.type.toString(), label: system.name }
        })

        setSystemNames(convertedSystemOptions)
    })

    const handleForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(system)
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
                        <Form.Select size='sm' onChange={handleChange} defaultValue={system.type}>
                            <option>Bir Sistem Seçin</option>
                            {systemNames.map((systemInfo) => {
                                return <option key={systemInfo.value} value={systemInfo.value}>{systemInfo.label}</option>
                            })}
                        </Form.Select>
                    </Stack>
                </Form>
            }
        </section>
    )
}
