import {Dispatch} from "redux";
import {isLoadingAC} from "../app/app-reducer";
import {handleServerAppError} from "../utils/CatchError";
import {AxiosError} from "axios";
import {AppThunkType, RootActionsType, RootStateType} from "../BLL/store";
import {packsApi, PostPackPayloadType, UpdatePackPayloadType} from "../api/packsApi";

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
    searchValue: string
    isMine: boolean
}

const initialCardsState: PacksType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 20,
    searchValue: '',
    isMine: false
}


export type PacksActionsType =
    ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setSearchValueAC>
    | ReturnType<typeof changeisMineStatusAC>

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
        case "packs/SET-SEARCH-VALUE": {
            return {...state, searchValue: action.searchName}
        }
        case "packs/CHANGE-ISMINE-STATUS": {
            return {...state, isMine: action.status}
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
export const setSearchValueAC = (searchName: string) => {
    return ({type: 'packs/SET-SEARCH-VALUE', searchName} as const)
}
export const changeisMineStatusAC = (status: boolean) => {
    return ({type: 'packs/CHANGE-ISMINE-STATUS', status} as const)
}

export const getPacksTC = (id?: string) => (dispatch: Dispatch<RootActionsType>, getState: () => RootStateType) => {
    const page = getState().packs.page
    const pageCount = getState().packs.pageCount
    const searchName = getState().packs.searchValue
    packsApi.getCards(page, pageCount, searchName, id).then((res) => {
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
    isLoadingAC(true)
    packsApi.postPack(cardsPack).then(() => {
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
    isLoadingAC(true)
    packsApi.deletePack(id).then(() => {
        dispatch(getPacksTC())
    })
        .catch((err: AxiosError) => {
            handleServerAppError(err, dispatch)
        })
        .finally(() => {
            dispatch(isLoadingAC(false))
        })
}
export const updatePackTC = (cardsPack: UpdatePackPayloadType): AppThunkType => (dispatch) => {
    isLoadingAC(true)
    packsApi.updatePack(cardsPack).then(() => {
        dispatch(getPacksTC())
    })
        .catch((err: AxiosError) => {
            handleServerAppError(err, dispatch)
        })
        .finally(() => {
            dispatch(isLoadingAC(false))
        })
}
