import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-constructor.module.css'
import { data } from '../../utils/data.js'

function BurgerConstructor() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <div className={`${style.list} custom-scroll`}>
                {data.map(component => 
                    // if(element === data[0]) return <ConstructorElement type='top' text={element.name} price={element.price} thumbnail={element.image}/>
                    // if(element === data[data.length - 1]) return <ConstructorElement type='bottom' text={element.name} price={element.price} thumbnail={element.image}/>
                    // else return <ConstructorElement text={element.name} price={element.price} thumbnail={element.image}/>
                    AddElement(component)
                )}
            </div>
            <div className={style.order}>
                <div style={{ display: 'flex', margin: '40px', alignItems: 'center', gap: '10px'}}>
                    <p className="text text_type_digits-medium">600</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="medium">Оформить заказ</Button>
            </div>
        </div>
    )
}

function AddElement(component) {
    
    if(component.type === 'bun') {
        return <>
            <ConstructorElement type='top' text={component.name} price={component.price} thumbnail={component.image} isLocked={true}/>
            <ConstructorElement type='bottom' text={component.name} price={component.price} thumbnail={component.image} isLocked={true}/>
        </>
    } else {
        return <ul style={{display: 'flex', alignItems: 'center', margin: '0 0 0 -14px', gap: '14px', minWidth: '568px'}}><DragIcon type="primary"/><ConstructorElement text={component.name} price={component.price} thumbnail={component.image}/></ul>
    }
}

export default BurgerConstructor;