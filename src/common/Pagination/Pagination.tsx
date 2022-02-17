import React, {ChangeEvent, useState} from 'react';
import s from "./Pagination.module.css";
import {getCardsTC} from "../../packs/packs-reducer";
import {useDispatch} from "react-redux";

type PaginationPropsType = {
    pageCount: number
    cardPacksTotalCount: number
    setCurrentPage: (currentPage: number) => void
    setPageCount: (pageCount: number) => void
}


const Pagination = (props: PaginationPropsType) => {

    const dispatch = useDispatch()
    const [temporaryPageCount, setTemporaryPageCount] = useState<number>(props.pageCount)
    const [pageCount, setPageCount] = useState(props.pageCount)
    const getCurrentPagePacks = (chosenPage: number) => {
        props.setCurrentPage(chosenPage)
        dispatch(getCardsTC(chosenPage, props.pageCount))
    }
    let totalPacksPageCount = Math.ceil(props.cardPacksTotalCount / pageCount)
    let pages = []
    for (let i = 1; i <= totalPacksPageCount; i++) {
        pages.push(i)
    }
    const onChangePageCount = (e: ChangeEvent<HTMLInputElement>) => {
        setTemporaryPageCount(Number(e.currentTarget.value))
    }
    const changePageCount = () => {
        props.setPageCount(temporaryPageCount)
        setPageCount(temporaryPageCount)
    }
    return (
        <div className={s.pagination}>
            <div className={s.pages}>{pages ?
                pages.map(p => <span className={s.pageButton}
                                     onClick={() => getCurrentPagePacks(p)}>{p}</span>) : null}</div>
            <div>
                <input value={temporaryPageCount} onChange={onChangePageCount}/>
                <button onClick={changePageCount}>Change packs count on page</button>
            </div>
        </div>
    );
}

export default Pagination;