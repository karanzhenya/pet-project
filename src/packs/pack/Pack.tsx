import React from 'react';
import MyButton from "../../common/Button/MyButton";

type PackPropsType = {
    name: string
    cardsCount: number
    updated: string
    user_id: string
    id: string
    deletePack: (id: string) => void
}

const Pack = ({name, cardsCount, updated, user_id, id, deletePack}: PackPropsType) => {
    const handleDeletePack = () => {
        deletePack(id)
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
            <MyButton onClick={handleDeletePack}>Delete</MyButton>
        </>
    );
}

export default Pack;