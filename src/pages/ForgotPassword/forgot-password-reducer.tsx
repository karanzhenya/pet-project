import {Dispatch} from "redux"
import {userApi} from "../../api/userApi";
import {IsLoadingAC} from "../../app/app-reducer";
import {handleServerAppError} from "../../utils/CatchError";
import {AxiosError} from "axios";

export type ForgotInitialStateType = {
    info: string
}
export type ActionsType = ReturnType<typeof ForgotPasswordAC>

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

export const ForgotPasswordAC = (data: ForgotInitialStateType) => {
    return ({type: 'forgot/FORGOT-PASSWORD', data} as const)
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
    }).catch((err: AxiosError) => {
        handleServerAppError(err, dispatch)
    }).finally(() => {
        dispatch(IsLoadingAC(false))
    })
}