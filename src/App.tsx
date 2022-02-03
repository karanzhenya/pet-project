import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Common from "./pages/Common";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PasswordRecovery from "./pages/PasswordRecovery";
import NewPassword from "./pages/NewPassword";
import Profile from "./pages/Profile";
import Page404 from "./pages/Page404";

const PATH = {
    LOGIN: '/login',
    NEW_PASSWORD: '/new-password',
    PASSWORD_RECOVERY: '/password-recovery',
    REGISTRATION: '/registration',
    PAGE_404: '/page404',
    PROFILE: '/profile'
}

const App = () => {
    return (
        <>
            <Common/>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.PAGE_404} element={<Page404/>}/>
                <Route path={'*'} element={<Navigate to={PATH.PAGE_404}/>}/>
            </Routes>
        </>
    );
}

export default App;
