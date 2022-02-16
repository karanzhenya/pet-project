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


type ActionsType = ReturnType<typeof getCardsAC>

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

const getCardsAC = (packs: PacksType) => {
    return ({type: 'GET-CARDS', packs} as const)
}

export const getCardsTC = () => (dispatch: Dispatch) => {
    dispatch(isLoadingAC(true))
    userApi.getCards().then((res) => {
        dispatch(getCardsAC(res.data))
        console.log(res.data)
    })
}
