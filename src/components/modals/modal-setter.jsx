import IngredientDetails from '../modals/types/ingredient-details';
import OrderDetails from '../modals/types/order-details';
import LoadingError from '../modals/types/loading-error';
import PropTypes from 'prop-types';

export default function ModalSetter({modal: modalState}) {

    function getModal() {       
        
        switch (modalState.type) {
            case 'order':                
                return <OrderDetails orderNum={modalState.modalSettings.orderNum}/>
             case 'info':
                return <IngredientDetails details={modalState.modalSettings.selectedProduct} label='Детали ингридиента'/>                
             case 'loadingError':
                return <LoadingError errorText={modalState.modalSettings.error} label='Ошибка загрузки'/>
            default:
              console.log('Модальное окно не найдено');
              break;        
        }
    }

    return getModal();        
}

ModalSetter.propTypes = {    
    modal: PropTypes.shape({visible: PropTypes.bool, type: PropTypes.string, modalSettings: PropTypes.object}),
}