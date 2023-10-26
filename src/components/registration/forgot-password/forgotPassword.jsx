import React from 'react'
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import style from '../registration.module.css'

export default function ForgotPassword() {

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

    return (
        <div className={style.container}>
            <h1 className={`text text_type_main-medium ${style.header}`}>Восстановление пароля</h1>
            {GetEmailInput()}
            <div className={style.button}>
                <Button htmlType="button" type="primary" size="medium">Восстановить</Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${style.subtext}`}>Вспомнили пароль? <span className={style.link}>Войти</span></p>            
        </div>
    )
}