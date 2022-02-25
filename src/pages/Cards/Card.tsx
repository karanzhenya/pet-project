import React from 'react';
import s from './CardsList.module.css'

type CardPropsType = {
    question: string
    answer: string
    updated: string
    grade: number
    id: string
    deleteCard: (id: string) => void
}

const Card = ({updated, question, answer, grade, id, deleteCard}: CardPropsType) => {

    const deleteCardHandler = () => {
        deleteCard(id)
    }

    return (
        <>
            <tbody>
            <tr className={s.card}>
                <td>{question}</td>
                <td>{answer}</td>
                <td>{updated}</td>
                <td>{grade}</td>
            </tr>
            </tbody>
            <button onClick={deleteCardHandler}>x</button>
        </>
    );
}

export default Card;