import IngredientDetailsModal from './types/ingredient-details-modal';
import OrderAccept from './types/order-accept';
import LoadingError from '../modals/types/loading-error';
import { useSelector } from 'react-redux';
import OrderDetails from '../order-details/orderDetails';

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
                return (<OrderAccept orderNum={order.orderData.order.number}/>);
            case 'order-info':
                return (<OrderDetails orderDetails={modal.modalSettings} />);
            case 'info':
                return (<IngredientDetailsModal details={selectedProduct} label='Детали ингридиента'/>);
            case 'loadingError':
                return (<LoadingError errorText={modal.modalSettings.error} label='Ошибка загрузки'/>);
            default:              
              return (null)
        }
    }
    
    return getModal();        
}