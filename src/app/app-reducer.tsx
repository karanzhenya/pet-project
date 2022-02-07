import {Dispatch} from "redux";
import {userApi} from "../api/userApi";

export type AppInitialStateType = {
    isLoading: boolean
    error: string | null
    isAuthorized: boolean
}
export type ActionsType =
    | ReturnType<typeof SetErrorAC>
    | ReturnType<typeof IsLoadingAC>
    | ReturnType<typeof AuthMeAC>

const initialState = {
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
    }).catch((err) => {
        const error = err.response ? err.response.data.error :
            (err.message + 'more details about error in the console')
        dispatch(SetErrorAC(error))
    }).finally(() => {
        dispatch(IsLoadingAC(false))
    })
}