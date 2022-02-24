import React, {ChangeEvent, useCallback, useEffect} from 'react';
import {deletePackTC, getPacksTC, PacksType, postPackTC, setSearchValueAC, updatePackTC} from "./packs-reducer";
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
import debounce from "lodash.debounce";

export const PacksList = () => {
    const dispatch = useDispatch()
    const packs = useSelector<RootStateType, PacksType>(state => state.packs)
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)
    const isAuth = useSelector<RootStateType, boolean>(state => state.app.isAuth)
    const searchValue = useSelector<RootStateType, string>(state => state.packs.searchValue)
    const currentPage = useSelector<RootStateType, number>(state => state.packs.page)
    const pageCount = useSelector<RootStateType, number>(state => state.packs.pageCount)

    useEffect(() => {
        dispatch(getPacksTC())
    }, [currentPage, pageCount, searchValue])

    const addNewPack = () => {
        const name = 'zhenya'
        dispatch(postPackTC({name}))
    }
    const deletePack = (id: string) => {
        dispatch(deletePackTC(id))
    }
    const updatePack = (id: string) => {
        const cardsPack = {
            name: 'not zhenya now',
            _id: id
        }
        dispatch(updatePackTC(cardsPack))
    }

    const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchValueAC(e.target.value))
    }
    const debouncedChangeHandler = useCallback(debounce(onChangeSearchValue, 400), []);

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
                    <MyInput name={'search'} onChange={debouncedChangeHandler}/>{searchValue}
                    <MyButton disabled={isLoading} onClick={addNewPack}>Add new pack</MyButton>
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
                                                       updatePack={updatePack}
                                                       deletePack={deletePack}/>)}

                </table>
                <Pagination pageCount={pageCount}
                            currentPage={currentPage}
                            cardPacksTotalCount={packs.cardPacksTotalCount}
                />
            </div>
        </div>

    );
}

export default PacksList;