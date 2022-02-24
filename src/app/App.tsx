import React, {useEffect} from 'react';
import AllRoutes from "../pages/AllRoutes";
import Header from "../pages/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../BLL/store";
import Preloader from "../utils/Preloader";
import {authMeTC} from "../pages/Login/login-reducer";
import {HashRouter} from "react-router-dom";

const App = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)

    useEffect(() => {
        dispatch(authMeTC())
    }, [])
    if (isLoading) {
        return <Preloader/>
    }
    return (
        <>
            <HashRouter>
                <Header/>
                <AllRoutes/>
            </HashRouter>

        </>
    );
}

export default App;
