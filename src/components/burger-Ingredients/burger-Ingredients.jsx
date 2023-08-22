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
                <ItemsBlock label='Булки' type='bun' data={props.data} clickHandler={props.clickHandler} itemsCount={props.itemsCount} selectedItemCount={props.selectedItemCount}/>
                <ItemsBlock label='Соусы' type='sauce' data={props.data} clickHandler={props.clickHandler} itemsCount={props.itemsCount} selectedItemCount={props.selectedItemCount}/>
                <ItemsBlock label='Основное' type='main' data={props.data} clickHandler={props.clickHandler} itemsCount={props.itemsCount} selectedItemCount={props.selectedItemCount}/>
            </div>
        </section>
    )
}

function CatalogItem({image, name, price, _id, clickHandler, itemsCount}) {
    const [count, setCount] = React.useState(0);
    
    React.useEffect(() => {        
        updateCount();
    }, [itemsCount]);    

    const updateCount = () => {
        for (let id in itemsCount) {
            if(id === _id) {                
                setCount(itemsCount[id]);
            }
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

function ItemsBlock({label, type, data, clickHandler, itemsCount, selectedItemCount}) {
    return (
        <>
            <Label text={label} />
            <div style={{ display: 'flex', alignContent: 'start', flexWrap: 'wrap'}}>
                {                    
                    data.map(element => {                    
                        if(element.type === type)
                    return <CatalogItem image={element.image} name={element.name} price={element.price} _id={element._id} clickHandler={clickHandler} itemsCount={itemsCount}/>
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