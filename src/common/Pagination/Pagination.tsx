import React, {useState} from 'react';
import s from "../../packs/PacksList.module.css";
import {getCardsTC} from "../../packs/packs-reducer";
import {useDispatch} from "react-redux";

type PaginationPropsType = {
    pageCount: number
    cardPacksTotalCount: number
    setCurrentPage: (currentPage: number) => void
}


const Pagination = (props: PaginationPropsType) => {

    const dispatch = useDispatch()
    const [pageCount, setPageCount] = useState<number>(props.pageCount)
    const getCurrentPagePacks = (chosenPage: number) => {
        props.setCurrentPage(chosenPage)
        dispatch(getCardsTC(chosenPage, 10))
    }
    let totalPacksPageCount = Math.ceil(props.cardPacksTotalCount/pageCount)
    let pages = []
    for (let i = 1; i <= totalPacksPageCount; i++) {
        pages.push(i)
    }
    debugger
    return (
        <div className={s.pagination}>
            {pages.map(p => <button onClick={() => getCurrentPagePacks(p)}>{p}</button>)}
        </div>
    );
}

export default Pagination;