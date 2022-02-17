import React, {ChangeEvent, useState} from 'react';
import s from "./Pagination.module.css";

type PaginationPropsType = {
    pageCount: number
    cardPacksTotalCount: number
    currentPage: number
    setCurrentPage: (currentPage: number) => void
    setPageCount: (pageCount: number) => void
}


const Pagination = (props: PaginationPropsType) => {

    const [pageCount, setPageCount] = useState<number>(props.pageCount)
    const pageCountValues = [5, 10, 20, 50]

    //create array of pages
    let totalPacksPageCount = Math.ceil(props.cardPacksTotalCount / pageCount)
    let pages = []
    for (let i = 1; i <= totalPacksPageCount; i++) {
        pages.push(i)
    }
    //set current page in local state and get packs of current page
    const getCurrentPagePacks = (currentPage: number) => {
        props.setCurrentPage(currentPage)
    }

    // get pages within bounds
    const pagesPortion = pages.filter(p => p >= props.currentPage - 5 && p <= props.currentPage + 5)
    // get pages for rendering
    const pagesList = pages && pagesPortion.map(p => <span
        className={props.currentPage === p ? s.currentPageButton : s.pageButton}
        onClick={() => getCurrentPagePacks(p)}>{p}</span>)
    // decrease current page by one less
    const prevPage = () => {
        if (props.currentPage > 1) {
            props.setCurrentPage(props.currentPage - 1)
        }
    }
    const firstPage = () => {
        props.setCurrentPage(1)
    }
    // increase current page by one more
    const nextPage = () => {
        if (totalPacksPageCount > props.currentPage) {
            props.setCurrentPage(props.currentPage + 1)
        }
    }
    const lastPage = () => {
        props.setCurrentPage(totalPacksPageCount)
    }
    // select current page in <select>
    const changeCurrentPage = (e: ChangeEvent<HTMLSelectElement>) => {
        props.setCurrentPage(Number(e.currentTarget.value))
    }
    //select page count in <select>
    const onChangePageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        props.setCurrentPage(1)
        props.setPageCount(Number(e.currentTarget.value))
        setPageCount(Number(e.currentTarget.value))
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
                        {pages.map(p => <option value={p}>{p}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <select style={{width: "40", marginTop: "10px"}} value={pageCount}
                        onChange={onChangePageCount}>
                    {pageCountValues.map(v => <option value={v}>{v}</option>)}
                </select>
            </div>
        </div>
    );
}

export default Pagination;