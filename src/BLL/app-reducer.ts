export type AppInitialStateType = {}
export type ActionsType = ReturnType<typeof ActionCreater>

const initialState = {}
export const appReducer = (state: AppInitialStateType = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case '': {
            return state
        }
        default:
            return state
    }
}

export const ActionCreater = () => {
    return ({type: ''} as const)
}