// регистрация и авторизация
import React, {useContext} from 'react';
import { Card, Form, Container, FormControl, Button } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'; // хук useLocation - получить маршрут в строке запроса
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { registration, login } from '../http/userAPI';
import { set } from 'mobx';
import { useState } from 'react';
import { Context } from '../index';
import { observer } from "mobx-react-lite";

const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                const data = await login(email, password);
            } else {
                const data = await registration(email, password);
            }  
            user.setUser(user)
            user.setIsAuth(true)  
            navigate(SHOP_ROUTE)  
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className='d-flex flex-column'>
                    <FormControl
                        className='mt-3'
                        placeholder='Ввведите ваш email...'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <FormControl
                        className='mt-3'
                        placeholder='Ввведите ваш пароль...'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Form className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button 
                            variant={'outline-success'}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Form>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;