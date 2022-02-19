import React from 'react';
import s from './Pack.module.css'

type PackPropsType = {
    name: string
    cardsCount: number
    updated: Date
    user_id: string
}

const Pack = ({name, cardsCount, updated, user_id}: PackPropsType) => {
    return (
        <>
            <tr>
                <td>{name}</td>
                <td>{cardsCount}</td>
                <td>{updated}</td>
                <td>{user_id}</td>
            </tr>
            <hr className={s.line}/>
        </>
    );
}

export default Pack;