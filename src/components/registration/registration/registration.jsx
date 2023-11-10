import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import style from '../registration.module.css'
import { userRegistration } from '../../../services/actions/auth-actions'
import { useNavigate } from 'react-router-dom'

export default function Registration() {

    const [userName, setUserName] = React.useState('')
    const userNameRef = React.useRef(null)

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const navigate = useNavigate();

    const dispatch = useDispatch();

    function handleRegister() {
        dispatch(userRegistration(email, password, userName));
        //navigate('/', {replace: true})
    }

    return (
        <div className={style.container}>
            <h1 className={`text text_type_main-medium ${style.header}`}>Регистрация</h1>
            <div className={style.input}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setUserName(e.target.value)}
                    value={userName}
                    name={'name'}
                    error={false}
                    ref={userNameRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
            </div>
            <div className={style.input}>            
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    isIcon={false}
                />
            </div>
            <div className={style.input}>
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="mb-2"
                />
            </div>
            <div className={style.button}>
                <Button htmlType="button" type="primary" size="medium" onClick={handleRegister}>Зарегистрироваться</Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${style.text}`}>Уже зарегистрированы? 
                <Link to='/login' className={style.link}> Войти</Link>
            </p>            
        </div>
    )
}