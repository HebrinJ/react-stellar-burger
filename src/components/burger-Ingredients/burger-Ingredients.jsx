import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import style from './burger-ingredients.module.css'
import { data } from '../../utils/data.js'

function BurgerIngredients(props) {
    return (
        <section>
            <nav style={{ display: 'flex' }}>
                <Tab>Булки</Tab>
                <Tab>Соусы</Tab>
                <Tab>Начинки</Tab>
            </nav>            
            <div className={`${style.mainBox} custom-scroll`}>
                <ItemsBlock label='Булки' type='bun' data={props.data} clickHandler={props.clickHandler} cart={props.cart}/>
                <ItemsBlock label='Соусы' type='sauce' data={props.data} clickHandler={props.clickHandler} cart={props.cart}/>
                <ItemsBlock label='Основное' type='main' data={props.data} clickHandler={props.clickHandler} cart={props.cart}/>
            </div>
        </section>
    )
}

function CatalogItem({image, name, price, _id, clickHandler, cart, type}) {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {        
        updateCount();
    }, [cart]);    

    const updateCount = () => {  
        if (type === 'bun') {
            setCount(0)
        }
        
        cart.forEach((element) => {  
            if(element.product.id === _id) { 
                setCount(element.quantity);
            } 
        })
    }  

    return (
        <div className={style.container} onClick={clickHandler} id={_id}>
            <Counter count={count}/>
            <img className={style.image} src={image} alt=''/>
            <div className={style.textBox}>
                <div className={style.price}>
                    <p className="text text_type_digits-default">{price}</p><CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default">{name}</p>
            </div>
            
        </div>
    )
}

function ItemsBlock({label, type, data, clickHandler, cart}) {
    return (
        <>
            <Label text={label} />
            <div className={style.typeBox}>
                {                    
                    data.map(element => {                    
                        if(element.type === type)
                    return <CatalogItem image={element.image} name={element.name} price={element.price} _id={element._id} clickHandler={clickHandler} cart={cart} type={type}/>
                })}
            </div>
        </>
    )
}

function Label({text}) {
    return (
        <p className="text text_type_main-medium">{text}</p>
    )
}

export default BurgerIngredients