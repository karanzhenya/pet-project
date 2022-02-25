import {instance} from "./authApi";

export const cardsApi = {

    getCards(page: number, pageCount: number, id?: string) {
        return instance.get(`cards/card?cardsPack_id=${id}&page=${page}&pageCount=${pageCount}`)
    }
}