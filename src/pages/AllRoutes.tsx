import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import NewPassword from "./NewPassword/NewPassword";
import Profile from "./Profile";
import Page404 from "./Page404/Page404";
import Common from "./Common";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import PacksList from "../packs/PacksList";
import Home from "../Home";

export const PATH = {
    LOGIN: '/login',
    NEW_PASSWORD: '/new-password/:token',
    PASSWORD_RECOVERY: '/password-recovery',
    REGISTRATION: '/registration',
    PAGE_404: '/page404',
    PROFILE: '/profile',
    PACKS: '/packs',
    COMMON: '/common'
}

const AllRoutes = () => {

    return (
        <>
            <Routes>
                <Route path={'/'} element={<Home />}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<ForgotPassword/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.PACKS} element={<PacksList/>}/>
                <Route path={PATH.COMMON} element={<Common/>}/>
                <Route path={PATH.PAGE_404} element={<Page404/>}/>
                <Route path={'*'} element={<Navigate to={PATH.PAGE_404}/>}/>
            </Routes>
        </>
    );
}

export default AllRoutes;
