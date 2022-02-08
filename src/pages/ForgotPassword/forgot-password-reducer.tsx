import {Dispatch} from "redux"
import {userApi} from "../../api/userApi";
import {IsLoadingAC} from "../../app/app-reducer";

export type ForgotInitialStateType = {
    info: string
    isError?: string
}
export type ActionsType = ReturnType<typeof ForgotPasswordAC> | ReturnType<typeof SetForgotErrorAC>

const initialState = {} as ForgotInitialStateType
export const forgotPasswordReducer = (state: ForgotInitialStateType = initialState, action: ActionsType): ForgotInitialStateType => {
    switch (action.type) {
        case "forgot/FORGOT-PASSWORD": {
            return {...state, info: action.data.info}
        }
        case "forgot/SET-FORGOT-ERROR": {
            return {...state, isError: action.error}
        }
        default:
            return state
    }
}

export const ForgotPasswordAC = (data: ForgotInitialStateType) => {
    return ({type: 'forgot/FORGOT-PASSWORD', data} as const)
}
export const SetForgotErrorAC = (error: string) => {
    return ({type: 'forgot/SET-FORGOT-ERROR', error} as const)
}

export const forgotPasswordTC = (email: string) => (dispatch: Dispatch) => {
    let payload = {
        email,
        from: 'test-front-admin <karanek10@yandex.by>',
        message: `<div style="background-color: lime; padding: 15px">
        password recovery link: <a href='http://localhost:3000/#/password-recovery/$token$'>link</a></div>`
    }
    dispatch(IsLoadingAC(true))
    userApi.forgotPassword(payload).then((res) => {
        dispatch(ForgotPasswordAC(res.data))
    }).catch((err) => {
        const error = err.response ? err.response.data.error :
            (err.message + 'more details about error in the console')
        dispatch(SetForgotErrorAC(error))
    }).finally(() => {
        dispatch(IsLoadingAC(false))
    })
}