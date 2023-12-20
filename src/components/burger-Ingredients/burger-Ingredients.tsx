import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ItemsBlock from './items-block/items-block';
import React from 'react';
import style from './burger-ingredients.module.css';
import { TIngredientTypes } from '../../utils/typesDescription';

type TActiveTabStates = {
    bun: boolean;
    sauce: boolean;
    main: boolean;
};

export default function BurgerIngredients() {
    const bun = React.useRef<HTMLDivElement>(null);
    const sauce = React.useRef<HTMLDivElement>(null);
    const main = React.useRef<HTMLDivElement>(null);
    const navPanel = React.useRef<HTMLElement>(null);

    const [selected, setSelected] = React.useState<TActiveTabStates>({bun: true, sauce: false, main: false});    

    const handleClick = (elementRef: React.RefObject<HTMLElement>, type: TIngredientTypes) => {        
        elementRef.current?.scrollIntoView({behavior: 'smooth'});

        let currentSelectedType: string | null = null;

        for (const state in Object.keys(selected)) {
            const value = selected[state as keyof TActiveTabStates];
            if(value === true) currentSelectedType = state;
        }
        
        setSelected({...selected, [currentSelectedType as keyof TActiveTabStates]: false, [type]: true})
    }

    const handleScroll = () => {        
        const bunCoords = bun.current?.getBoundingClientRect();
        const sauceCoords = sauce.current?.getBoundingClientRect();
        const mainCoords = main.current?.getBoundingClientRect();
        
        const navPanelCoords = navPanel.current?.getBoundingClientRect();
        
        if((navPanelCoords!.y + navPanelCoords!.height) - (bunCoords!.y + bunCoords!.height) < -40) {
            setSelected({bun: true, sauce: false, main: false});
        } else if ((navPanelCoords!.y + navPanelCoords!.height) - sauceCoords!.y > -100 && (navPanelCoords!.y + navPanelCoords!.height) - sauceCoords!.y < 400) {
            setSelected({bun: false, sauce: true, main: false});
        } else if ((navPanelCoords!.y + navPanelCoords!.height) - mainCoords!.y > -100) {
            setSelected({bun: false, sauce: false, main: true});
        }
    }

    return (
        <section>
            <p className='text text_type_main-large'>Соберите бургер</p>
            <nav className={style.navBar} ref={navPanel}>
                <Tab onClick={() => handleClick(bun, 'bun')} active={selected.bun} value='Булки'>Булки</Tab>
                <Tab onClick={() => handleClick(sauce, 'sauce')} active={selected.sauce} value='Соусы'>Соусы</Tab>
                <Tab onClick={() => handleClick(main, 'main')} active={selected.main} value='Начинки'>Начинки</Tab>
            </nav>            
            <div className={`${style.mainBox} custom-scroll`} onScroll={handleScroll}>
                <div ref={bun}>
                    <ItemsBlock label='Булки' type='bun'/>
                </div>
                <div ref={sauce}>
                    <ItemsBlock label='Соусы' type='sauce'/>
                </div>
                <div ref={main}>
                    <ItemsBlock label='Основное' type='main'/>
                </div>
            </div>
        </section>
    )
}
