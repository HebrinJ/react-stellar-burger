import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FormEvent } from 'react'
import { passwordReset } from '../../../utils/api'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from '../registration.module.css'
import { Link } from 'react-router-dom'
import { LOGIN } from '../../../utils/routes'

export default function ResetPassword(): JSX.Element {

    const [password, setPassword] = React.useState<string>('');
    const [code, setCode] = React.useState<string>('');
    const input = React.useRef<HTMLInputElement>(null);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        passwordReset(password, code)
    }

    return (
        <form className={style.container} onSubmit={handleSubmit}>
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
                <Button htmlType="submit" type="primary" size="medium" >Сохранить</Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${style.subtext}`}>Вспомнили пароль?
              <Link to={LOGIN} className={style.link}>Войти</Link>
            </p>
        </form>
    )
}