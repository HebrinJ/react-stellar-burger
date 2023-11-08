import IngredientDetailsModal from './types/ingredient-details-modal';
import OrderDetails from '../modals/types/order-details';
import LoadingError from '../modals/types/loading-error';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function ModalSetter() {

    const modal = useSelector(state => state.modal);
    //const selectedProduct = useSelector(state => state.selected);
    const selectedProduct = JSON.parse(localStorage.getItem('selected'));    
    const order = useSelector(state => state.order);

    function getModal() {  
        
        if(selectedProduct && localStorage.getItem('ingrOpen')) {
            return (<IngredientDetailsModal details={selectedProduct} label='Детали ингридиента'/>);
        }
        
        switch (modal.type) {
            case 'order':                
                return (<OrderDetails orderNum={order.orderData.order.number}/>);
             case 'info':
                return (<IngredientDetailsModal details={selectedProduct} label='Детали ингридиента'/>);
             case 'loadingError':
                return (<LoadingError errorText={modal.modalSettings.error} label='Ошибка загрузки'/>);
            default:
              console.log('Модальное окно не найдено');
              return (<></>)                     
        }
    }

    return getModal();        
}

ModalSetter.propTypes = {    
    modal: PropTypes.shape({visible: PropTypes.bool, type: PropTypes.string, modalSettings: PropTypes.object}),
}