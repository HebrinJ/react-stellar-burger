import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { passwordReset } from '../../../utils/api'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from '../registration.module.css'
import { Link } from 'react-router-dom'

export default function ResetPassword() {

    const [password, setPassword] = React.useState('')
    const [code, setCode] = React.useState('')
    const input = React.useRef(null);

    function handleClick() {
        passwordReset(password, code)
    }

    return (
        <form className={style.container}>
            <h1 className={`text text_type_main-medium ${style.header}`}>Восстановление пароля</h1>  
            <div className={style.input}>
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="mb-2"
                />
            </div>
            <div className={style.input}>
                <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={e => setCode(e.target.value)}
                value={code}
                name={'name'}
                error={false}
                ref={input}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
                />
            </div>
            <div className={style.button}>
                <Button htmlType="button" type="primary" size="medium" onSubmit={handleClick}>Сохранить</Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${style.subtext}`}>Вспомнили пароль?
              <Link to='/login' className={style.link}>Войти</Link>
            </p>
        </form>
    )
}