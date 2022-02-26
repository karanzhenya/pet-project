import {instance} from "./authApi";

export type PostNewCard = {
    cardsPack_id: string
    question: string
    answer: string
}
export type UpdateCard = {
    _id: string
    question: string
}

export const cardsApi = {

    getCards(page: number, pageCount: number, id?: string) {
        return instance.get(`cards/card?cardsPack_id=${id}&page=${page}&pageCount=${pageCount}`)
    },
    addNewCard(card: PostNewCard) {
        return instance.post(`cards/card`, {card})
    },
    deleteCard(id: string) {
        return instance.delete(`cards/card?id=${id}`)
    },
    updateCard(card: UpdateCard) {
        return instance.put(`cards/card`, {card})
    }
}