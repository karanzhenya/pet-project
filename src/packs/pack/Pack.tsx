import React from 'react';
import s from './Pack.module.css'

type PackPropsType = {
    name: string
    cardsCount: number
    updated: string
    user_id: string
}

const Pack = ({name, cardsCount, updated, user_id}: PackPropsType) => {
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
        </>
    );
}

export default Pack;