import React, {useEffect, useState} from 'react';
import {getCardsTC, PacksType} from "./packs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../BLL/store";
import s from './PacksList.module.css'
import MyButton from "../common/Button/MyButton";
import MyInput from "../common/Input/MyInput";
import {PATH} from "../pages/AllRoutes";
import {Navigate} from 'react-router-dom';
import Pagination from "../common/Pagination/Pagination";
import Pack from "./pack/Pack";

export const PacksList = () => {
    const dispatch = useDispatch()
    const packs = useSelector<RootStateType, PacksType>(state => state.packs)
    const isAuth = useSelector<RootStateType, boolean>(state => state.app.isAuthorized)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState(20)


    useEffect(() => {
        dispatch(getCardsTC(currentPage, pageCount))
    }, [currentPage, pageCount])

    if (!isAuth) {
        return <Navigate to={PATH.LOGIN}/>
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
                <table className={s.table}>
                    <tr className={s.table_titles}>
                        <th>Name</th>
                        <th>Cards</th>
                        <th>Last updated</th>
                        <th>Created by</th>
                    </tr>
                    {packs.cardPacks.map((cp) => <Pack name={cp.name} cardsCount={cp.cardsCount} updated={cp.updated}
                                                       user_id={cp.user_id}/>)}

                </table>
                <Pagination pageCount={pageCount}
                            currentPage={currentPage}
                            setPageCount={setPageCount}
                            cardPacksTotalCount={packs.cardPacksTotalCount}
                            setCurrentPage={setCurrentPage}
                />
            </div>
        </div>

    );
}

export default PacksList;