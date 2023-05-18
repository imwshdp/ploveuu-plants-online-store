// навигация по странице. на какие-то страницы может зайти любой человек, на другие - только авторизованный
import React, { useContext } from 'react';
import {Routes, Navigate, Route} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';
import { Context } from '../index';

const AppRouter = () => {
    const {user} = useContext(Context)

    console.log(user)
    return (
        // если не отработает не один из маршрутов в Routes, то отработает последний редирект на основную страницу
        <Routes> 
            {user.isAuth === true && authRoutes.map(({path, Component}) => // импортируем массив с роутами, которые доступны авторизованному пользователю 
                <Route key={path} path={path} element={<Component/>} exact/> // деструктуризация
            )}
            {publicRoutes.map(({path, Component}) => // импортируем массив с роутами, которые доступны всем пользователям
                <Route key={path} path={path} element={<Component/>} exact/> // деструктуризация
            )}
            <Route path='*' element={<Navigate to={SHOP_ROUTE}/>} />
        </Routes>
    );
};

export default AppRouter;