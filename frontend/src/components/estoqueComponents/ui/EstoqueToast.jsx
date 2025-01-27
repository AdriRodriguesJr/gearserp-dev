import React from 'react';
import { Toast } from 'react-bootstrap';

const EstoqueToast = ({ show, message, type, onClose }) => {
    return (
        <Toast 
            show={show} 
            onClose={onClose} 
            className={`position-fixed bottom-0 end-0 m-3 bg-${type}`}
            delay={3000} 
            autohide
        >
            <Toast.Header closeButton>
                <strong className="me-auto">Notificação</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
};

export default EstoqueToast;
