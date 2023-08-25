import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-constructor.module.css'
import PropTypes from 'prop-types'
import React from 'react'

function BurgerConstructor(props) {    
    //let bun = props.data.find((item) => item.type === 'bun');
    let bun = props.data.find((elem) => elem.type === 'bun');
    const [price, setPrice] = React.useState(0);

    React.useEffect(() => {
        countPrice();
    }, [props.cart])

    const countPrice = () => {
        const allProducts = props.data;
        const selectedProducts = props.itemsCount;

        let currentPrice = 0;

        for (let id in selectedProducts) {
            
            for (let i = 0; i < allProducts.length; i++) { 
                if(id === allProducts[i]._id) {                    
                    currentPrice += allProducts[i].price;
                }
            }
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
                        bun && AddBun('top', bun)                        
                    }                    
                </div>
                <div>
                    {       
                        separateCart().map(ingredient => {                             
                        if(ingredient.product.type !== 'bun') {                                
                            const ingredientAllData = props.data.find((elem) => elem._id === ingredient.product.id);                                 
                                return AddIngredient(ingredientAllData);                                    
                        }})                

                        // props.cart.map(ingredient => {                             
                        //     if(ingredient.product.type !== 'bun') {                                
                        //         const ingredientAllData = props.data.find((elem) => elem._id === ingredient.product.id);                                 
                        //             return AddIngredient(ingredientAllData);                                    
                        //     }})
                    }
                </div>
                <div>
                    {                       
                        bun && AddBun('bottom', bun) 
                    }                    
                </div>
                
            </div>
            <div className={style.order}>
                <div style={{ display: 'flex', margin: '40px', alignItems: 'center', gap: '10px'}}>
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

function AddBun(type, component) {
    if(type === 'top') {
        return <ConstructorElement type='top' text={component.name} price={component.price} thumbnail={component.image} isLocked={true}/>
    } else if (type === 'bottom') {
        return <ConstructorElement type='bottom' text={component.name} price={component.price} thumbnail={component.image} isLocked={true}/>
    }
}

function AddIngredient(data) {
    return <ul style={{display: 'flex', alignItems: 'center', margin: '0 0 0 -14px', gap: '14px', minWidth: '568px'}}>        
            <DragIcon type="primary"/>
            <ConstructorElement text={data.name} price={data.price} thumbnail={data.image}/>
        </ul>
}

export default BurgerConstructor;