import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FormEvent } from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import style from '../registration.module.css'
import { registrationUser } from '../../../services/actions/auth-actions'
import { LOGIN } from '../../../utils/routes'

export default function Registration(): JSX.Element {

    const [userName, setUserName] = React.useState<string>('')
    const userNameRef = React.useRef<HTMLInputElement>(null)

    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const dispatch = useDispatch();

    function handleRegister(event: FormEvent) {
        event.preventDefault();
        
        dispatch(registrationUser(email, password, userName));
    }

    return (
        <form className={style.container} onSubmit={handleRegister}>
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
                <Button htmlType="submit" type="primary" size="medium">Зарегистрироваться</Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${style.text}`}>Уже зарегистрированы? 
                <Link to={LOGIN} className={style.link}> Войти</Link>
            </p>            
        </form>
    )
}