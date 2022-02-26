import React, {ChangeEvent, useState} from 'react';
import s from "../../packs/PacksList.module.css";
import MyInput from "../Input/MyInput";
import MyButton from "../Button/MyButton";
import Modal from "./Modal";
import {useDispatch} from "react-redux";
import {updateCardTC} from "../../pages/Cards/cards-reducer";

type ModalAddCardPropsType = {
    active: boolean
    setActive: (isActive: boolean) => void
    id?: string
}

function ModalUpdateCard({active, setActive, id}: ModalAddCardPropsType) {
    const dispatch = useDispatch()
    const [question, setQuestion] = useState('')

    const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const updateCard = () => {
        if (id) {
            dispatch(updateCardTC({_id: id, question}))
            setActive(false)
        }
    }
    return (
        <Modal active={active} setActive={setActive}>
            {<div className={s.modalWindow}>
                <MyInput placeholder={'Enter question'} onChange={onChangeQuestion}/>
                <MyButton onClick={updateCard}>Update</MyButton>
            </div>}
        </Modal>
    );
}

export default ModalUpdateCard;