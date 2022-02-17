import React, {useEffect, useState} from 'react';
import MyInput from "../../common/Input/MyInput";
import MyCheckbox from "../../common/Checkbox/MyCheckbox";
import MyButton from "../../common/Button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./login-reducer";
import s from "./Login.module.css"
import {RootStateType} from "../../BLL/store";
import loading from "../../files/Шторм.gif"
import {Link, Navigate} from "react-router-dom";
import {PATH} from "../AllRoutes";
import {isLoadingAC, setErrorAC} from "../../app/app-reducer";
import Preloader from "../../utils/Preloader";

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)
    const error = useSelector<RootStateType, string | null>(state => state.app.error)
    const isAuth = useSelector<RootStateType, boolean>(state => state.app.isAuthorized)


    useEffect(() => {
        dispatch(setErrorAC(''))
        dispatch(isLoadingAC(false))
    }, [])

    const login = () => {
        dispatch(loginTC(email, password, rememberMe))
    }

    const handleEmail = (email: string) => {
        setEmail(email.trim())
    }
    const handlePassword = (password: string) => {
        setPassword(password.trim())
    }

    const handleRememberMe = (checked: boolean) => {
        setRememberMe(checked)
    }
    if (isAuth) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <div className={s.container}>
            <div className={s.login}>
                <MyInput placeholder='email' onChangeText={handleEmail}/>
                <MyInput placeholder='password' type='password' onChangeText={handlePassword}/>
                <MyCheckbox onChangeChecked={handleRememberMe}>Remember Me</MyCheckbox>

                <MyButton onClick={login}>Log In</MyButton>
                <Link to={PATH.REGISTRATION}><MyButton>Register</MyButton></Link>
                <Link to={PATH.PASSWORD_RECOVERY}><MyButton>Forgot Password?</MyButton></Link>
                <Link to={PATH.NEW_PASSWORD}><MyButton>Change Password</MyButton></Link>

            </div>
            <h1 style={{color: 'red'}}>{error && error}</h1>
            <div className={s.loading}>{isLoading && <img alt={''} src={loading}/>}</div>
        </div>
    );
}

export default Login;