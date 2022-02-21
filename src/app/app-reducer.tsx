export type AppInitialStateType = {
    isLoading: boolean
    error: string | null
}
export type AppActionsType = | ReturnType<typeof setErrorAC> | ReturnType<typeof isLoadingAC>

const initialState: AppInitialStateType = {
    isLoading: false,
    error: null
}
export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'app/IS-LOADING': {
            return {...state, isLoading: action.status}
        }
        case 'app/SET-ERROR': {
            return {...state, error: action.error}
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

