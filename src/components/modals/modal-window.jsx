import ReactDOM from 'react-dom';
import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { MODAL_CLOSE } from '../../services/actions/modal-actions';
import { useNavigate } from 'react-router-dom';
import { UNSELECT } from '../../services/actions/select-actions';
import { REMOVE_ROOT } from '../../services/actions/route-actions';
import style from './modal-window.module.css';

export default function ModalWindow(props) {     

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modalType = useSelector(state => state.modal.type);
    
    React.useEffect(() => {
        const handleKey = (e) => {
            if(e.key === 'Escape') {
                handleCloseModal();
            }
        }

        document.addEventListener('keydown', handleKey);
        
        return () => {
            document.removeEventListener('keydown', handleKey);
        }        
    }, [])

    function handleCloseModal() {
        if(modalType === 'info' || modalType === 'order-info') {
            navigate(-1);
        }      

        dispatch({
            type: MODAL_CLOSE
        })
        dispatch({
            type: UNSELECT
        })
        dispatch({
            type: REMOVE_ROOT
        })
    }

    const modalContainer = document.querySelector('#modals');

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
    ), modalContainer);    
}