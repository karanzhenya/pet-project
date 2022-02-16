import React, {useEffect, useState} from 'react';
import MyInput from "../../common/Input/MyInput";
import MyButton from "../../common/Button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import s from "./ForgotPassword.module.css"
import {RootStateType} from "../../BLL/store";
import loading from "../files/Шторм.gif"
import {Link} from "react-router-dom";
import {forgotPasswordTC} from "./forgot-password-reducer";
import {PATH} from "../AllRoutes";
import {SetErrorAC} from "../../app/app-reducer";

const ForgotPassword = () => {

    const [email, setEmail] = useState<string>('')
    const dispatch = useDispatch();
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)
    const error = useSelector<RootStateType, string | null>(state => state.app.error)
    const info = useSelector<RootStateType, string | undefined>(state => state.forgot.info)
    console.log(info)
    const sentPassword = () => {
        dispatch(forgotPasswordTC(email))
        setEmail('')
    }
    const handleEmail = (email: string) => {
        setEmail(email.trim())
    }
    useEffect(() => {
        dispatch(SetErrorAC(''))
    }, [])
    return (
        <div className={s.container}>
            <div className={s.forgot}>
                <MyInput placeholder='email' onChangeText={handleEmail}/>
                <div>
                    <MyButton onClick={sentPassword}>Sent</MyButton>
                    <Link to={PATH.REGISTRATION}><MyButton>Register</MyButton></Link>
                </div>
            </div>
            <h1 style={{color: 'red'}}>{error && error}</h1>
            <h1>{info && "password has been sent to your email"}</h1>
            <div className={s.loading}>{isLoading && <img alt={''} src={loading}/>}</div>
        </div>
    );
}

export default ForgotPassword;