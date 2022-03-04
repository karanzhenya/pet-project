import React from 'react';
import s from './CardsList.module.scss'
import TableCell from '@mui/material/TableCell';

type CardPropsType = {
    question: string
    answer: string
    updated: string
    grade: number
    id: string
    cardsPack_id: string
    deleteCard: (id: string) => void
    openUpdateModalWindow: (id: string) => void
}

const Card = ({updated, question, answer, grade, id, deleteCard, openUpdateModalWindow}: CardPropsType) => {

    const deleteCardHandler = () => {
        deleteCard(id)
    }

    const updateCardHandler = () => {
        openUpdateModalWindow(id)
    }

    return (
        <>
            <tbody>
            <tr className={s.card}>
                <TableCell align={"right"}>{question}</TableCell>
                <TableCell align={"right"}>{answer}</TableCell>
                <TableCell align={"right"}>{updated}</TableCell>
                <TableCell align={"right"}>{grade}</TableCell>
            </tr>
            </tbody>
            <button onClick={deleteCardHandler}>x</button>
            <button onClick={updateCardHandler}>Edit</button>
        </>
    );
}

export default Card;