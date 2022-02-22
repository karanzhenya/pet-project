import React, {useEffect, useState} from 'react';
import s from "../Login/Login.module.css";
import MyInput from "../../common/Input/MyInput";
import MyButton from "../../common/Button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../BLL/store";
import {registerTC} from "../Registration/register-reducer";
import {Link, Navigate} from "react-router-dom";
import {PATH} from "../AllRoutes";
import {isLoadingAC, setErrorAC} from "../../app/app-reducer";
import ErrorLoading from "../../common/ErrorLoading/ErrorLoading";

const Registration = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch();
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)
    const error = useSelector<RootStateType, string | null>(state => state.app.error)
    const userId = useSelector<RootStateType, string>(state => state.login._id)

    useEffect(() => {
        dispatch(setErrorAC(''))
        dispatch(isLoadingAC(false))
    }, [])
    const register = () => {
        dispatch(registerTC(email, password))
    }
    const handleEmail = (email: string) => {
        setEmail(email.trim())
    }
    const handlePassword = (password: string) => {
        setPassword(password.trim())
    }
    if (userId) {
        return <Navigate to={PATH.PACKS} replace/>
    }
    return (
        <div className={s.container}>
            <div className={s.register}>
                <MyInput placeholder='email' onChangeText={handleEmail}/>
                <MyInput type='password' placeholder='password' onChangeText={handlePassword}/>
                <MyButton onClick={register}>Register</MyButton>
                <Link to={PATH.LOGIN}><MyButton>Log In</MyButton></Link>
            </div>
            <ErrorLoading error={error} isLoading={isLoading}/>
        </div>
    );
}

export default Registration;