import {SetErrorAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {AxiosError} from "axios";

export const handleServerAppError = (err: AxiosError, dispatch: Dispatch) => {
    const error = err.response ? err.response.data.error :
        (err.message + 'more details about error in the console')
    dispatch(SetErrorAC(error))
}