import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, Outlet, useLocation, useMatch } from 'react-router-dom'
import header from './app-header.module.css'
import { PROFILE, ROOT, FEED, ORDERS } from '../../utils/routes'

export default function AppHeader() {

    const location = useLocation();
    let types = ['primary', 'secondary', 'secondary'];
    setSelected();

    function setSelected() {
        
        switch (location.pathname) {
            case ROOT:                
                types = ['primary', 'secondary', 'secondary']
                break;
            case PROFILE:
            case ORDERS:
                types = ['secondary', 'secondary', 'primary']
                break;
            case FEED:
                types = ['secondary', 'primary', 'secondary']
                break;
        }
    }

    return (
        <>
        <header className={header.appHeader}>
            <nav className={header.headerBox}>
                <div className={header.constructor}>
                    <BurgerIcon type={types[0]} />
                    <NavLink to={ROOT} className={
                                ({ isActive }) => (isActive ?
                                 `text text_type_main-default ${header.activelink}` : 
                                 `text text_type_main-default ${header.link}`)}>Конструктор</NavLink>
                </div>
                <div className={header.orderList}>
                    <ListIcon type={types[1]} />
                    <NavLink to={FEED} className={
                                ({ isActive }) => (isActive ?
                                 `text text_type_main-default ${header.activelink}` : 
                                 `text text_type_main-default ${header.link}`)}>Лента заказов</NavLink>
                </div>
                <div className={header.logo}>
                    <Logo />
                </div>
                <div className={header.profile}>
                    <ProfileIcon type={types[2]} />
                    <NavLink to={PROFILE} className={
                                ({ isActive }) => (isActive ?
                                 `text text_type_main-default ${header.activelink}` : 
                                 `text text_type_main-default ${header.link}`)}>Личный кабинет</NavLink>
                </div>
            </nav>
        </header>
        <Outlet />
        </>
    )
}
