import {Dispatch} from "redux"
import {userApi} from "../../api/userApi";
import {isLoadingAC} from "../../app/app-reducer";
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
}
export type ActionsType = ReturnType<typeof RegisterAC>

const initialState = {} as UserInitialStateType
export const registerReducer = (state: UserInitialStateType = initialState, action: ActionsType): UserInitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export const RegisterAC = () => {
    return ({type: 'auth/REGISTER'} as const)
}

export const registerTC = (email: string, password: string) => (dispatch: Dispatch) => {
    dispatch(isLoadingAC(true))
    userApi.register({email, password}).then((res) => {

    }).catch((err: AxiosError) => {
        handleServerAppError(err, dispatch)
    }).finally(() => {
        dispatch(isLoadingAC(false))
    })
}