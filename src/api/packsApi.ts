import {instance} from "./authApi";

export type PostPackPayloadType = {
        name: string
    }


export const packsApi = {
    getCards(page: number, pageCount: number) {
        return instance.get(`cards/pack?page=${page}&pageCount=${pageCount}`)
    },
    postPack(cardsPack: PostPackPayloadType) {
        return instance.post(`cards/pack`, {cardsPack})
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    }
}