import PropTypes, { func } from 'prop-types';
import React from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './catalog-item.module.css';

import { IngredientDataContext } from '../../../contexts/ingredient-data-context.js';
import { OrderContext } from '../../../contexts/order-context.js';

function CatalogItem({image, name, price, currentItemId, handleOpenModal, handleAddToCart}) {
    const [count, setCount] = React.useState(0);

    const data = React.useContext(IngredientDataContext);
    const order = React.useContext(OrderContext);

    React.useEffect(() => {        
        updateCount();
    }, [order.cart]);    

    const updateCount = () => {  
        
        if(order.cart.bun === currentItemId) {
            setCount(1);
            return;
        }

        const products = order.cart.ingredients.filter((elem) => elem === currentItemId)        
        setCount(products.length);      
    }  

    // Будет удалено после реализации всего функционала

    // function handleClickOrder(event) {
    //     const id = event.currentTarget.getAttribute('name');
    //     const selectedProduct = data.find(item => item._id === id);

    //     if(selectedProduct) {
    //         handleOpenModal('info', selectedProduct);
    //     } else {
    //         console.log(`Продукт с id ${id} не найден среди полученных данных`);
    //     }
    // }

    function handleAddToCart(event) {        
        const id = event.currentTarget.getAttribute('name');
        const selectedProduct = data.find(item => item._id === id);
    
        if(selectedProduct.type === 'bun') {
            order.cartDispatch({
                type: 'addBun',
                payload: id,
            })
            return;
        }
        
        order.cartDispatch({
            type: 'add',
            payload: id,
        })
        
    }
    
    return (
        <div className={style.container} onClick={handleAddToCart} name={currentItemId}>
            <Counter count={count}/>
            <img className={style.image} src={image} alt={name}/>
            <div className={style.textBox}>
                <div className={style.price}>
                    <p className='text text_type_digits-default'>{price}</p><CurrencyIcon type='primary' />
                </div>
                <p className='text text_type_main-default'>{name}</p>
            </div>
            
        </div>
    )
}

CatalogItem.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    currentItemId: PropTypes.string,
    handleClickOrder: PropTypes.func,
    type: PropTypes.oneOf(['bun', 'sauce', 'main']),
}

export default CatalogItem;