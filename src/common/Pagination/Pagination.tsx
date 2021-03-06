import React, {ChangeEvent} from 'react';
import s from "./Pagination.module.css";
import {useDispatch} from "react-redux";
import {setCurrentPageAC} from "../../pages/packs/packs-reducer";

type PaginationPropsType = {
    pageCount: number
    totalCount: number
    currentPage: number
    changeCurrentPage: (page: number) => void
    changePageCount: (pageCount: number) => void
}


const Pagination = (props: PaginationPropsType) => {
    const dispatch = useDispatch()
    const pageCountValues = [5, 10, 20, 50]

    //create array of pages
    let totalPacksPageCount = Math.ceil(props.totalCount / props.pageCount)
    let pages = []
    for (let i = 1; i <= totalPacksPageCount; i++) {
        pages.push(i)
    }
    //set current page in local state and get packs of current page
    const getCurrentPagePacks = (currentPage: number) => {
        props.changeCurrentPage(currentPage)
    }

    // get pages within bounds
    const pagesPortion = pages.filter(p => p >= props.currentPage - 5 && p <= props.currentPage + 5)
    // get pages for rendering
    const pagesList = pages && pagesPortion.map(p => <span key={p.toString()}
                                                           className={props.currentPage === p ? s.currentPageButton : s.pageButton}
                                                           onClick={() => getCurrentPagePacks(p)}>{p}</span>)
    // decrease current page by one less
    const prevPage = () => {
        if (props.currentPage > 1) {
            props.changeCurrentPage(props.currentPage - 1)
        }
    }
    const firstPage = () => {
        dispatch(setCurrentPageAC(1))
    }
    // increase current page by one more
    const nextPage = () => {
        if (totalPacksPageCount > props.currentPage) {
            props.changeCurrentPage(props.currentPage + 1)
        }
    }
    const lastPage = () => {
        props.changeCurrentPage(totalPacksPageCount)
    }
    // select current page in <select>
    const changeCurrentPage = (e: ChangeEvent<HTMLSelectElement>) => {
        props.changeCurrentPage(Number(e.currentTarget.value))
    }
    //select page count in <select>
    const onChangePageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        props.changeCurrentPage(1)
        props.changePageCount(Number(e.currentTarget.value))
    }
    return (
        <div className={s.pagination}>
            <div className={s.pages}>
                <span onClick={firstPage}>{'<<'}</span>
                <span onClick={prevPage}>{'<'}</span>
                {pagesList}
                <span onClick={nextPage}>{'>'}</span>
                <span onClick={lastPage}>{'>>'}</span>
                <div className={s.select}>
                    <select value={props.currentPage}
                            onChange={changeCurrentPage}>
                        {pages.map(p => <option key={p.toString()} value={p}>{p}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <select style={{width: "40", marginTop: "10px"}} value={props.pageCount}
                        onChange={onChangePageCount}>
                    {pageCountValues.map(v => <option key={v.toString()} value={v}>{v}</option>)}
                </select>
            </div>
        </div>
    );
}

export default Pagination;