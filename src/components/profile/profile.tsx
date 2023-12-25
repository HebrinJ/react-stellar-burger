import { Outlet, useMatch } from 'react-router-dom'
import style from './profile.module.css'
import NavBar from './nav-bar/nav-bar'
import UserDataForm from './user-data-form/user-data-form'
import { PROFILE } from '../../utils/routes'
import Orders from '../orders/orders'
import { USER_FEED_SOCKET_URL } from '../../utils/urls'

export default function Profile() {    

    const isProfile = useMatch(PROFILE);
    const token: string | undefined = localStorage.getItem('accessToken')?.slice(7);

    return (
        <div className={style.container}>
            <NavBar />
            <Outlet />            
            { isProfile ? <UserDataForm /> : <Orders socketUrl={`${USER_FEED_SOCKET_URL}${token}`} isPersonal={true} /> }
        </div>
    )
}