import { channels } from '../../../lib/electron/events/Electron.Channels';
import { PropsBase } from '../../../lib/electron/Props.Base';
import { Button } from '../../ui/button/Button';
import { Stack } from '../../ui/stack/Stack';
import { Title } from '../../ui/title/Title';
import { IProject } from './IProject';

interface Props extends PropsBase {
    onClose?: (update: boolean) => void;
    projectId: number;
}

export const DeleteProjectModelContent = (props: Props) => {
    const { send, on } = window.eventBridge;

    const deleteProject = () => {
        send(channels.project.delete, { id: props.projectId });
    };

    on(channels.project.delete, (data: IProject) => {
        props.onClose(true);
    });

    return (
        <div className="project-delete-modal">
            <Stack orientation="column" gap={0}>
                <Title title="Sil"></Title>
                <Stack orientation="row">
                    <Button
                        kind="danger"
                        onClick={() => {
                            deleteProject();
                        }}
                    >
                        Sil
                    </Button>
                    <Button
                        onClick={() => {
                            props.onClose(false);
                        }}
                    >
                        Vazgeç
                    </Button>
                </Stack>
            </Stack>
        </div>
    );
};
