import React from 'react';
import {useSelector} from "react-redux";
import {RootStateType} from "../BLL/store";
import {UserInitialStateType} from "./Login/login-reducer";
import {Navigate, useNavigate} from 'react-router-dom';

const Profile = () => {

    const userProfile = useSelector<RootStateType, UserInitialStateType>(state => state.login)

    if (userProfile._id === undefined) {
        return <Navigate to={'/login'}/>
    }
    return <h1>{userProfile.name}</h1>
}

export default Profile;