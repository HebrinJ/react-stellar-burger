import ReactDOM from 'react-dom';
import style from './modal-window.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import ModalOverlay from './modal-overlay';

function ModalWindow(props) {     

    return ReactDOM.createPortal((        
        <>
        <ModalOverlay handleCloseModal={props.handleCloseModal}/>
            <div className={style.container}>
                <div className={style.header}>
                    <div className={style.closeButton}>
                        <CloseIcon type='primary' onClick={props.handleCloseModal}/>
                    </div>
                </div> 
                { props.markup }
            </div>                    
        </>        
    ), document.body);    
}

ModalWindow.propTypes = {    
    selectedProduct: ingredientPropType,
    errorText: PropTypes.string,
    handleCloseModal: PropTypes.func.isRequired
}

export default ModalWindow;