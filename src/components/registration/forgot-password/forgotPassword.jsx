import React from 'react'
import { forgotReset } from '../../../utils/api'
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import style from '../registration.module.css'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {

    const [value, setValue] = React.useState('')
    const navigate = useNavigate();
    
    const onChange = e => {
            setValue(e.target.value)
        }

    function handleClick() {
        forgotReset(value).then(res => {
            if(res.success) {
                navigate('/reset-password')}
    })
    }

    return (
        <div className={style.container}>
            <h1 className={`text text_type_main-medium ${style.header}`}>Восстановление пароля</h1>
            <div className={style.input}>            
                <EmailInput onChange={onChange} value={value} name={'email'} isIcon={false} />
            </div>
            <div className={style.button}>
                <Button htmlType="button" type="primary" size="medium" onClick={handleClick}>Восстановить</Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${style.subtext}`}>Вспомнили пароль? <span className={style.link}>Войти</span></p>            
        </div>
    )
}