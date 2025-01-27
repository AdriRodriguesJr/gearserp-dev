import React from 'react';
import { Toast } from 'react-bootstrap';

export const UsuariosToast = ({ show, message, type, onClose }) => (
  <Toast
    show={show}
    onClose={onClose}
    delay={4000}
    autohide
    className={`align-items-center text-white bg-${type} position-fixed bottom-0 end-0 m-3`}
  >
    <Toast.Body>{message}</Toast.Body>
  </Toast>
);