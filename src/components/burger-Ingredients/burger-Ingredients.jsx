import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import style from './burger-ingredients.module.css'
import { data } from '../../utils/data.js'

function BurgerIngredients(props) {
    const bun = React.useRef(null);
    const sauce = React.useRef(null);
    const main = React.useRef(null);

    const handleClick = (elementRef) => {        
        elementRef.current?.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <section>
            <nav style={{ display: 'flex' }}>
                <Tab onClick={() => handleClick(bun)}>Булки</Tab>
                <Tab onClick={() => handleClick(sauce)}>Соусы</Tab>
                <Tab onClick={() => handleClick(main)}>Начинки</Tab>
            </nav>            
            <div className={`${style.mainBox} custom-scroll`}>
                <div ref={bun}>
                    <ItemsBlock label='Булки' type='bun' data={props.data} clickHandler={props.clickHandler} cart={props.cart}/>
                </div>
                <div ref={sauce}>
                    <ItemsBlock label='Соусы' type='sauce' data={props.data} clickHandler={props.clickHandler} cart={props.cart}/>
                </div>
                <div ref={main}>
                    <ItemsBlock label='Основное' type='main' data={props.data} clickHandler={props.clickHandler} cart={props.cart}/>
                </div>
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

        const product = cart.find((elem) => elem.product.id === _id)

        if(product) {
            setCount(product.quantity);
        } else {
            setCount(0);
        }        
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
                    data.map((element, index) => {                    
                        if(element.type === type)
                    return <CatalogItem 
                        key={index} 
                        image={element.image} 
                        name={element.name} 
                        price={element.price} 
                        _id={element._id} 
                        clickHandler={clickHandler} 
                        cart={cart} 
                        type={type}/>
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