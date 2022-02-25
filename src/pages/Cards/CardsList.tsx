import React, {useEffect, useState} from 'react';
import MyInput from "../../common/Input/MyInput";
import s from "./CardsList.module.css";
import Pagination from "../../common/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../BLL/store";
import {CardsType, deleteCardTC, getCardsTC, setCurrentPageAC, setPageCountAC} from "./cards-reducer";
import Card from "./Card";
import {useParams} from "react-router-dom";
import Modal from "../../common/Modal/Modal";
import ModalAddCard from "../../common/Modal/ModalAddCard";
import MyButton from "../../common/Button/MyButton";

export const CardsList = () => {

    const dispatch = useDispatch()
    const cards = useSelector<RootStateType, CardsType>(state => state.cards)
    const {id} = useParams();
    const [activeDeleteCard, setActiveDeleteCard] = useState(false)
    const [activeAddCard, setActiveAddCard] = useState(false)

    useEffect(() => {
        dispatch(getCardsTC(id))
    }, [cards.page, cards.pageCount])

    const openModalWindow = () => {
        setActiveAddCard(true)
    }
    const changeCurrentPage = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }
    const changePageCount = (pageCount: number) => {
        dispatch(setPageCountAC(pageCount))
    }
    const deleteCard = (id: string) => {
        setActiveDeleteCard(true)
        dispatch(deleteCardTC(id, cards.cards[0].cardsPack_id))
    }
    return <div className={s.container}>
        <ModalAddCard active={activeAddCard} setActive={setActiveAddCard} cardsPack_id={cards.cards[0].cardsPack_id}/>
        <Modal active={activeDeleteCard} setActive={setActiveDeleteCard}>{'Card removed'}</Modal>
        <MyInput placeholder={'Search'} name={'search'}/>
        <MyButton onClick={openModalWindow}>Add</MyButton>
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
}

export default CardsList;