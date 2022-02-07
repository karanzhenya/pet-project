import React from 'react'
import page404 from '../files/page404.jpg'
import {Link} from "react-router-dom";
import {PATH} from "../AllRoutes";
import s from "./Page404.module.css"

const Page404 = () => {
    return (
        <div className={s.errorPage}>
            <Link to={PATH.LOGIN}><h3 className={s.back}>Вернуть на главную</h3></Link>
            <h1 className={s.text}>Page 404: Not found!</h1>
            <img alt={'error'} className={s.image} src={page404}/>
        </div>
    )
}

export default Page404;