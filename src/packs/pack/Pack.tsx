import React from 'react';
import MyButton from "../../common/Button/MyButton";

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

    const handleDeletePack = () => {
        deletePack(id)
    }
    const handleUpdatePack = () => {
        updatePack(id)
    }
    return (
        <>
            <tbody>
            <tr>
                <td>{name}</td>
                <td>{cardsCount}</td>
                <td>{updated}</td>
                <td>{user_id}</td>
            </tr>
            </tbody>
            <MyButton disabled={isLoading} style={{width: "20"}} red onClick={handleDeletePack}>X</MyButton>
            <MyButton disabled={isLoading} onClick={handleUpdatePack}>Update</MyButton>
        </>
    );
}

export default Pack;