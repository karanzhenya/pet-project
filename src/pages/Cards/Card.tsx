import React, {useState} from 'react';
import s from './CardsList.module.css'
import ModalUpdateCard from "../../common/Modal/ModalUpdateCard";

type CardPropsType = {
    question: string
    answer: string
    updated: string
    grade: number
    id: string
    cardsPack_id: string
    deleteCard: (id: string) => void
}

const Card = ({updated, question, answer, grade, id, deleteCard}: CardPropsType) => {

    const [activeUpdateCard, setActiveUpdateCard] = useState(false)
    const openModalWindow = () => {
        setActiveUpdateCard(true)
    }
    const deleteCardHandler = () => {
        deleteCard(id)
    }

    return (
        <>
            <ModalUpdateCard active={activeUpdateCard} setActive={setActiveUpdateCard} id={id}/>
            <tbody>
            <tr className={s.card}>
                <td>{question}</td>
                <td>{answer}</td>
                <td>{updated}</td>
                <td>{grade}</td>
            </tr>
            </tbody>
            <button onClick={deleteCardHandler}>x</button>
            <button onClick={openModalWindow}>Edit</button>
        </>
    );
}

export default Card;