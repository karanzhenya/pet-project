import React, {useEffect, useState} from 'react';
import MyInput from "../../common/Input/MyInput";
import s from "./CardsList.module.scss";
import Pagination from "../../common/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../BLL/store";
import {CardsType, deleteCardTC, getCardsTC, setCurrentPageAC, setPageCountAC} from "./cards-reducer";
import Card from "./Card";
import {Navigate, useParams} from "react-router-dom";
import Modal from "../../common/Modal/Modal";
import ModalAddCard from "../../common/Modal/ModalAddCard";
import MyButton from "../../common/Button/MyButton";
import Preloader from "../../utils/Preloader";
import {PATH} from "../AllRoutes";
import ModalUpdateCard from "../../common/Modal/ModalUpdateCard";

export const CardsList = () => {

    const dispatch = useDispatch()
    const cards = useSelector<RootStateType, CardsType>(state => state.cards)
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)
    const isAuth = useSelector<RootStateType, boolean>(state => state.app.isAuth)
    const {id} = useParams();
    const [activeDeleteCard, setActiveDeleteCard] = useState(false)
    const [activeAddCard, setActiveAddCard] = useState(false)
    const [activeUpdateCard, setActiveUpdateCard] = useState(false)
    const [cardId, setCardId] = useState('')

    useEffect(() => {
        dispatch(getCardsTC(id))
    }, [cards.page, cards.pageCount])

    const openModalWindow = () => {
        setActiveAddCard(true)
    }

    const openUpdateModalWindow = (id: string) => {
        setCardId(id)
        setActiveUpdateCard(true)
    }
    const changeCurrentPage = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }
    const changePageCount = (pageCount: number) => {
        dispatch(setPageCountAC(pageCount))
    }
    const deleteCard = (id: string) => {
        setActiveDeleteCard(true)
        dispatch(deleteCardTC(id))
    }

    if (isLoading) {
        return <Preloader/>
    }
    if (!isAuth) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return <div className={s.container}>
        <ModalAddCard active={activeAddCard} setActive={setActiveAddCard} cardsPack_id={cards.cardsPack_id}/>
        <ModalUpdateCard active={activeUpdateCard} setActive={setActiveUpdateCard} id={cardId}/>
        <Modal active={activeDeleteCard} setActive={setActiveDeleteCard}>{'Card removed'}</Modal>
        <div className={s.topPart}>
            <MyInput placeholder={'Search'} name={'search'}/>
            <MyButton onClick={openModalWindow}>Add</MyButton>
        </div>
        <div className={s.content}>
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
                                               cardsPack_id={cp.cardsPack_id}
                                               openUpdateModalWindow={openUpdateModalWindow}
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