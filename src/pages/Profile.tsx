import React from 'react';
import {useSelector} from "react-redux";
import {RootStateType} from "../BLL/store";
import {UserInitialStateType} from "./Login/login-reducer";
import {Navigate} from 'react-router-dom';

const Profile = () => {

    const userProfile = useSelector<RootStateType, UserInitialStateType>(state => state.login)


    if (!userProfile.email) {
        return <Navigate to={'/login'} replace/>
    }
    return (
        <div>
            <h1>{userProfile.name}</h1>
        </div>)
}

export default Profile;