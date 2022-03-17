import React, {useState} from 'react';
import MyButton from "../../../common/Button/MyButton";
import {getPacksTC} from "../packs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../BLL/store";

const ConfigurationPanel = () => {
    const dispatch = useDispatch()
    const _id = useSelector<RootStateType, string>(state => state.login._id)
    const [checkedMy, setCheckedMy] = useState(false)
    const [checkedAll, setCheckedAll] = useState(true)

    const showMyPacks = () => {
        setCheckedMy(true)
        setCheckedAll(false)
        dispatch(getPacksTC(_id))
    }
    const showAllPacks = () => {
        setCheckedAll(true)
        setCheckedMy(false)
        dispatch(getPacksTC(''))
    }
    return (
        <div>
            <MyButton red={checkedMy} onClick={showMyPacks}>My Cards</MyButton>
            <MyButton red={checkedAll} onClick={showAllPacks}>All Cards</MyButton>
        </div>
    );
}

export default ConfigurationPanel;