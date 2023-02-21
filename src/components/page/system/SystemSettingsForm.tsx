import { Form, Input, Button, Select } from 'antd'
import { useEffect, useState } from 'react';
import { channels } from '../../../lib/electron/events/Electron.Channels';
import { ISystem } from './ISystem'

interface Props {
    system?: ISystem
}

export const SystemSettingsForm = (props: Props) => {
    const { on, send } = window.eventBridge;
    const [systemOptionNames, setSystemOptionNames] = useState([]);

    const handleSystemChange = (value: Object, option: Object) => {
        console.log(value, option)
    }

    const handleOnFormFinish = (values: any[]) => {
        console.log(values)
    }

    const getSystemNames = () => {
        send(channels.system.list);
    }

    on(channels.system.list, (data: ISystem[]) => {
        const convertedSystemOptions = data.map((system, index) => {
            return { value: system.id, label: system.name }
        })

        setSystemOptionNames(convertedSystemOptions)
    })

    useEffect(() => {
        getSystemNames()
    }, [])

    return (
        <Form
            onFinish={handleOnFormFinish}
            size='small'
            name="system-form"
            className="system-form"
            initialValues={{ systemType: systemOptionNames.map((option, index) => index === 0 && option.label) }}
        >
            <Form.Item
                name="systemType"
            >
                <Select
                    id='systemType'
                    onChange={handleSystemChange}

                    options={systemOptionNames}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" block htmlType="submit" className="system-form-button">
                    Kaydet
                </Button>
            </Form.Item>
        </Form>
    )
}
