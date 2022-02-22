import React from 'react'
import {Link} from 'react-router-dom'
import {PATH} from "../AllRoutes";
import s from "./Header.module.css";
import arrow from "../../files/arrow.png"
import MyButton from "../../common/Button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../BLL/store";
import {loginAC, UserInitialStateType} from "../Login/login-reducer";
import {isAuthAC} from "../../app/app-reducer";


const Header = () => {
    const isAuth = useSelector<RootStateType, boolean>(state => state.app.isAuth)

    const dispatch = useDispatch()
    const handleLogOut = () => {
        dispatch(isAuthAC(false))
        dispatch(loginAC({} as UserInitialStateType))
    }

    const classLink = `${s.link} ${s.activeClassLink}`
    return (
        <div className={s.header}>
            <ul>
                <li className={classLink}><Link to={PATH.LOGIN}>Login</Link></li>
                <li className={classLink}><Link to={PATH.REGISTRATION}>Registration</Link></li>
                <li className={classLink}><Link to={PATH.PROFILE}>Profile</Link></li>
                <li className={classLink}><Link to={PATH.PACKS}>Packs</Link></li>
                <li className={classLink}><Link to={PATH.COMMON}>Common</Link></li>
            </ul>
            <img alt={''} src={arrow}/>
            {isAuth && <MyButton red onClick={handleLogOut}>LogOut</MyButton>}
        </div>
    )
}

export default Header
