import React, {useEffect} from 'react';
import AllRoutes from "../pages/AllRoutes";
import Header from "../pages/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../BLL/store";
import {authMeTC} from "./app-reducer";

const App = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector<RootStateType, boolean>(state => state.app.isAuthorized)
    useEffect(() => {
        dispatch(authMeTC())
    }, [])
    return (
        <>
            <Header/>
            <AllRoutes/>
        </>
    );
}

export default App;
