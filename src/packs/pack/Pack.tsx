import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../BLL/store";
import s from '../PacksList.module.scss'
import {setCardsPackIdAC} from "../../pages/Cards/cards-reducer";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";

type PackPropsType = {
    name: string
    cardsCount: number
    updated: string
    user_id: string
    id: string
    isLoading: boolean
    deletePack: (id: string) => void
    getPackId: (id: string) => void
}

const Pack = ({name, cardsCount, updated, user_id, id, isLoading, deletePack, getPackId}: PackPropsType) => {

    const dispatch = useDispatch()
    const myId = useSelector<RootStateType, string>(state => state.login._id)

    const onClickLinkHandler = (packId: string) => {
        dispatch(setCardsPackIdAC(packId))
    }

    const handleDeletePack = () => {
        deletePack(id)
    }
    return (
        <>
            <tr>
                <Link to={`cards/${id}`} onClick={() => onClickLinkHandler(id)}>
                    <TableCell align={"center"}>{name}</TableCell>
                </Link>
                {myId === user_id && <><Button size={"small"} variant={"outlined"} color={"error"} disabled={isLoading}
                                               style={{width: "20"}}
                                               onClick={handleDeletePack}>X</Button>
                    <Button variant={"outlined"} size={"small"} onClick={() => getPackId(id)}>Update</Button></>}
                <TableCell align={"center"}>{cardsCount}</TableCell>
                <TableCell align={"center"}>{updated}</TableCell>
                <TableCell align={"center"}>{user_id}</TableCell>
            </tr>
        </>
    );
}

export default Pack;