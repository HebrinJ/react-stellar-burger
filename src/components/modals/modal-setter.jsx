import IngredientDetails from '../modals/types/ingredient-details';
import OrderDetails from '../modals/types/order-details';
import LoadingError from '../modals/types/loading-error';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function ModalSetter() {

    const modal = useSelector(state => state.modal);
    const selectedProduct = useSelector(state => state.selected);

    function getModal() {       
        
        switch (modal.type) {
            case 'order':                
                return <OrderDetails orderNum={modal.modalSettings.orderNum}/>
             case 'info':
                return <IngredientDetails details={selectedProduct} label='Детали ингридиента'/>                
             case 'loadingError':
                return <LoadingError errorText={modal.modalSettings.error} label='Ошибка загрузки'/>
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