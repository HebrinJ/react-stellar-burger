import React from 'react'
import { EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './profile.module.css'

export default function Profile() {

    function GetInput() {
        const [value, setValue] = React.useState('')
        const inputRef = React.useRef(null)
        const onIconClick = () => {
            setTimeout(() => inputRef.current.focus(), 0)
            alert('Icon Click Callback')
          }
        
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
            icon={'EditIcon'}
            onIconClick={onIconClick}
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
                    placeholder="Логин"
                    isIcon={true}
                    extraClass="mb-2"
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
                    icon="EditIcon"
                />
            </div>
        )
    }

    return (
        <div className={style.container}>
            <nav className={style.navBox}>
                <ul className={style.list}>
                    <li className={`text text_type_main-medium ${style.navLink}`}>Профиль</li>
                    <li className={`text text_type_main-medium text_color_inactive ${style.navLink}`}>История заказов</li>
                    <li className={`text text_type_main-medium text_color_inactive ${style.navLink}`}>Выход</li>
                </ul>
                <p className={`text text_type_main-small text_color_inactive`}>В этом разделе вы можете изменить свои персонажльные данные</p>
            </nav>
            <section className={style.infoBox}>
                {GetInput()}
                {GetEmailInput()}
                {GetPasswordInput()}
            </section>
        </div>
    )
}