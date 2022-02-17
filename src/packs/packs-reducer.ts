import {Dispatch} from "redux";
import {isLoadingAC} from "../app/app-reducer";
import {userApi} from "../api/userApi";

export type CardType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: Date
    updated: Date
}
export type PacksType = {
    cardPacks: CardType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

const initialCardsState = {} as PacksType


type ActionsType = ReturnType<typeof setCardsAC>

export const packsReducer = (state: PacksType = initialCardsState, action: ActionsType) => {
    switch (action.type) {
        case "GET-CARDS": {
            let stateCopy = {...state}
            stateCopy = action.packs
            return stateCopy
        }
        default:
            return state
    }
}

const setCardsAC = (packs: PacksType) => {
    return ({type: 'GET-CARDS', packs} as const)
}

export const getCardsTC = (page: number, pageCount: number) => (dispatch: Dispatch) => {
    dispatch(isLoadingAC(true))
    userApi.getCards(page, pageCount).then((res) => {
        dispatch(setCardsAC(res.data))
        console.log(res.data)
    })
}
