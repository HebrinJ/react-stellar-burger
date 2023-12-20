import IngredientDetailsModal from './types/ingredient-details-modal';
import OrderAccept from './types/order-accept';
import LoadingError from './types/loading-error';
import { useSelector } from '../../utils/hooks';
import OrderDetails from '../order-details/orderDetails';
import { TIngredient } from '../../utils/typesDescription';

export default function ModalSetter() {
    
    const modal = useSelector(state => state.modal);
    //const order = useSelector(state => state.order);
    //const selectedProduct: TIngredient | undefined = JSON.parse(localStorage.getItem('selected')!);
    const selectedProduct: TIngredient | undefined = tryGetSelectedProduct();
    
    function tryGetSelectedProduct(): TIngredient | undefined {
        let product;

        try {
            product = JSON.parse(localStorage.getItem('selected')!);
            return product;
        } catch(err) {
            console.log(err)
            return product;
        }
    }

    function getModal() {  
        
        if(selectedProduct && modal.visible) {
            return (<IngredientDetailsModal />);
        }
        
        switch (modal.type) {
            case 'order':                
                return (<OrderAccept />);
            case 'order-info':
                //return (<OrderDetails details={modal.modalSettings} />);
                return (<OrderDetails />);
            case 'info':
                return (<IngredientDetailsModal />);
            case 'loadingError':
                //return (<LoadingError errorText={modal.modalSettings?.message} label='Ошибка загрузки'/>);
                return (<LoadingError />);
            default:              
              return (null)
        }
    }
    
    return getModal();        
}