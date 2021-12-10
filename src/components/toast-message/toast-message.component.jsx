import React, { useState } from 'react';

import { Toast } from 'react-bootstrap';

import './toast-message.styles.scss';

const ToastMessage = ({message}) => {
    const [oldMessage, setMessage] = useState(message);
    const [show, setShow] = useState(false);

    if (oldMessage !== message) {
        setShow(true);
        setMessage(message);
    }
    
    return (
        <Toast className="toast-message" 
            onClose={() => setShow(false)} 
            show={show}
            delay={3000} 
            autohide>
            <Toast.Header>
            <strong className="me-auto">Crypto Fucking Sheet</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
};    

export default ToastMessage;