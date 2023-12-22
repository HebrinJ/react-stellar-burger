import IngredientDetailsModal from './types/ingredient-details-modal';
import OrderAccept from './types/order-accept';
import LoadingError from './types/loading-error';
import { useSelector } from '../../utils/hooks';
import OrderDetails from '../order-details/order-details';
import { TIngredient } from '../../utils/types-description';

export default function ModalSetter(): JSX.Element | null {
    
    const modal = useSelector(state => state.modal);
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
                return (<OrderDetails />);
            case 'info':
                return (<IngredientDetailsModal />);
            case 'loadingError':
                return (<LoadingError />);
            default:              
              return (null)
        }
    }
    
    return getModal();        
}