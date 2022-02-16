import React, {useEffect, useState} from 'react';
import MyInput from "../../common/Input/MyInput";
import MyButton from "../../common/Button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import s from "./NewPassword.module.css"
import {RootStateType} from "../../BLL/store";
import loading from "../../files/Шторм.gif"
import {Link, useParams} from "react-router-dom";
import {PATH} from "../AllRoutes";
import {setErrorAC} from "../../app/app-reducer";

const NewPassword = () => {

    const [newPassword, setNewPassword] = useState<string>('')
    const dispatch = useDispatch();
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)
    const error = useSelector<RootStateType, string | null>(state => state.app.error)
    const info = useSelector<RootStateType, string | undefined>(state => state.forgot.info)
    useEffect(() => {
        dispatch(setErrorAC(''))
    }, [])
    const sentPassword = () => {
        /*dispatch(setNewPasswordTC(newPassword))*/
        setNewPassword('')
    }
    const handleNewPassword = (newPassword: string) => {
        setNewPassword(newPassword.trim())
    }

    const {token} = useParams<'token'>();
    console.log(token)
    return (
        <div className={s.container}>
            <div className={s.forgot}>
                <MyInput placeholder='new password' onChangeText={handleNewPassword}/>
                <div>
                    <MyButton onClick={sentPassword}>Change</MyButton>
                    <Link to={PATH.LOGIN}><MyButton>Login</MyButton></Link>
                </div>
            </div>
            <h1 style={{color: 'red'}}>{error && error}</h1>
            <h1>{info && "password changed"}</h1>
            <div className={s.loading}>{isLoading && <img alt={''} src={loading}/>}</div>
        </div>
    );
}

export default NewPassword;