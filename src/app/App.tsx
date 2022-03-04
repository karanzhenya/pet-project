import React, {useEffect} from 'react';
import AllRoutes from "../pages/AllRoutes";
import Header from "../pages/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../BLL/store";
import Preloader from "../utils/Preloader";
import {authMeTC} from "../pages/Login/login-reducer";
import {HashRouter} from "react-router-dom";
import {setErrorAC} from "./app-reducer";


const App = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)

    useEffect(() => {
        dispatch(authMeTC())
        dispatch(setErrorAC(''))
    }, [])
    if (isLoading) {
        return <Preloader/>
    }
    return (
        <div style={{width: "100%", height: "100%"}}>
            <HashRouter>
                <Header/>
                <AllRoutes/>
            </HashRouter>
        </div>
    );
}

export default App;
