import { useMatch } from 'react-router-dom'
import style from './profile.module.css'
import NavBar from './nav-bar/navBar'
import UserDataForm from './user-data-form/userDataForm'
import { PROFILE } from '../../utils/routes'
import Orders from '../orders/orders'
import { USER_FEED_SOCKET_URL } from '../../utils/urls'

export default function Profile() {
    
    //const location = useLocation();
    const isProfile = useMatch(PROFILE);
    const token = localStorage.getItem('accessToken').slice(7);

    return (
        <div className={style.container}>
            <NavBar />
            { isProfile ? <UserDataForm /> : <Orders socketUrl={`${USER_FEED_SOCKET_URL}${token}`} isPersonal={true} /> }
        </div>
    )
}