import React, {ChangeEvent, useState} from 'react';
import './ModalStyle.css';
import MyInput from "../Input/MyInput";
import MyButton from "../Button/MyButton";
import Modal from "./Modal";
import {updatePackTC} from "../../packs/packs-reducer";
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
            {<div className='modalWindow'>
                <MyInput placeholder={'Enter name'} onChange={onChangeName}/>
                <MyButton onClick={updatePack}>Update</MyButton>
            </div>}</Modal>
    );
}

export default ModalUpdatePack;