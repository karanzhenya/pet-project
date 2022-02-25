import React, {ChangeEvent, useState} from 'react';
import s from "../../packs/PacksList.module.css";
import MyInput from "../Input/MyInput";
import MyButton from "../Button/MyButton";
import Modal from "./Modal";
import {postPackTC} from "../../packs/packs-reducer";
import {useDispatch} from "react-redux";
import {postCardTC} from "../../pages/Cards/cards-reducer";

type ModalAddCardPropsType = {
    active: boolean
    setActive: (isActive: boolean) => void
    cardsPack_id: string
}

function ModalAddCard({active, setActive, cardsPack_id}: ModalAddCardPropsType) {
    const dispatch = useDispatch()
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const addNewPack = () => {
        dispatch(postCardTC({cardsPack_id, question, answer}))
        setActive(false)
    }
    return (
        <Modal active={active} setActive={setActive}>
            {<div className={s.modalWindow}>
                <MyInput placeholder={'Enter question'} onChange={onChangeQuestion}/>
                <MyInput placeholder={'Enter answer'} onChange={onChangeAnswer}/>
                <MyButton onClick={addNewPack}>Add</MyButton>
            </div>}
        </Modal>
    );
}

export default ModalAddCard;