import axios from "axios";

type LoginPayloadType = {
    email: string
    password: string
    rememberMe: boolean
}
type RegisterPayloadType = {
    email: string
    password: string
}

const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/"
})

export const userApi = {
    login(payload: LoginPayloadType) {
        return instance.post(`auth/login`, {...payload})
    },
    register(payload: RegisterPayloadType) {
        return instance.post(`auth/register`, {...payload})
    },
    authMe() {
        return instance.post(`auth/me`, {})
    }
}