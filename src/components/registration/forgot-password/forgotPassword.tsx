import React, { ChangeEvent, FormEvent } from 'react'
import { forgotReset } from '../../../utils/api'
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import style from '../registration.module.css'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {

    const [value, setValue] = React.useState('')
    const navigate = useNavigate();
    
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value)
        }

    function handleClick(event: FormEvent) {
        event.preventDefault();
        
        forgotReset(value).then(res => {
            if(res.success) {
                navigate('/reset-password')}
    })
    }

    return (
        <form className={style.container} onSubmit={handleClick}>
            <h1 className={`text text_type_main-medium ${style.header}`}>Восстановление пароля</h1>
            <div className={style.input}>            
                <EmailInput onChange={onChange} value={value} name={'email'} isIcon={false} />
            </div>
            <div className={style.button}>
                <Button htmlType="submit" type="primary" size="medium" >Восстановить</Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${style.subtext}`}>Вспомнили пароль? <span className={style.link}>Войти</span></p>            
        </form>
    )
}