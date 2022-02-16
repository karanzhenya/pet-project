type CardsType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: Date
    updated: Date
}
type CardsPackType = {
    cardPacks: CardsType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}


type ActionsType = ReturnType<typeof getCardsAC>

export const cardsReducer = (state: CardsPackType, action: ActionsType) => {
    switch (action.type) {
        default:
            return state
    }
}

const getCardsAC = (cards: CardsType) => {
    return ({type: 'GET-CARDS', cards} as const)
}
