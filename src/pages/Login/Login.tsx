import React, {useEffect, useState} from 'react';
import MyInput from "../../common/Input/MyInput";
import MyCheckbox from "../../common/Checkbox/MyCheckbox";
import MyButton from "../../common/Button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./login-reducer";
import s from "./Login.module.css"
import {RootStateType} from "../../BLL/store";
import {Link, Navigate} from "react-router-dom";
import {PATH} from "../AllRoutes";
import {isLoadingAC, setErrorAC} from "../../app/app-reducer";
import Preloader from "../../utils/Preloader";
import ErrorLoading from "../../common/ErrorLoading/ErrorLoading";

const Login = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const dispatch = useDispatch();
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)
    const isAuth = useSelector<RootStateType, boolean>(state => state.app.isAuth)
    const error = useSelector<RootStateType, string | null>(state => state.app.error)

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

    if (isLoading) {
        return <Preloader/>
    }
    if (isAuth) {
        return <Navigate to={PATH.PACKS}/>
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

            </div>
            <ErrorLoading error={error} isLoading={isLoading}/>
        </div>
    );
}

export default Login;