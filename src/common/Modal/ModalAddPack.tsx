import React, {ChangeEvent, useState} from 'react';
import './ModalStyle.css';
import MyInput from "../Input/MyInput";
import MyButton from "../Button/MyButton";
import Modal from "./Modal";
import {postPackTC} from "../../packs/packs-reducer";
import {useDispatch} from "react-redux";

type ModalAddPackPropsType = {
    active: boolean
    setActive: (isActive: boolean) => void
}

function ModalAddPack({active, setActive}: ModalAddPackPropsType) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const addNewPack = () => {
        dispatch(postPackTC({name}))
        setActive(false)
    }
    return (
        <Modal active={active} setActive={setActive}>
            {<div className='modalWindow'>
                <MyInput placeholder={'Enter name'} onChange={onChangeName}/>
                <MyButton onClick={addNewPack}>Add</MyButton>
            </div>}</Modal>
    );
}

export default ModalAddPack;