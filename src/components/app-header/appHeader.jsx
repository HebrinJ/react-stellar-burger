import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Outlet } from 'react-router-dom'
import header from './app-header.module.css'

export default function AppHeader() {

    return (
        <>
        <header className={header.appHeader}>
            <nav className={header.headerBox}>
                <div className={header.constructor}>
                    <BurgerIcon type="primary" />
                    <Link to='/' className={`text text_type_main-default ${header.link}`}>Конструктор</Link>
                </div>
                <div className={header.orderList}>
                    <ListIcon type="secondary" />
                    <p className="text text_type_main-default">Лента заказов</p>
                </div>
                <div className={header.logo}>
                    <Logo />
                </div>
                <div className={header.profile}>
                    <ProfileIcon type="secondary" />
                    <Link to='/profile' className={`text text_type_main-default ${header.link}`}>Личный кабинет</Link>
                </div>
            </nav>
        </header>
        <Outlet />
        </>
    )
}
