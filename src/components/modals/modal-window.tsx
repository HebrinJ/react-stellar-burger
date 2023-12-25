import ReactDOM from 'react-dom';
import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';
import { useDispatch } from '../../utils/hooks';
import { MODAL_CLOSE } from '../../services/actions/modal-actions';
import { UNSELECT } from '../../services/actions/select-actions';
import { REMOVE_ROOT } from '../../services/actions/route-actions';
import style from './modal-window.module.css';

type TModalProps = {
    children?: React.ReactNode;
}

export default function ModalWindow({ children }:TModalProps ): JSX.Element {     

    const dispatch = useDispatch();
    
    React.useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if(e.key === 'Escape') {
                handleCloseModal();
            }
        }

        document.addEventListener('keydown', handleKey);
        
        return () => {
            document.removeEventListener('keydown', handleKey);
        }        
    }, [])

    function handleCloseModal(): void {

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
                {children}
            </div>                    
        </>        
    ), modalContainer!);    
}