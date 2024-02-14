import React, { useState, useEffect, FormEvent } from 'react'
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from '../../../utils/hooks'
import { getUser, updateUser } from '../../../services/actions/auth-actions'
import style from './user-data-form.module.css'


export default function UserDataForm(): JSX.Element {

    const [name, setName] = useState<string>('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userReady, setUserReady] = useState<boolean>(false);
    const [isVisible, setVisible] = useState<boolean>(false);

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
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
        setTimeout(() => inputRef.current!.focus(), 0)
    }

    function handleSave(event: FormEvent): void {
        event.preventDefault();

        dispatch(updateUser(email, name, password));
        setVisible(false);
    }

    function handleCancel() {
        setName(user.name);
        setEmail(user.email);
        setVisible(false);
    }

return (
    <form className={style.infoBox} onSubmit={handleSave}>
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
            <Button htmlType="submit" type="primary" size="medium" >Сохранить</Button>
        </div>
    </form>
)}