import React, {useState} from 'react';
import s from "../Login/Login.module.css";
import MyInput from "../../common/Input/MyInput";
import MyButton from "../../common/Button/MyButton";
import loading from "../files/Шторм.gif";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../BLL/store";
import {registerTC} from "../Registration/register-reducer";
import {Link, Navigate} from "react-router-dom";

const Registration = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch();
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)
    const error = useSelector<RootStateType, string | null>(state => state.register.isError)
    const isAuth = useSelector<RootStateType, boolean>(state => state.app.isAuthorized)

    const register = () => {
        dispatch(registerTC(email, password))
    }
    const handleEmail = (email: string) => {
        setEmail(email.trim())
    }
    const handlePassword = (password: string) => {
        setPassword(password.trim())
    }
    if (isAuth) {
        return <Navigate to='/profile'/>
    }
    return (
        <div className={s.container}>
            <div className={s.register}>
                <MyInput placeholder='email' onChangeText={handleEmail}/>
                <MyInput type='password' placeholder='password' onChangeText={handlePassword}/>
                <div>
                    <MyButton onClick={register}>Register</MyButton>
                    <Link to={'/login'}><MyButton>Log In</MyButton></Link>
                </div>
            </div>
            <h1 style={{color: 'red'}}>{error && error}</h1>
            <div className={s.loading}>{isLoading && <img alt={''} src={loading}/>}</div>
        </div>
    );
}

export default Registration;