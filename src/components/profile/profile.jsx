import React from 'react'
import { EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../services/actions/auth-actions'
import { Link, useNavigate } from 'react-router-dom'
import style from './profile.module.css'

export default function Profile() {

    const navigate = useNavigate();
    // const auth = useSelector(state => state.auth)

    // React.useEffect(() => {
    //     const isLogin = localStorage.getItem('accessToken');

    //     if(!isLogin) {
    //         navigate('/login');
    //     }
    // }, [])

    function GetInput() {
        const [value, setValue] = React.useState('')
        const inputRef = React.useRef(null)
        const onIconClick = () => {
            setTimeout(() => inputRef.current.focus(), 0)
            alert('Icon Click Callback')
          }
        
    return (
        <div className={style.input}>
            <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setValue(e.target.value)}
            value={value}
            name={'name'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            icon={'EditIcon'}
            onIconClick={onIconClick}
            size={'default'}
            extraClass="ml-1"
            />
        </div>
        )
    }

    function GetEmailInput() {
        
        const [value, setValue] = React.useState('')
        const onChange = e => {
            setValue(e.target.value)
        }

        return (
            <div className={style.input}>            
                <EmailInput
                    onChange={onChange}
                    value={value}
                    name={'email'}
                    placeholder="Логин"
                    isIcon={true}
                    extraClass="mb-2"
                />
            </div>
        )          
    }

    function GetPasswordInput() {
        
        const [value, setValue] = React.useState('')
        const onChange = e => {
            setValue(e.target.value)
        }
        return (
            <div className={style.input}>
                <PasswordInput
                    onChange={onChange}
                    value={value}
                    name={'password'}
                    icon="EditIcon"
                />
            </div>
        )
    }

    const dispatch = useDispatch();

    function handleLogout() {
        if(!localStorage.getItem('accessToken')) return;

        dispatch(userLogout());
        navigate('/login')
    }

    return (
        <div className={style.container}>
            <nav className={style.navBox}>
                <ul className={style.list}>
                    <li className={`text text_type_main-medium ${style.navLink}`}>
                        <span className={style.pointer}>Профиль</span>
                    </li>
                    <li className={`text text_type_main-medium text_color_inactive ${style.navLink}`}>
                        <span className={style.pointer}>История заказов</span>
                    </li>
                    <li className={`text text_type_main-medium text_color_inactive ${style.navLink}`} onClick={handleLogout}>
                        <span className={style.pointer}>Выход</span>
                    </li>
                </ul>
                <p className={`text text_type_main-small text_color_inactive`}>В этом разделе вы можете изменить свои персонажльные данные</p>
            </nav>
            <section className={style.infoBox}>
                {GetInput()}
                {GetEmailInput()}
                {GetPasswordInput()}
            </section>
        </div>
    )
}