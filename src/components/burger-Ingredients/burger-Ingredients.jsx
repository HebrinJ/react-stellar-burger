import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
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
                <ItemsBlock label='Булки' type='bun' data={props.data} clickHandler={props.clickHandler}/>
                <ItemsBlock label='Соусы' type='sauce' data={props.data} clickHandler={props.clickHandler}/>
                <ItemsBlock label='Основное' type='main' data={props.data} clickHandler={props.clickHandler}/>
            </div>
        </section>
    )
}

function CatalogItem({image, name, price, _id, clickHandler}) {
    return (
        <div className={style.container} onClick={clickHandler} id={_id}>
            <Counter />
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

function ItemsBlock({label, type, data, clickHandler}) {
    return (
        <>
            <Label text={label} />
            <div style={{ display: 'flex', alignContent: 'start', flexWrap: 'wrap'}}>
                {                    
                    data.map(element => {                    
                        if(element.type === type)
                    return <CatalogItem image={element.image} name={element.name} price={element.price} _id={element._id} clickHandler={clickHandler}/>
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