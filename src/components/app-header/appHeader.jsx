import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import header from './app-header.module.css'
import { PROFILE, ROOT, FEED, ORDERS } from '../../utils/routes'

export default function AppHeader() {

    const location = useLocation();
    let iconTypes = ['primary', 'secondary', 'secondary'];
    setSelected();

    function setSelected() {
        
        switch (location.pathname) {
            case ROOT:                
                iconTypes = ['primary', 'secondary', 'secondary']
                break;
            case PROFILE:
            case ORDERS:
                iconTypes = ['secondary', 'secondary', 'primary']
                break;
            case FEED:
                iconTypes = ['secondary', 'primary', 'secondary']
                break;
        }
    }

    return (
        <>
        <header className={header.appHeader}>
            <nav className={header.headerBox}>
                <div className={header.constructor}>                    
                    <NavLink to={ROOT} className={
                                ({ isActive }) => (isActive ?
                                 `text text_type_main-default ${header.activelink} ${header.constructor}` : 
                                 `text text_type_main-default ${header.link} ${header.constructor}`)}>
                        <BurgerIcon type={iconTypes[0]} />Конструктор</NavLink>
                </div>
                <div className={header.orderList}>                    
                    <NavLink to={FEED} className={
                                ({ isActive }) => (isActive ?
                                 `text text_type_main-default ${header.activelink} ${header.orderList}` : 
                                 `text text_type_main-default ${header.link} ${header.orderList}`)}>
                        <ListIcon type={iconTypes[1]} />Лента заказов</NavLink>
                </div>
                <div className={header.logo}>
                    <Logo />
                </div>
                <div className={header.profile}>                    
                    <NavLink to={PROFILE} className={
                                ({ isActive }) => (isActive ?
                                 `text text_type_main-default ${header.activelink} ${header.profile}` : 
                                 `text text_type_main-default ${header.link} ${header.profile}`)}>
                        <ProfileIcon type={iconTypes[2]} />Личный кабинет</NavLink>
                </div>
            </nav>
        </header>
        <Outlet />
        </>
    )
}
