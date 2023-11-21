import { useDispatch } from 'react-redux';
import style from './navBar.module.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { LOGIN, PROFILE, ORDERS } from '../../../utils/routes';
import { userLogout } from '../../../services/actions/auth-actions';

export default function NavBar() {

const dispatch = useDispatch();
const navigate = useNavigate();

function handleLogout() {
    if (!localStorage.getItem('accessToken')) return;

    dispatch(userLogout());
    navigate(LOGIN)
}

return (
    <nav className={style.navBox}>
        <ul className={style.list}>
            <li className={`text text_type_main-medium ${style.navLink}`} >
                <NavLink to={PROFILE} className={({ isActive }) => (isActive ?
                                 `text text_type_main-medium ${style.linkColor} ` : 
                                 `text text_type_main-medium ${style.linkDecoration} text_color_inactive`)} end>Профиль</NavLink>
            </li>
            <li className={`text text_type_main-medium ${style.navLink}`} >
                <NavLink to={ORDERS} className={({ isActive }) => (isActive ?
                                 `text text_type_main-medium ${style.linkColor} ` : 
                                 `text text_type_main-medium ${style.linkDecoration} text_color_inactive`)} >История заказов</NavLink>
            </li>
            <li className={`text text_type_main-medium text_color_inactive ${style.navLink}`} onClick={handleLogout}>
                <span className={style.pointer}>Выход</span>
            </li>
        </ul>
        <p className={`text text_type_main-small text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
    </nav>
)}