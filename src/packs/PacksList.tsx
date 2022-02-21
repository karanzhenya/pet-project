import React, {useEffect, useState} from 'react';
import {getCardsTC, PacksType} from "./packs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../BLL/store";
import s from './PacksList.module.css'
import MyButton from "../common/Button/MyButton";
import MyInput from "../common/Input/MyInput";
import Pagination from "../common/Pagination/Pagination";
import Pack from "./pack/Pack";
import Preloader from "../utils/Preloader";
import {isLoadingAC} from "../app/app-reducer";
import { Navigate } from 'react-router-dom';
import {UserInitialStateType} from "../pages/Login/login-reducer";

export const PacksList = () => {
    const dispatch = useDispatch()
    const packs = useSelector<RootStateType, PacksType>(state => state.packs)
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)
    const userProfile = useSelector<RootStateType, UserInitialStateType>(state => state.login)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState(20)

    useEffect(() => {
        dispatch(getCardsTC(currentPage, pageCount))
    }, [currentPage, pageCount])

    if (isLoading) {
        return <Preloader/>
    }

    if (userProfile.email === '') {
        return <Navigate to={'/login'}/>
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
                    <tbody className={s.table_titles}>
                    <tr>
                        <th>Name</th>
                        <th>Cards</th>
                        <th>Last updated</th>
                        <th>Created by</th>
                    </tr>
                    </tbody>
                    {packs.cardPacks.map((cp) => <Pack key={cp._id}
                                                       name={cp.name}
                                                       cardsCount={cp.cardsCount}
                                                       updated={cp.updated}
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