import {Dispatch} from "redux";
import {isLoadingAC} from "../app/app-reducer";
import {userApi} from "../api/userApi";
import {handleServerAppError} from "../utils/CatchError";
import {AxiosError} from "axios";
import {AppThunkType, RootActionsType} from "../BLL/store";

export type CardType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}
export type PacksType = {
    cardPacks: CardType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

const initialCardsState: PacksType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 20
}


export type PacksActionsType = ReturnType<typeof setCardsAC>

export const packsReducer = (state: PacksType = initialCardsState, action: PacksActionsType) => {
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

export const getCardsTC = (page: number, pageCount: number) => (dispatch: Dispatch<RootActionsType>) => {
    userApi.getCards(page, pageCount).then((res) => {
        dispatch(setCardsAC(res.data))
    })
        .catch((err: AxiosError) => {
            handleServerAppError(err, dispatch)
        })
        .finally(() => {
            dispatch(isLoadingAC(false))
        })
}

/*export const getCardsTC = (page: number, pageCount: number): AppThunkType => (dispatch) => {
    userApi.authMe({}).then(() => {
        userApi.getCards(page, pageCount).then((res) => {
            dispatch(setCardsAC(res.data))
        })
            .catch((err: AxiosError) => {
                handleServerAppError(err, dispatch)
            })
    })
        .catch((err: AxiosError) => {
            handleServerAppError(err, dispatch)
        })
        .finally(() => {
            dispatch(isLoadingAC(false))
        })
}*/
