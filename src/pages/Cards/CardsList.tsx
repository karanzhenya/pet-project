import React, {useEffect, useState} from 'react';
import MyInput from "../../common/Input/MyInput";
import s from "./CardsList.module.css";
import Pagination from "../../common/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../BLL/store";
import {CardsType, deleteCardTC, getCardsTC, setCurrentPageAC, setPageCountAC} from "./cards-reducer";
import Card from "./Card";
import {useParams} from "react-router-dom";
import MyButton from "../../common/Button/MyButton";
import ModalAddCard from "../../common/Modal/ModalAddCard";
import Preloader from "../../utils/Preloader";

export const CardsList = () => {
    const dispatch = useDispatch()
    const cards = useSelector<RootStateType, CardsType>(state => state.cards)
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)
    const {id} = useParams();
    const [active, setActive] = useState(false)

    useEffect(() => {
        dispatch(getCardsTC(id))
    }, [cards.page, cards.pageCount])

    const openModalWindow = () => {
        setActive(true)
    }
    const deleteCard = (id: string) => {
        dispatch(deleteCardTC(id, cards.cards[0].cardsPack_id))
    }

    const changeCurrentPage = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }
    const changePageCount = (pageCount: number) => {
        dispatch(setPageCountAC(pageCount))
    }
    if (isLoading) {
        return <Preloader/>
    }
    return <div className={s.cardList}>

        <div className={s.container}>
            <ModalAddCard active={active} setActive={setActive} cardsPack_id={cards.cards[0].cardsPack_id}/>
            <div className={s.top}><MyInput placeholder={'Search'} name={'search'}/>
                <MyButton onClick={openModalWindow}>Add</MyButton></div>
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
                                               id={cp._id}
                                               deleteCard={deleteCard}
                />)}

            </table>
            <Pagination pageCount={cards.pageCount}
                        currentPage={cards.page}
                        totalCount={cards.cardsTotalCount}
                        changePageCount={changePageCount}
                        changeCurrentPage={changeCurrentPage}
            />

        </div>
    </div>
}

export default CardsList;