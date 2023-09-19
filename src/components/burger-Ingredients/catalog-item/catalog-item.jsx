import PropTypes, { func } from 'prop-types';
import React from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './catalog-item.module.css';

import { DataContext } from '../../app/data-context.js';
import { OrderContext } from '../../app/order-context.js';

function CatalogItem({image, name, price, _id, handleOpenModal, handleAddToCart, type}) {
    const [count, setCount] = React.useState(0);

    const data = React.useContext(DataContext);
    const cart = React.useContext(OrderContext);

    React.useEffect(() => {        
        updateCount();
    }, [cart]);    

    const updateCount = () => {  
        if (type === 'bun') {
            setCount(0);
        }

        const product = cart.find((elem) => elem.product.id === _id)

        if(product) {
            setCount(product.quantity);
        } else {
            setCount(0);
        }        
    }  

    function handleClickOrder(event) {
        const id = event.currentTarget.getAttribute('name');
        const selectedProduct = data.find(item => item._id === id);

        if(selectedProduct) {
            handleOpenModal('info', selectedProduct);
        } else {
            console.log(`Продукт с id ${id} не найден среди полученных данных`);
        }
    }

    function handleAdd(event) {        
        handleAddToCart(event);
    }
    
    return (
        <div className={style.container} onClick={handleAdd} name={_id}>
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
    _id: PropTypes.string,
    handleClickOrder: PropTypes.func,
    type: PropTypes.oneOf(['bun', 'sauce', 'main']),
}

export default CatalogItem;