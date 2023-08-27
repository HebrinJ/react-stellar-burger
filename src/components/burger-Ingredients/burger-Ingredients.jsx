import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import style from './burger-ingredients.module.css'
import PropTypes from 'prop-types'

function BurgerIngredients(props) {
    const bun = React.useRef(null);
    const sauce = React.useRef(null);
    const main = React.useRef(null);

    const [selected, setSelected] = React.useState({bun: true, sauce: false, main: false});

    const handleClick = (elementRef, type) => {        
        elementRef.current?.scrollIntoView({behavior: 'smooth'});

        let currentSelectedType = null;

        for (let state in selected) {
            if(selected[state] === true) currentSelectedType = state;
        }
        
        setSelected({...selected, [currentSelectedType]: false, [type]: true})
    }

    return (
        <section>
            <p className='text text_type_main-large'>Соберите бургер</p>
            <nav className={style.navBar}>
                <Tab onClick={() => handleClick(bun, 'bun')} active={selected.bun}>Булки</Tab>
                <Tab onClick={() => handleClick(sauce, 'sauce')} active={selected.sauce}>Соусы</Tab>
                <Tab onClick={() => handleClick(main, 'main')} active={selected.main}>Начинки</Tab>
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
        <div className={style.container} onClick={clickHandler} name={_id}>
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

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    clickHandler: PropTypes.func,
    cart: PropTypes.arrayOf(PropTypes.object),
}

ItemsBlock.propTypes = {
    label: PropTypes.string,
    type: PropTypes.oneOf(['bun', 'sauce', 'main']),
    data: PropTypes.arrayOf(PropTypes.object),
    clickHandler: PropTypes.func,
    cart: PropTypes.arrayOf(PropTypes.object),
}

CatalogItem.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    _id: PropTypes.string,
    clickHandler: PropTypes.func,
    cart: PropTypes.arrayOf(PropTypes.object),
    type: PropTypes.oneOf(['bun', 'sauce', 'main']),
}

Label.propTypes = {
    text: PropTypes.string,
}


export default BurgerIngredients