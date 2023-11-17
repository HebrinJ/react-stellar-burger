import React, { useState, useEffect } from 'react'
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, updateUser, userLogout } from '../../services/actions/auth-actions'
import { useLocation, useNavigate } from 'react-router-dom'
import style from './profile.module.css'
import { LOGIN } from '../../utils/routes'
import NavBar from './nav-bar/navBar'
import UserDataForm from './user-data-form/userDataForm'
import { PROFILE, ORDERS } from '../../utils/routes'
import Orders from '../orders/orders'
import { USER_FEED_SOCKET_URL } from '../../utils/urls'

export default function Profile() {

    const location = useLocation();
    const token = localStorage.getItem('accessToken').slice(7);

    return (
        <div className={style.container}>
            <NavBar />
            { location.pathname === PROFILE ? <UserDataForm /> : <Orders socketUrl={`${USER_FEED_SOCKET_URL}${token}`}/> }
        </div>
    )
}