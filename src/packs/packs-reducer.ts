import {Dispatch} from "redux";
import {isLoadingAC} from "../app/app-reducer";
import {handleServerAppError} from "../utils/CatchError";
import {AxiosError} from "axios";
import {AppThunkType, RootActionsType, RootStateType} from "../BLL/store";
import {packsApi, PostPackPayloadType} from "../api/packsApi";

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


export type PacksActionsType =
    ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPageCountAC>

export const packsReducer = (state: PacksType = initialCardsState, action: PacksActionsType) => {
    switch (action.type) {
        case "packs/GET-CARDS": {
            return {...state, ...action.packs}
        }
        case "packs/SET-CURRENT-PAGE": {
            return {...state, page: action.page}
        }
        case "packs/SET-PAGE-COUNT": {
            return {...state, pageCount: action.pageCount}
        }
        default:
            return state
    }
}

const setCardsAC = (packs: PacksType) => {
    return ({type: 'packs/GET-CARDS', packs} as const)
}
export const setCurrentPageAC = (page: number) => {
    return ({type: 'packs/SET-CURRENT-PAGE', page} as const)
}
export const setPageCountAC = (pageCount: number) => {
    return ({type: 'packs/SET-PAGE-COUNT', pageCount} as const)
}

export const getPacksTC = () => (dispatch: Dispatch<RootActionsType>, getState: () => RootStateType) => {
    const page = getState().packs.page
    const pageCount = getState().packs.pageCount
    packsApi.getCards(page, pageCount).then((res) => {
        dispatch(setCardsAC(res.data))
    })
        .catch((err: AxiosError) => {
            handleServerAppError(err, dispatch)
        })
        .finally(() => {
            dispatch(isLoadingAC(false))
        })
}
export const postPackTC = (cardsPack: PostPackPayloadType): AppThunkType => (dispatch) => {
    packsApi.postPack(cardsPack).then((res) => {
        dispatch(getPacksTC())
    })
        .catch((err: AxiosError) => {
            handleServerAppError(err, dispatch)
        })
        .finally(() => {
            dispatch(isLoadingAC(false))
        })
}
export const deletePackTC = (id: string): AppThunkType => (dispatch) => {
    packsApi.deletePack(id).then((res) => {
        dispatch(getPacksTC())
    })
        .catch((err: AxiosError) => {
            handleServerAppError(err, dispatch)
        })
        .finally(() => {
            dispatch(isLoadingAC(false))
        })
}
