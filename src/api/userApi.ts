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
type ForgotPayloadType = {
    email: string
    from: string
    message: string
}
type NewPasswordPayloadType = {
    password: string
    resetPasswordToken: string
}

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true
    //baseURL: "http://localhost:7542/2.0/"
})

export const userApi = {
    login(payload: LoginPayloadType) {
        return instance.post(`auth/login`, payload)
    },
    logOut() {
        return instance.delete(`auth/me`, {})
    },
    register(payload: RegisterPayloadType) {
        return instance.post(`auth/register`, payload)
    },
    authMe() {
        return instance.post(`auth/me`, {})
    },
    forgotPassword(payload: ForgotPayloadType) {
        return instance.post(`auth/forgot`, payload)
    },
    setNewPassword(payload: NewPasswordPayloadType) {
        return instance.post(`auth/set-new-password`, payload)
    },
    getCards() {
        return instance.get(`cards/pack`)
    }
}