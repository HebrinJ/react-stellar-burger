import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import header from './app-header.module.css'
import { PROFILE, ROOT, FEED, ORDERS } from '../../utils/routes'

export default function AppHeader() {
   
    return (
        <>
        <header className={header.appHeader}>
            <nav className={header.headerBox}>
                <div className={header.burgerConstructor}>                    
                    <NavLink to={ROOT} className={
                                ({ isActive }) => (isActive ?
                                 `text text_type_main-default ${header.activelink} ${header.burgerConstructor}` : 
                                 `text text_type_main-default ${header.link} ${header.burgerConstructor}`)}>                        
                        {({isActive}) => (<><BurgerIcon type={ isActive ? 'primary' : 'secondary'} />Конструктор</>)}                        
                    </NavLink>
                </div>
                <div className={header.orderList}>                    
                    <NavLink to={FEED} className={
                                ({ isActive }) => (isActive ?
                                 `text text_type_main-default ${header.activelink} ${header.orderList}` : 
                                 `text text_type_main-default ${header.link} ${header.orderList}`)}>
                        {({isActive}) => (<><ListIcon type={ isActive ? 'primary' : 'secondary'} />Лента заказов</>)}
                    </NavLink>
                </div>
                <div className={header.logo}>
                    <Logo />
                </div>
                <div className={header.profile}>                    
                    <NavLink to={PROFILE} className={
                                ({ isActive }) => (isActive ?
                                 `text text_type_main-default ${header.activelink} ${header.profile}` : 
                                 `text text_type_main-default ${header.link} ${header.profile}`)}>
                        {({isActive}) => (<><ProfileIcon type={ isActive ? 'primary' : 'secondary'} />Личный кабинет</>)}
                    </NavLink>
                </div>
            </nav>
        </header>
        <Outlet />
        </>
    )
}
