import { Close } from '@carbon/icons-react';
import { MouseEventHandler } from 'react';
import { PropsBase } from '../../../lib/electron/Props.Base';
import { Box } from '../box/Box';
import { Button } from '../button/Button';
import { Container } from '../container/Container';
import './Modal.css';

interface Props extends PropsBase {
    autoClose?: boolean;
    onClose?: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

export const Modal = (props: Props) => {
    const close = (e: React.MouseEvent<HTMLDivElement>) => {
        if (props.autoClose && props.onClose) {
            props.onClose(e);
        }
    };

    return (
        <div className={`modal`}>
            <div className="close-button">
                <Button hasShadow size="small" onClick={props.onClose} isCircle>
                    <Close></Close>
                </Button>
            </div>
            <Container>
                <Box rounded>{props.children}</Box>
            </Container>
            <div onClick={close} className="background"></div>
        </div>
    );
};
