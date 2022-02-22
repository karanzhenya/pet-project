import {Dispatch} from "redux"
import {authApi} from "../../api/authApi";
import {isLoadingAC} from "../../app/app-reducer";
import {handleServerAppError} from "../../utils/CatchError";
import {AxiosError} from "axios";

export type ForgotInitialStateType = {
    info: string
}
export type ActionsType = ReturnType<typeof forgotPasswordAC>

const initialState = {} as ForgotInitialStateType
export const forgotPasswordReducer = (state: ForgotInitialStateType = initialState, action: ActionsType): ForgotInitialStateType => {
    switch (action.type) {
        case "forgot/FORGOT-PASSWORD": {
            return {...state, info: action.data.info}
        }
        default:
            return state
    }
}

export const forgotPasswordAC = (data: ForgotInitialStateType) => {
    return ({type: 'forgot/FORGOT-PASSWORD', data} as const)
}
export const forgotPasswordTC = (email: string) => (dispatch: Dispatch) => {
    let payload = {
        email,
        from: 'test-front-admin <karanek10@yandex.by>',
        message: `<div style="background-color: lime; padding: 15px">
        password recovery link: <a href='http://localhost:3000/#/new-password/$token$'>link</a></div>`
    }
    dispatch(isLoadingAC(true))
    authApi.forgotPassword(payload).then((res) => {
        dispatch(forgotPasswordAC(res.data))
    }).catch((err: AxiosError) => {
        handleServerAppError(err, dispatch)
    }).finally(() => {
        dispatch(isLoadingAC(false))
    })
}