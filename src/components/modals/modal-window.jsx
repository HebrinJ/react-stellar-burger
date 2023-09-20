import ReactDOM from 'react-dom';
import React from 'react';
import style from './modal-window.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ModalOverlay from './modal-overlay';
import IngredientDetails from '../modals/types/ingredient-details';
import OrderDetails from '../modals/types/order-details';
import LoadingError from '../modals/types/loading-error';

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

    function getModal() {        
        
        switch (props.modal.type) {
            case 'order':                
                return <OrderDetails orderNum={props.modal.modalData.orderNum}/>
             case 'info':
                return <IngredientDetails details={props.modal.modalData.selectedProduct} label='Детали ингридиента'/>                
             case 'loadingError':
                 return <LoadingError errorText={props.modal.modalData.error} label='Ошибка загрузки'/>
            default:
              console.log('Модальное окно не найдено');
              break;        
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
                { getModal() }
            </div>                    
        </>        
    ), document.body);    
}

ModalWindow.propTypes = {    
    modal: PropTypes.shape({visible: PropTypes.bool, type: PropTypes.string, modalData: PropTypes.object}),
    handleCloseModal: PropTypes.func.isRequired,
}

export default ModalWindow;