import React from 'react';
import s from "../../pages/Login/Login.module.css";
import loading from "../../files/Шторм.gif";

type ErrorLoadingPropsType = {
    error: string | null
    isLoading: boolean
}

const ErrorLoading = ({error, isLoading}: ErrorLoadingPropsType) => {
    return (
        <>
            <h1 style={{color: 'red'}}>{error && error}</h1>
            <div className={s.loading}>{isLoading && <img alt={''} src={loading}/>}</div>
        </>
    );
}

export default ErrorLoading;