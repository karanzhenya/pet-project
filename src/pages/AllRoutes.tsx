import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import NewPassword from "./NewPassword";
import Profile from "./Profile";
import Page404 from "./Page404/Page404";
import Common from "./Common";
import ForgotPassword from "./ForgotPassword/ForgotPassword";

export const PATH = {
    LOGIN: '/login',
    NEW_PASSWORD: '/new-password',
    PASSWORD_RECOVERY: '/password-recovery',
    REGISTRATION: '/registration',
    PAGE_404: '/page404',
    PROFILE: '/profile',
    COMMON: '/common'
}

const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<ForgotPassword/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.COMMON} element={<Common/>}/>
                <Route path={PATH.PAGE_404} element={<Page404/>}/>
                <Route path={'*'} element={<Navigate to={PATH.PAGE_404}/>}/>
            </Routes>
        </>
    );
}

export default AllRoutes;
