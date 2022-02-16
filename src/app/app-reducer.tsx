import {Dispatch} from "redux";
import {userApi} from "../api/userApi";
import {LoginAC} from "../pages/Login/login-reducer";
import {handleServerAppError} from "../utils/CatchError";
import {AxiosError} from "axios";

export type AppInitialStateType = {
    isLoading: boolean
    error: string | null
    isAuthorized: boolean
}
export type ActionsType =
    | ReturnType<typeof SetErrorAC>
    | ReturnType<typeof IsLoadingAC>
    | ReturnType<typeof AuthMeAC>

const initialState: AppInitialStateType = {
    isLoading: false,
    error: null,
    isAuthorized: false
}
export const appReducer = (state: AppInitialStateType = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'app/IS-LOADING': {
            return {...state, isLoading: action.status}
        }
        case 'app/SET-ERROR': {
            return {...state, error: action.error}
        }
        case "app/ME": {
            return {...state, isAuthorized: action.isAuth}
        }
        default:
            return state
    }
}

export const SetErrorAC = (error: string) => {
    return ({type: 'app/SET-ERROR', error} as const)
}
export const IsLoadingAC = (status: boolean) => {
    return ({type: 'app/IS-LOADING', status} as const)
}
export const AuthMeAC = (isAuth: boolean) => {
    return ({type: 'app/ME', isAuth} as const)
}
export const authMeTC = () => (dispatch: Dispatch) => {
    dispatch(IsLoadingAC(true))
    userApi.authMe().then((res) => {
        console.log(res)
        dispatch(AuthMeAC(true))
        dispatch(LoginAC(res.data))
    }).catch((err: AxiosError) => {
        handleServerAppError(err, dispatch)
    }).finally(() => {
        dispatch(IsLoadingAC(false))
    })
}

export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(IsLoadingAC(false))
    userApi.logOut().then((res) => {
        console.log(res)
        dispatch(AuthMeAC(false))
    }).catch((err: AxiosError) => {
        handleServerAppError(err, dispatch)
    }).finally(() => {
        dispatch(IsLoadingAC(false))
    })
}
