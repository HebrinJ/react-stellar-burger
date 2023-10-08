import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ItemsBlock from './items-block/items-block';
import React from 'react';
import style from './burger-ingredients.module.css';
import PropTypes from 'prop-types';

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
                    <ItemsBlock label='Булки' type='bun' handleOpenModal={props.handleOpenModal} />
                </div>
                <div ref={sauce}>
                    <ItemsBlock label='Соусы' type='sauce' handleOpenModal={props.handleOpenModal} />
                </div>
                <div ref={main}>
                    <ItemsBlock label='Основное' type='main' handleOpenModal={props.handleOpenModal} />
                </div>
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    handleOpenModal: PropTypes.func.isRequired,
}

export default BurgerIngredients