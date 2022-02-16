import {Dispatch} from "redux";
import {userApi} from "../api/userApi";
import {loginAC} from "../pages/Login/login-reducer";
import {handleServerAppError} from "../utils/CatchError";
import {AxiosError} from "axios";

export type AppInitialStateType = {
    isLoading: boolean
    error: string | null
    isAuthorized: boolean
}
export type ActionsType =
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof isLoadingAC>
    | ReturnType<typeof authMeAC>

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

export const setErrorAC = (error: string) => {
    return ({type: 'app/SET-ERROR', error} as const)
}
export const isLoadingAC = (status: boolean) => {
    return ({type: 'app/IS-LOADING', status} as const)
}
export const authMeAC = (isAuth: boolean) => {
    return ({type: 'app/ME', isAuth} as const)
}
export const authMeTC = () => (dispatch: Dispatch) => {
    dispatch(isLoadingAC(true))
    userApi.authMe().then((res) => {
        console.log(res)
        dispatch(authMeAC(true))
        dispatch(loginAC(res.data))
    }).catch((err: AxiosError) => {
        console.log(err)
    }).finally(() => {
        dispatch(isLoadingAC(false))
    })
}

export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(isLoadingAC(false))
    userApi.logOut().then((res) => {
        dispatch(authMeAC(false))
    }).catch((err: AxiosError) => {
        handleServerAppError(err, dispatch)
    }).finally(() => {
        dispatch(isLoadingAC(false))
    })
}
