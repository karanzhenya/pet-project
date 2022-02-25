import {Dispatch} from "redux";
import {isLoadingAC} from "../../app/app-reducer";
import {handleServerAppError} from "../../utils/CatchError";
import {AxiosError} from "axios";
import {RootActionsType, RootStateType} from "../../BLL/store";
import {cardsApi} from "../../api/cardsApi";

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}
export type CardsType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    searchValue: string
    isMine: boolean
}

const initialCardsState: CardsType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 5,
    minGrade: 0,
    page: 1,
    pageCount: 10,
    packUserId: '',
    searchValue: '',
    isMine: false
}


export type CardsActionsType =
    ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setSearchValueAC>

export const cardsReducer = (state: CardsType = initialCardsState, action: CardsActionsType) => {
    switch (action.type) {
        case "cards/GET-CARDS": {
            return {...state, ...action.cards}
        }

        case "cards/SET-CURRENT-PAGE": {
            return {...state, page: action.page}
        }
        case "cards/SET-PAGE-COUNT": {
            return {...state, pageCount: action.pageCount}
        }
        case "cards/SET-SEARCH-VALUE": {
            return {...state, searchValue: action.searchName}
        }
        default:
            return state
    }
}

const setCardsAC = (cards: CardsType) => {
    return ({type: 'cards/GET-CARDS', cards} as const)
}
export const setCurrentPageAC = (page: number) => {
    return ({type: 'cards/SET-CURRENT-PAGE', page} as const)
}
export const setPageCountAC = (pageCount: number) => {
    return ({type: 'cards/SET-PAGE-COUNT', pageCount} as const)
}
export const setSearchValueAC = (searchName: string) => {
    return ({type: 'cards/SET-SEARCH-VALUE', searchName} as const)
}

export const getCardsTC = (id?: string) => (dispatch: Dispatch<RootActionsType>, getState: () => RootStateType) => {
    const page = getState().cards.page
    const pageCount = getState().cards.pageCount
    const searchName = getState().cards.searchValue
    cardsApi.getCards(page, pageCount, id).then((res) => {
        dispatch(setCardsAC(res.data))
    })
        .catch((err: AxiosError) => {
            handleServerAppError(err, dispatch)
        })
        .finally(() => {
            dispatch(isLoadingAC(false))
        })
}/*
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
}*/
