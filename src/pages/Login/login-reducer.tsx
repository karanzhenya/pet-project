import {Dispatch} from "redux"
import {userApi} from "../../api/userApi";
import {AuthMeAC, IsLoadingAC, SetErrorAC} from "../../app/app-reducer";

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
    token: string
    isError: string
}
export type ActionsType = ReturnType<typeof LoginAC> | ReturnType<typeof SetLoginErrorAC>

const initialState = {} as UserInitialStateType
export const loginReducer = (state: UserInitialStateType = initialState, action: ActionsType): UserInitialStateType => {
    switch (action.type) {
        case 'login/LOGIN': {
            let stateCopy = {...state}
            stateCopy = action.data
            return stateCopy
        }
        case "login/SET-LOGIN-ERROR": {
            return {...state, isError: action.error}
        }
        default:
            return state
    }
}

export const LoginAC = (data: UserInitialStateType) => {
    return ({type: 'login/LOGIN', data} as const)
}
export const SetLoginErrorAC = (error: string) => {
    return ({type: 'login/SET-LOGIN-ERROR', error} as const)
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(IsLoadingAC(true))
    userApi.login({email, password, rememberMe}).then((res) => {
        dispatch(LoginAC(res.data))
        dispatch(AuthMeAC(true))
    }).catch((err) => {
        const error = err.response ? err.response.data.error :
            (err.message + 'more details about error in the console')
        dispatch(SetLoginErrorAC(error))
    }).finally(() => {
        dispatch(IsLoadingAC(false))
    })
}