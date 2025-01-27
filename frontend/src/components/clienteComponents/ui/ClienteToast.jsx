import React from 'react';
import { Toast } from 'react-bootstrap';

const ClienteToast = ({ show, message, type, onClose }) => {
    return (
        <Toast
            show={show}
            onClose={onClose}
            delay={4000}
            autohide
            className={`bottom-0 start-0 m-3 text-white bg-${type}`}>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
};

export default ClienteToast;