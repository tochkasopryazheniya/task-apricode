import React, {ReactNode} from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';

type ModalWindowProps = {
    isShown: boolean,
    onHide: () => void,
    children: ReactNode,
    header: string
}

const ModalWindow = ({isShown, onHide, children, header}: ModalWindowProps) => {
    return (
        <Modal show={isShown} onHide={onHide} size='lg' centered>
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            {children}
        </Modal>
    );
};

export default ModalWindow;