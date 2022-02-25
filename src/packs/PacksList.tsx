import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {deletePackTC, getPacksTC, PacksType, setCurrentPageAC, setPageCountAC, setSearchValueAC} from "./packs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../BLL/store";
import s from './PacksList.module.css'
import MyButton from "../common/Button/MyButton";
import MyInput from "../common/Input/MyInput";
import Pagination from "../common/Pagination/Pagination";
import Pack from "./pack/Pack";
import Preloader from "../utils/Preloader";
import {Link, Navigate} from 'react-router-dom';
import ConfigurationPanel from "./ConfigurationPanel/ConfigurationPanel";
import {PATH} from "../pages/AllRoutes";
import debounce from "lodash.debounce";
import Modal from "../common/Modal/Modal";
import ModalAddPack from "../common/Modal/ModalAddPack";

export const PacksList = () => {
    const dispatch = useDispatch()
    const packs = useSelector<RootStateType, PacksType>(state => state.packs)
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)
    const isAuth = useSelector<RootStateType, boolean>(state => state.app.isAuth)
    const [activeAddPack, setActiveAddPack] = useState(false)
    const [activeDeletePack, setActiveDeletePack] = useState(false)

    useEffect(() => {
        dispatch(getPacksTC(''))
    }, [packs.page, packs.pageCount, packs.searchValue])

    const openModalWindow = () => {
        setActiveAddPack(true)
    }
    const deletePack = (id: string) => {
        dispatch(deletePackTC(id))
        setActiveDeletePack(true)
    }
    const changeCurrentPage = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }
    const changePageCount = (pageCount: number) => {
        dispatch(setPageCountAC(pageCount))
    }
    const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchValueAC(e.target.value))
    }
    const debouncedChangeHandler = useCallback(debounce(onChangeSearchValue, 400), [packs.searchValue]);

    if (isLoading) {
        return <Preloader/>
    }
    if (!isAuth) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div className={s.container}>
            <ModalAddPack active={activeAddPack} setActive={setActiveAddPack}/>
            <Modal active={activeDeletePack} setActive={setActiveDeletePack}>{'Pack removed'}</Modal>
            <ConfigurationPanel/>
            <div className={s.rightPart}>
                <h1>Packs list</h1>
                <Link to={`cards/62151fe2b6f5370004679574`}>
                    X
                </Link>
                <div className={s.rightTopPart}>
                    <MyInput name={'search'} onChange={debouncedChangeHandler}/>
                    <MyButton disabled={isLoading} onClick={openModalWindow}>Add new pack</MyButton>
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
                                                       user_id={cp.user_id}
                                                       id={cp._id}
                                                       isLoading={isLoading}
                                                       deletePack={deletePack}/>)}

                </table>
                <Pagination pageCount={packs.pageCount}
                            currentPage={packs.page}
                            totalCount={packs.cardPacksTotalCount}
                            changeCurrentPage={changeCurrentPage}
                            changePageCount={changePageCount}
                />
            </div>
        </div>

    );
}

export default PacksList;