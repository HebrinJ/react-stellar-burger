import style from './login.module.css'
import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

export default function Login() {    

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
                    isIcon={false}
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
                    extraClass="mb-2"
                />
            </div>
        )
    }

    return (
        <div className={style.container}>
            <h1 className={`text text_type_main-medium ${style.header}`}>Вход</h1>
            {GetEmailInput()}
            {GetPasswordInput()}
            <div className={style.button}>
                <Button htmlType="button" type="primary" size="medium">Войти</Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${style.text}`}>Вы - новый пользователь? <span className={style.link}>Зарегистрироваться</span></p>
            <p className='text text_type_main-default text_color_inactive'>Забыли пароль? <span className={style.link}>Восстановить пароль</span></p>
        </div>
    )
}