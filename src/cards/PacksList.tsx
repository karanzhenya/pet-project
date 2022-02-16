import React, {useEffect} from 'react';
import {getCardsTC, PacksType} from "./packs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../BLL/store";
import s from './PacksList.module.css'
import MyButton from "../common/Button/MyButton";
import MyInput from "../common/Input/MyInput";

export const PacksList = () => {
    const dispatch = useDispatch()
    const packs = useSelector<RootStateType, PacksType>(state => state.packs)
    useEffect(() => {
        dispatch(getCardsTC())
    }, [])


    let totalPacksCount = packs.cardPacksTotalCount
    console.log(totalPacksCount)
    let pageCount = packs.pageCount
    console.log(pageCount)
    let pages = []
    for (let i = 1; i <= totalPacksCount/pageCount; i++) {
        pages.push(i)
    }
    return (
        <div className={s.container}>
            <div className={s.leftPart}>
                Show packs cards
                <div className={s.buttonContainer}><MyButton>My</MyButton><MyButton>All</MyButton></div>
                Number of cards
                <input type={"range"}/>
            </div>
            <div className={s.rightPart}>
                <h1>Packs list</h1>
                <div className={s.rightTopPart}>
                    <MyInput/>
                    <MyButton>Add new pack</MyButton>
                </div>
                <div className={s.tables}>
                    <div className={s.names}><h3>Name</h3>
                        {packs.cardPacks.map(p => <p key={p._id}>{p.name}</p>)}</div>
                    <div className={s.names}><h3>Cards</h3>
                        {packs.cardPacks.map(p => <p key={p._id}>{p.cardsCount}</p>)}</div>
                    <div className={s.names}><h3>Last updated</h3>
                        {packs.cardPacks.map(p => <p key={p._id}>{p.updated}</p>)}</div>
                    <div className={s.names}><h3>Created by</h3>
                        {packs.cardPacks.map(p => <p key={p._id}>{p.user_id}</p>)}</div>
                </div>
                <div className={s.pagination}>{pages.map(p => <button>{p}</button>)}</div>
            </div>
        </div>

    );
}

export default PacksList;