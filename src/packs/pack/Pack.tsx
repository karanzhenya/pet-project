import React from 'react';
import MyButton from "../../common/Button/MyButton";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStateType} from "../../BLL/store";
import s from '../PacksList.module.css'

type PackPropsType = {
    name: string
    cardsCount: number
    updated: string
    user_id: string
    id: string
    isLoading: boolean
    deletePack: (id: string) => void
    updatePack: (id: string) => void
}

const Pack = ({name, cardsCount, updated, user_id, id, isLoading, updatePack, deletePack}: PackPropsType) => {

    const myId = useSelector<RootStateType, string>(state => state.login._id)

    const handleDeletePack = () => {
        deletePack(id)
    }
    const handleUpdatePack = () => {
        updatePack(id)
    }
    return (
        <>
            <tbody>
            <tr className={s.description}>
                <Link to={`cards/${id}`}><td>{name}</td></Link>
                <td>{cardsCount}</td>
                <td>{updated}</td>
                <td>{user_id}</td>
            </tr>
            </tbody>
            <div>{myId === user_id && <div><button disabled={isLoading} style={{width: "20"}} onClick={handleDeletePack}>X</button>
                <button disabled={isLoading} onClick={handleUpdatePack}>Update</button></div>}</div>

        </>
    );
}

export default Pack;