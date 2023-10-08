import ReactDOM from 'react-dom';
import React from 'react';
import style from './modal-window.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ModalOverlay from './modal-overlay';

function ModalWindow(props) {     

    React.useEffect(() => {
        document.addEventListener('keydown', handleKey);
        
        return () => {
            document.removeEventListener('keydown', handleKey);
        }        
    }, [])

    const handleKey = (e) => {
        if(e.key === 'Escape') {
            props.handleCloseModal();
        }
    }

    return ReactDOM.createPortal((        
        <>
        <ModalOverlay handleCloseModal={props.handleCloseModal}/>
            <div className={style.container}>
                <div className={style.header}>
                    <div className={style.closeButton}>
                        <CloseIcon type='primary' onClick={props.handleCloseModal}/>
                    </div>
                </div>
                {props.children}
            </div>                    
        </>        
    ), document.body);    
}

ModalWindow.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
}

export default ModalWindow;