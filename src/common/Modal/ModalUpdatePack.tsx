import React, {ChangeEvent, useState} from 'react';
import s from "../../packs/PacksList.module.css";
import MyInput from "../Input/MyInput";
import MyButton from "../Button/MyButton";
import Modal from "./Modal";
import {postPackTC, updatePackTC} from "../../packs/packs-reducer";
import {useDispatch} from "react-redux";

type ModalUpdatePropsType = {
    active: boolean
    setActive: (isActive: boolean) => void
    id: string
}

function ModalUpdatePack({active, setActive, id}: ModalUpdatePropsType) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const updatePack = () => {
        const cardsPack = {
            name,
            _id: id
        }
        dispatch(updatePackTC(cardsPack))
        setActive(false)
    }
    return (
        <Modal active={active} setActive={setActive}>
            {<div className={s.modalWindow}>
                <MyInput placeholder={'Enter name'} onChange={onChangeName}/>
                <MyButton onClick={updatePack}>Add</MyButton>
            </div>}</Modal>
    );
}

export default ModalUpdatePack;