import {Dispatch} from "redux"
import {userApi} from "../../api/userApi";
import {IsLoadingAC, SetErrorAC} from "../../app/app-reducer";

export type UserInitialStateType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    update: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
    isError: string
}
export type ActionsType = ReturnType<typeof RegisterAC> | ReturnType<typeof SetRegisterErrorAC>

const initialState = {} as UserInitialStateType
export const registerReducer = (state: UserInitialStateType = initialState, action: ActionsType): UserInitialStateType => {
    switch (action.type) {
        case "auth/SET-REGISTER-ERROR": {
            return {...state, isError: action.error}
        }
        default:
            return state
    }
}

export const RegisterAC = () => {
    return ({type: 'auth/REGISTER'} as const)
}
export const SetRegisterErrorAC = (error: string) => {
    return ({type: 'auth/SET-REGISTER-ERROR', error} as const)
}

export const registerTC = (email: string, password: string) => (dispatch: Dispatch) => {
    dispatch(IsLoadingAC(true))
    userApi.register({email, password}).then((res) => {
        dispatch(RegisterAC())
        console.log(res.data)
    }).catch((err) => {
        const error = err.response ? err.response.data.error :
            (err.message + 'more details about error in the console')
        dispatch(SetRegisterErrorAC(error))
    }).finally(() => {
        dispatch(IsLoadingAC(false))
    })
}