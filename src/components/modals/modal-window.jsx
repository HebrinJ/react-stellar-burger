import ReactDOM from 'react-dom';
import React from 'react';
import style from './modal-window.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';
import { useDispatch } from 'react-redux';
import { MODAL_CLOSE } from '../../services/actions/modal-actions';

function ModalWindow(props) {     

    const dispatch = useDispatch();

    React.useEffect(() => {
        document.addEventListener('keydown', handleKey);
        
        return () => {
            document.removeEventListener('keydown', handleKey);
        }        
    }, [])

    const handleKey = (e) => {
        if(e.key === 'Escape') {
            handleCloseModal();
        }
    }

    function handleCloseModal() {
        dispatch({
            type: MODAL_CLOSE
        })
    }

    return ReactDOM.createPortal((        
        <>
        <ModalOverlay handleCloseModal={handleCloseModal}/>
            <div className={style.container}>
                <div className={style.header}>
                    <div className={style.closeButton}>
                        <CloseIcon type='primary' onClick={handleCloseModal}/>
                    </div>
                </div>
                {props.children}
            </div>                    
        </>        
    ), document.body);    
}

export default ModalWindow;