import {instance} from "./authApi";

export type PostPackPayloadType = {
    name: string
}
export type UpdatePackPayloadType = {
    name: string,
    _id: string
}

export const packsApi = {

    getCards(page: number, pageCount: number, name: string) {
        return instance.get(`cards/pack?page=${page}&pageCount=${pageCount}&packName=${name}`)
    },
    postPack(cardsPack: PostPackPayloadType) {
        return instance.post(`cards/pack`, {cardsPack})
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },
    updatePack(cardsPack: UpdatePackPayloadType) {
        debugger
        return instance.put(`cards/pack`, {cardsPack})
    }
}