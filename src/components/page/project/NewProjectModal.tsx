import { FormEvent, useEffect, useState } from 'react';
import { channels } from '../../../lib/electron/events/Electron.Channels';
import { PropsBase } from '../../../lib/electron/Props.Base';
import { Button } from '../../ui/button/Button';
import { Form } from '../../ui/form/Form';
import { TextInput } from '../../ui/form/input/TextInput';
import { Title } from '../../ui/title/Title';
import { IProject } from './IProject';

interface Props extends PropsBase {
    onClose?: () => void;
}

interface FormData {
    name: string;
    active: boolean;
}

export const NewProjectModal = (props: Props) => {
    const { send, on } = window.eventBridge;
    const [name, setName] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: FormData = {
            name: name,
            active: true,
        };

        send<FormData>(channels.project.add, formData);

        on(channels.project.add, (data?: IProject) => {
            if (data.id) {
                props.onClose();
            }
        });
    };

    return (
        <div className="project-modal">
            <Title title="Yeni Proje"></Title>
            <Form onSubmit={handleSubmit}>
                <TextInput
                    onValueChange={(e) => {
                        setName(e.target.value);
                    }}
                    value={name}
                    width="400px"
                    placeholder="Proje Adı"
                ></TextInput>
                <Button isSubmit fullWidth kind="primary">
                    Ekle
                </Button>
            </Form>
        </div>
    );
};
