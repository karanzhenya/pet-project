import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {appReducer} from "../app/app-reducer";
import {loginReducer} from "../pages/Login/login-reducer";
import {registerReducer} from "../pages/Registration/register-reducer";
import {forgotPasswordReducer} from "../pages/ForgotPassword/forgot-password-reducer";
import {packsReducer} from "../cards/packs-reducer";

const reducers = combineReducers({
    app: appReducer,
    login: loginReducer,
    register: registerReducer,
    forgot: forgotPasswordReducer,
    packs: packsReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store

export type RootStateType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store

