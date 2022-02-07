import React from 'react'
import {Link} from 'react-router-dom'
import {PATH} from "../AllRoutes";
import s from "./Header.module.css";
import arrow from "../files/arrow.png"


function Header() {
    const classLink = `${s.link} ${s.activeClassLink}`
    return (
        <div className={s.header}>
            <ul>
                <li className={classLink}><Link to={PATH.LOGIN}>Login</Link></li>
                <li className={classLink}><Link to={PATH.REGISTRATION}>Registration</Link></li>
                <li className={classLink}><Link to={PATH.PROFILE}>Profile</Link></li>
                <li className={classLink}><Link to={PATH.COMMON}>Common</Link></li>
            </ul>
            <img alt={''} src={arrow}/>
        </div>
    )
}

export default Header
