import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from '../registration.module.css'

export default function ResetPassword() {

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
                    extraClass="mb-2"
                />
            </div>
        )
    }

    function GetInput() {
        const [value, setValue] = React.useState('')
        const inputRef = React.useRef(null)
        
    return (
        <div className={style.input}>
            <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={e => setValue(e.target.value)}
            value={value}
            name={'name'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
            />
        </div>
        )
    }

    return (
        <div className={style.container}>
            <h1 className={`text text_type_main-medium ${style.header}`}>Восстановление пароля</h1>            
            {GetPasswordInput()}
            {GetInput()}
            <div className={style.button}>
                <Button htmlType="button" type="primary" size="medium">Сохранить</Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${style.subtext}`}>Вспомнили пароль? <span className={style.link}>Войти</span></p>
        </div>
    )
}