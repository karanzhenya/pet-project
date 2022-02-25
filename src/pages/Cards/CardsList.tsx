import React, {useEffect} from 'react';
import MyInput from "../../common/Input/MyInput";
import s from "./CardsList.module.css";
import Pagination from "../../common/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../BLL/store";
import {CardsType, getCardsTC, setCurrentPageAC, setPageCountAC} from "./cards-reducer";
import Card from "./Card";
import {useParams} from "react-router-dom";

export const CardsList = () => {

    const dispatch = useDispatch()
    const cards = useSelector<RootStateType, CardsType>(state => state.cards)
    const {id} = useParams();

    useEffect(() => {
        dispatch(getCardsTC(id))
    }, [cards.page, cards.pageCount])
    const changeCurrentPage = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }
    const changePageCount = (pageCount: number) => {
        dispatch(setPageCountAC(pageCount))
    }
    return <div className={s.container}>
        <MyInput placeholder={'Search'} name={'search'}/>
        <table className={s.table}>
            <tbody>
            <tr className={s.table_titles}>
                <th>Question</th>
                <th>Answer</th>
                <th>Last updated</th>
                <th>Grade</th>
            </tr>
            </tbody>
            {cards.cards.map((cp) => <Card key={cp._id}
                                           updated={cp.updated}
                                           question={cp.question}
                                           answer={cp.answer}
                                           grade={cp.grade}
            />)}

        </table>
        <Pagination pageCount={cards.pageCount}
                    currentPage={cards.page}
                    totalCount={cards.cardsTotalCount}
                    changePageCount={changePageCount}
                    changeCurrentPage={changeCurrentPage}
        />

    </div>
}

export default CardsList;