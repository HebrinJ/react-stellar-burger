import ReactDOM from 'react-dom';
import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';
import style from './modal-window.module.css';
import { useNavigate } from 'react-router-dom';

type TModalProps = {
    children?: React.ReactNode;
    origin?: string;
    onClose?: () => void;
}

export default function ModalWindow({ children, origin, onClose }:TModalProps ): JSX.Element {     

    const navigate = useNavigate();
    
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

        if(!!origin) {
            navigate(origin);
        }

        if(!!onClose) {
            onClose();
        }
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