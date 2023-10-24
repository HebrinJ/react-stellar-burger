import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import header from './app-header.module.css'

export default function AppHeader() {
    return (
        <header className={header.appHeader}>
            <nav className={header.headerBox}>
                <div className={header.constructor}>
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default">Конструктор</p>
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
                    <p className="text text_type_main-default">Личный кабинет</p>
                </div>
            </nav>
        </header>

    )
}
