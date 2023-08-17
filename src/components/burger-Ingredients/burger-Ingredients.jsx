import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-ingredients.module.css'
import { data } from '../../utils/data.js'

function BurgerIngredients() {
    return (
        <section>
            <nav style={{ display: 'flex' }}>
                <Tab>Булки</Tab>
                <Tab>Соусы</Tab>
                <Tab>Начинки</Tab>
            </nav>            
            <div className={`${style.mainBox} custom-scroll`}>
                <ItemsBlock label='Булки' type='bun' data={data} />
                <ItemsBlock label='Соусы' type='sauce' data={data} />
                <ItemsBlock label='Основное' type='main' data={data} />
            </div>
        </section>
    )
}

function CatalogItem({image, name, price}) {
    return (
        <div className={style.container}>
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

function ItemsBlock({label, type, data}) {
    return (
        <>
            <Label text={label} />
            <div style={{ display: 'flex', alignContent: 'start', flexWrap: 'wrap'}}>
                {                    
                    data.map(element => {                    
                        if(element.type === type)
                    return <CatalogItem image={element.image} name={element.name} price={element.price}/>
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