import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from '../registration.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userSignin } from '../../../services/actions/auth-actions'

export default function Login() {    

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('')

    const navigate = useNavigate();
    const auth = useSelector(state => state.auth.success)
    const isLogin = localStorage.getItem('accessToken');

    React.useEffect(() => {
        if(isLogin) {
            navigate('/');
        }
    }, [auth])

    const dispatch = useDispatch();

    function handleSignin(event) {
        event.preventDefault();

        dispatch(userSignin(email, password))
    }

    return (
        <form className={style.container} onSubmit={handleSignin}>
            <h1 className={`text text_type_main-medium ${style.header}`}>Вход</h1>
            <div className={style.input}>            
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    isIcon={false}
                />
            </div>
            <div className={style.input}>
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="mb-2"
                />
            </div>
            <div className={style.button}>
                <Button htmlType="submit" type="primary" size="medium" >Войти</Button>
            </div>
            <p className={`text text_type_main-default text_color_inactive ${style.subtext}`}>Вы - новый пользователь? 
                <Link to='/registration' className={style.link}> Зарегистрироваться</Link>
            </p>
            <p className='text text_type_main-default text_color_inactive'>Забыли пароль? 
                <Link to='/forgot-password' className={style.link}> Восстановить пароль</Link>
            </p>
        </form>
    )
}