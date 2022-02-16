import React, {useEffect} from 'react';
import AllRoutes from "../pages/AllRoutes";
import Header from "../pages/Header/Header";
import {useDispatch} from "react-redux";
import {authMeTC} from "./app-reducer";

const App = () => {
    const dispatch = useDispatch();
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
