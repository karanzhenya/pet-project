import React, {ChangeEvent, useEffect, useState} from 'react';
import MyInput from "../../common/Input/MyInput";
import s from "./CardsList.module.css";
import Pagination from "../../common/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../BLL/store";
import {CardsType, deleteCardTC, getCardsTC, postCardTC, setCurrentPageAC, setPageCountAC} from "./cards-reducer";
import Card from "./Card";
import {useParams} from "react-router-dom";
import Modal from "../../common/Modal/Modal";
import MyButton from "../../common/Button/MyButton";
import {PostNewCard} from "../../api/cardsApi";
import {deletePackTC} from "../../packs/packs-reducer";

export const CardsList = () => {

    const dispatch = useDispatch()
    const cards = useSelector<RootStateType, CardsType>(state => state.cards)
    const {id} = useParams();
    const [active, setActive] = useState(false)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    useEffect(() => {
        dispatch(getCardsTC(id))
    }, [cards.page, cards.pageCount])

    const openModalWindow = () => {
        setActive(true)
    }
    const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const addNewPack = () => {
        dispatch(postCardTC({cardsPack_id: cards.cards[0].cardsPack_id, question, answer}))
        setActive(false)
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

    return <div className={s.container}>
        <Modal active={active} addNewPack={addNewPack} setActive={setActive}>
            {<div className={s.modalWindow}>
                <MyInput onChange={onChangeQuestion}/>
                <MyInput onChange={onChangeAnswer}/>
                <MyButton onClick={addNewPack}>Add</MyButton>
            </div>}
        </Modal>
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
}

export default CardsList;