import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-constructor.module.css'
import PropTypes from 'prop-types'
import React from 'react'

function BurgerConstructor(props) {    
    let selectedBun = props.cart.find((elem) => elem.product.type === 'bun');
    
    const [price, setPrice] = React.useState(0);

    React.useEffect(() => {
        countPrice();
    }, [props.cart])

    const countPrice = () => {        
        const selectedProducts = separateCart();
        let currentPrice = 0;

        for (let i = 0; i < selectedProducts.length; i++) {            
            currentPrice += selectedProducts[i].product.price;
        }

        setPrice(currentPrice);
    }

    function separateCart() {
        const separatedCart = [];

        props.cart.forEach((elem) => {
            for (let i = 0; i < elem.quantity; i++) {
                separatedCart.push(elem);
            }
        })

        return separatedCart;
    }

    return (
        <section style={{ display: 'flex', flexDirection: 'column'}}>
            <div className={`${style.list} custom-scroll`}>
                <div>
                    {                            
                        selectedBun && AddBun('top', selectedBun, props.data) 
                    }                    
                </div>
                <div>
                    {       
                        separateCart().map(ingredient => {                             
                        if(ingredient.product.type !== 'bun') {                                
                            const ingredientAllData = props.data.find((elem) => elem._id === ingredient.product.id);                                 
                                return AddIngredient(ingredientAllData);                                    
                        }})
                    }
                </div>
                <div>
                    {                       
                        selectedBun && AddBun('bottom', selectedBun, props.data) 
                    }                    
                </div>
                
            </div>
            <div className={style.order}>
                <div className={style.priceBox}>
                    <p className="text text_type_digits-medium">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="medium">Оформить заказ</Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {

}

function AddBun(type, ingredient, data) {
    const ingredientAllData = data.find((elem) => elem._id === ingredient.product.id);

    if(type === 'top') {
        return <ConstructorElement type='top' text={ingredientAllData.name} price={ingredientAllData.price} thumbnail={ingredientAllData.image} isLocked={true}/>
    } else if (type === 'bottom') {
        return <ConstructorElement type='bottom' text={ingredientAllData.name} price={ingredientAllData.price} thumbnail={ingredientAllData.image} isLocked={true}/>
    }
}

function AddIngredient(data) {
    return <ul style={{display: 'flex', alignItems: 'center', margin: '0 0 0 -14px', gap: '14px', minWidth: '568px'}}>        
            <DragIcon type="primary"/>
            <ConstructorElement text={data.name} price={data.price} thumbnail={data.image}/>
        </ul>
}

export default BurgerConstructor;