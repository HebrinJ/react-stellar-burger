import IngredientDetailsModal from './types/ingredient-details-modal';
import OrderDetails from '../modals/types/order-details';
import LoadingError from '../modals/types/loading-error';
import { useSelector } from 'react-redux';

export default function ModalSetter() {

    const modal = useSelector(state => state.modal);
    const order = useSelector(state => state.order);
    const selectedProduct = JSON.parse(localStorage.getItem('selected'));    

    function getModal() {  
        
        if(selectedProduct && modal.visible) {
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