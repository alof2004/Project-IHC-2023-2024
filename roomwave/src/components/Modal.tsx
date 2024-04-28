import React from 'react';

import '../css/modal.css';

const Modal = () => {
    return (
    <div className="modal-container">
    <div className="loading modal-background">
        <div className="loading-content">
            <div className="loading-circle"></div>
            <span className="loading-name">LOADING</span>
        </div>
    </div>
    </div>

    );
}

export default Modal;