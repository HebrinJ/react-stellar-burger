import ReactDOM from 'react-dom';
import IngredientDetails from './types/ingredient-details';
import OrderDetails from './types/order-details';
import style from './modal-window.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

function ModalWindow(props) { 
    let label = '';
    let modalTypeMarkup;    

    switch (props.type) {
        case 'order':
            label = ''
            modalTypeMarkup = <OrderDetails />
            break;
        case 'info':
            label = 'Детали ингридиента'
            modalTypeMarkup = <IngredientDetails details={props.selectedProduct}/>
            break;             
    }

    return ReactDOM.createPortal((
        <div className={style.overlay}>
                    <div className={style.container}>
                        <div className={style.header}>
                            <h1 className={style.label+' text text_type_main-large'}>{label}</h1>
                            <div className={style.closeButton}>
                                <CloseIcon type='primary' onClick={props.handleCloseModal}/>
                            </div>
                        </div>            
                        { modalTypeMarkup }
                    </div>                    
        </div>
    ), document.body);    
}

ModalWindow.propTypes = {
    selectedProduct: PropTypes.arrayOf(ingredientPropType).isRequired,
    handleCloseModal: PropTypes.func.isRequired
}

export default ModalWindow;