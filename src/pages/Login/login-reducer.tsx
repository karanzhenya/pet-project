import {Dispatch} from "redux"
import {authApi} from "../../api/authApi";
import {isAuthAC, isLoadingAC} from "../../app/app-reducer";
import {handleServerAppError} from "../../utils/CatchError";
import {AxiosError, AxiosResponse} from "axios";

export type UserInitialStateType = {
    _id: string
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number
    created: string
    update: string
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error: string
    token: string
}
export type LoginActionsType = ReturnType<typeof loginAC> | ReturnType<typeof chekMeAC> | ReturnType<typeof logoutAC>

const initialState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: '',
    update: '',
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: '',
    token: '',
}
export const loginReducer = (state: UserInitialStateType = initialState, action: LoginActionsType): UserInitialStateType => {
    switch (action.type) {
        case 'login/LOGIN': {
            return {...state, ...action.data}
        }
        case 'login/LOGOUT': {
            let stateCopy = {...state}
            stateCopy = {} as UserInitialStateType
            return stateCopy
        }
        case 'login/CHECK-ME': {
            return {...state, ...action.data}
        }
        default:
            return state
    }
}

export const loginAC = (data: UserInitialStateType) => {
    return ({type: 'login/LOGIN', data} as const)
}
export const logoutAC = () => {
    return ({type: 'login/LOGOUT'} as const)
}
export const chekMeAC = (data: UserInitialStateType) => {
    return ({type: 'login/CHECK-ME', data} as const)
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(isLoadingAC(true))
    authApi.login({email, password, rememberMe}).then((res) => {
        dispatch(loginAC(res.data))
        dispatch(isAuthAC(true))
    }).catch((err: AxiosError) => {
        handleServerAppError(err, dispatch)
    }).finally(() => {
        dispatch(isLoadingAC(false))
    })
}

export const authMeTC = () => (dispatch: Dispatch) => {
    authApi.authMe().then((res: AxiosResponse<UserInitialStateType>) => {
        dispatch(chekMeAC(res.data))
        dispatch(isAuthAC(true))
    }).catch((err: AxiosError) => {
        handleServerAppError(err, dispatch)
    }).finally(() => {
        dispatch(isLoadingAC(false))
    })
}

export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(isLoadingAC(true))
    authApi.logOut().then(() => {
        dispatch(loginAC({} as UserInitialStateType))
        dispatch(isAuthAC(false))
    }).catch((err: AxiosError) => {
        handleServerAppError(err, dispatch)
    }).finally(() => {
        dispatch(isLoadingAC(false))
    })
}