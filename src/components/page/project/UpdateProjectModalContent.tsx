import { FormEvent, useEffect, useState } from 'react';
import { channels } from '../../../lib/electron/events/Electron.Channels';
import { PropsBase } from '../../../lib/electron/Props.Base';
import { Button } from '../../ui/button/Button';
import { Form } from '../../ui/form/Form';
import { TextInput } from '../../ui/form/input/TextInput';
import { Title } from '../../ui/title/Title';
import { IProject } from './IProject';

interface Props extends PropsBase {
    onClose?: (update: boolean) => void;
    project: IProject;
}

interface FormData {
    name: string;
    active: boolean;
    id: number;
}

export const UpdateProjectModalContent = ({ onClose, project }: Props) => {
    const { send, on } = window.eventBridge;
    const [name, setName] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: FormData = {
            name: name,
            active: true,
            id: project.id,
        };

        send<{ project: FormData }>(channels.project.update, { project: formData });

        on(channels.project.update, (data?: IProject) => {
            if (data.id) {
                onClose(true);
            } else {
                onClose(false);
            }
        });
    };

    useEffect(() => {
        setName(project.name);
    }, []);

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
                    Güncelle
                </Button>
            </Form>
        </div>
    );
};
