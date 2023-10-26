import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import style from '../registration.module.css'

export default function Registration() {

    function GetInput() {
        const [value, setValue] = React.useState('')
        const inputRef = React.useRef(null)
        
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
            <h1 className={`text text_type_main-medium ${style.header}`}>Регистрация</h1>
            {GetInput()}
            {GetEmailInput()}
            {GetPasswordInput()}
            <div className={style.button}>
                <Button htmlType="button" type="primary" size="medium">Зарегистрироваться</Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${style.text}`}>Уже зарегистрированы? 
                <Link to='/login' className={style.link}> Войти</Link>
            </p>            
        </div>
    )
}