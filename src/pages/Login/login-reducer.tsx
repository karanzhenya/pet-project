import {Dispatch} from "redux"
import {userApi} from "../../api/userApi";
import {AuthMeAC, IsLoadingAC} from "../../app/app-reducer";
import {handleServerAppError} from "../../utils/CatchError";
import {AxiosError} from "axios";

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
}
export type ActionsType = ReturnType<typeof LoginAC>

const initialState = {} as UserInitialStateType
export const loginReducer = (state: UserInitialStateType = initialState, action: ActionsType): UserInitialStateType => {
    switch (action.type) {
        case 'login/LOGIN': {
            let stateCopy = {...state}
            stateCopy = action.data
            return stateCopy
        }
        default:
            return state
    }
}

export const LoginAC = (data: UserInitialStateType) => {
    return ({type: 'login/LOGIN', data} as const)
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(IsLoadingAC(true))
    userApi.login({email, password, rememberMe}).then((res) => {
        dispatch(LoginAC(res.data))
        dispatch(AuthMeAC(true))
    }).catch((err: AxiosError) => {
        handleServerAppError(err, dispatch)
    }).finally(() => {
        dispatch(IsLoadingAC(false))
    })
}