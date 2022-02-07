import React, {useEffect} from 'react';
import AllRoutes from "../pages/AllRoutes";
import Header from "../pages/Header/Header";
import {authMeTC} from "./app-reducer";
import {useDispatch} from "react-redux";

const App = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(authMeTC())
    }, []);
    return (
        <>
            <Header/>
            <AllRoutes/>
        </>
    );
}

export default App;
