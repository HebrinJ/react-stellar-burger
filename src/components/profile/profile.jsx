import React, { useState, useEffect } from 'react'
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, updateUser, userLogout } from '../../services/actions/auth-actions'
import { useNavigate } from 'react-router-dom'
import style from './profile.module.css'

export default function Profile() {

    const [name, setName] = useState('');
    const inputRef = React.useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = React.useState('');
    const [userReady, setUserReady] = React.useState(false);
    const [isVisible, setVisible] = React.useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if(localStorage.getItem('accessToken')) {
            dispatch(getUser());
          }        
    }, [])

    useEffect(() => {
        if(userReady) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [userReady])

    useEffect(() => {
        if(auth.user.name) {
            setUserReady(true);
        }
    }, [auth])

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }

    function handleLogout() {
        if (!localStorage.getItem('accessToken')) return;

        dispatch(userLogout());
        navigate('/login')
    }

    function handleSave() {
        dispatch(updateUser(email, name, password));
        setVisible(false);
    }

    function handleCancel() {
        setName(user.name);
        setEmail(user.email);
        setVisible(false);
    }

    return (
        <div className={style.container}>
            <nav className={style.navBox}>
                <ul className={style.list}>
                    <li className={`text text_type_main-medium ${style.navLink}`}>
                        <span className={style.pointer}>Профиль</span>
                    </li>
                    <li className={`text text_type_main-medium text_color_inactive ${style.navLink}`}>
                        <span className={style.pointer}>История заказов</span>
                    </li>
                    <li className={`text text_type_main-medium text_color_inactive ${style.navLink}`} onClick={handleLogout}>
                        <span className={style.pointer}>Выход</span>
                    </li>
                </ul>
                <p className={`text text_type_main-small text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
            </nav>
            <form className={style.infoBox}>
                <div className={style.input}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => {setName(e.target.value); setVisible(true)}}
                        value={name}
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
                <div className={style.input}>
                    <EmailInput
                        onChange={e => {setEmail(e.target.value); setVisible(true)}}
                        value={email}
                        name={'email'}
                        placeholder="Логин"
                        isIcon={true}
                        extraClass="mb-2"
                    />
                </div>
                <div className={style.input}>
                    <PasswordInput
                        onChange={e => {setPassword(e.target.value); setVisible(true)}}
                        value={password}
                        name={'password'}
                        icon="EditIcon"
                    />
                </div>
                <div className={ isVisible ? style.buttonBox : style.invisible}>
                    <Button htmlType="button" type="secondary" size="medium" onClick={handleCancel}>Отмена</Button>
                    <Button htmlType="button" type="primary" size="medium" onSubmit={handleSave}>Сохранить</Button>
                </div>
            </form>
        </div>
    )
}