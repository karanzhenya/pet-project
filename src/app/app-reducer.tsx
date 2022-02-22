export type AppInitialStateType = {
    isLoading: boolean
    error: string | null
    isAuth: boolean
}
export type AppActionsType = | ReturnType<typeof setErrorAC> | ReturnType<typeof isLoadingAC> | ReturnType<typeof isAuthAC>

const initialState: AppInitialStateType = {
    isLoading: true,
    error: null,
    isAuth: false
}
export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'app/IS-LOADING': {
            return {...state, isLoading: action.status}
        }
        case 'app/SET-ERROR': {
            return {...state, error: action.error}
        }
        case 'app/IS-AUTH': {
            return {...state, isAuth: action.status}
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
export const isAuthAC = (status: boolean) => {
    return ({type: 'app/IS-AUTH', status} as const)
}

