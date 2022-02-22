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
import {Navigate} from 'react-router-dom';
import ConfigurationPanel from "./ConfigurationPanel/ConfigurationPanel";
import {PATH} from "../pages/AllRoutes";

export const PacksList = () => {
    const dispatch = useDispatch()
    const packs = useSelector<RootStateType, PacksType>(state => state.packs)
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)
    const isAuth = useSelector<RootStateType, boolean>(state => state.app.isAuth)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState(20)

    useEffect(() => {
        dispatch(getCardsTC(currentPage, pageCount))
    }, [currentPage, pageCount])

    if (isLoading) {
        return <Preloader/>
    }

    if (!isAuth) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div className={s.container}>
            <ConfigurationPanel/>
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