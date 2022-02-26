import {Dispatch} from "redux";
import {isLoadingAC} from "../../app/app-reducer";
import {handleServerAppError} from "../../utils/CatchError";
import {AxiosError, AxiosResponse} from "axios";
import {AppThunkType, RootActionsType, RootStateType} from "../../BLL/store";
import {cardsApi, PostNewCard, UpdateCard} from "../../api/cardsApi";

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
    cardsPack_id: string
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
    isMine: false,
    cardsPack_id: ''
}


export type CardsActionsType =
    ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setSearchValueAC>
    | ReturnType<typeof setCardsPackIdAC>

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
        case "cards/GET-CARDS-PACK-ID": {
            return {...state, cardsPack_id: action.cardsPack_id}
        }
        default:
            return state
    }
}

const setCardsAC = (cards: CardsType) => {
    return ({type: 'cards/GET-CARDS', cards} as const)
}
export const setCardsPackIdAC = (cardsPack_id: string) => {
    return ({type: 'cards/GET-CARDS-PACK-ID', cardsPack_id} as const)
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
    const cardsPack_id = getState().cards.cardsPack_id
    cardsApi.getCards(page, pageCount, id).then((res: AxiosResponse<CardsType>) => {
        dispatch(setCardsPackIdAC(cardsPack_id))
        dispatch(setCardsAC(res.data))
    })
        .catch((err: AxiosError) => {
            handleServerAppError(err, dispatch)
        })
        .finally(() => {
            dispatch(isLoadingAC(false))
        })
}
export const postCardTC = (newCard: PostNewCard): AppThunkType => (dispatch) => {
    isLoadingAC(true)
    cardsApi.addNewCard(newCard).then(() => {
        dispatch(getCardsTC(newCard.cardsPack_id))
    })
        .catch((err: AxiosError) => {
            handleServerAppError(err, dispatch)
        })
        .finally(() => {
            dispatch(isLoadingAC(false))
        })
}
export const deleteCardTC = (id: string): AppThunkType => (dispatch, getState: () => RootStateType) => {
    const cardsPack_id = getState().cards.cardsPack_id
    isLoadingAC(true)
    cardsApi.deleteCard(id).then(() => {
        dispatch(getCardsTC(cardsPack_id))
    })
        .catch((err: AxiosError) => {
            handleServerAppError(err, dispatch)
        })
        .finally(() => {
            dispatch(isLoadingAC(false))
        })
}

export const updateCardTC = (card: UpdateCard): AppThunkType => (dispatch, getState: () => RootStateType) => {
    const cardsPack_id = getState().cards.cardsPack_id
    isLoadingAC(true)
    cardsApi.updateCard(card).then(() => {
        dispatch(getCardsTC(cardsPack_id))
    })
        .catch((err: AxiosError) => {
            handleServerAppError(err, dispatch)
        })
        .finally(() => {
            dispatch(isLoadingAC(false))
        })
}
