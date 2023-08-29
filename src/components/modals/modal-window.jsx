import React from 'react';
import ReactDOM from 'react-dom'
import IngredientDetails from './types/ingredient-details'
import OrderDetails from './types/order-details'

function ModalWindow(props) { 
    
    switch (props.type) {
        case 'order':
            return ReactDOM.createPortal((
                <div style={{backgroundColor: 'green', width: 400, height: 400, position: 'absolute', top: 0}}>
                    <OrderDetails />
                </div>
            ), document.body);

        case 'info':
            return ReactDOM.createPortal((
                <div style={{backgroundColor: 'red', width: 400, height: 400, position: 'absolute', top: 0}}>
                    <IngredientDetails />
                </div>
            ), document.body);
    }

    // return ReactDOM.createPortal((
    //     <div style={{backgroundColor: 'red', width: 400, height: 400, position: 'absolute', top: 0}}>
    //         <button onClick={props.handleCloseModal}>Close</button>
    //     </div>
    // ), document.body);
}

export default ModalWindow;