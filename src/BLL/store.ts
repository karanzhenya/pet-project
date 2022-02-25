import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {AppActionsType, appReducer} from "../app/app-reducer";
import {LoginActionsType, loginReducer} from "../pages/Login/login-reducer";
import {registerReducer} from "../pages/Registration/register-reducer";
import {forgotPasswordReducer} from "../pages/ForgotPassword/forgot-password-reducer";
import {PacksActionsType, packsReducer} from "../packs/packs-reducer";
import {CardsActionsType, cardsReducer} from "../pages/Cards/cards-reducer";

const reducers = combineReducers({
    app: appReducer,
    login: loginReducer,
    register: registerReducer,
    forgot: forgotPasswordReducer,
    packs: packsReducer,
    cards: cardsReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store

export type RootStateType = ReturnType<typeof reducers>

export type RootActionsType = PacksActionsType | CardsActionsType | LoginActionsType | AppActionsType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionsType>

// @ts-ignore
window.store = store

