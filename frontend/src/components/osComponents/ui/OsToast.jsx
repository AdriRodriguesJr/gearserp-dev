import React from 'react';
import { Toast } from 'react-bootstrap';

const OSToast = ({ toast, onClose }) => {
  return (
    <Toast
      show={toast.show}
      onClose={onClose}
      delay={4000}
      autohide
      className={`align-items-center text-white bg-${toast.type} alertas`}
    >
      <Toast.Body>{toast.message}</Toast.Body>
    </Toast>
  );
};

export default OSToast;