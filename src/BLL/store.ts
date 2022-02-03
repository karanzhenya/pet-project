import {createStore, combineReducers} from "redux";

const reducers = combineReducers({})

const store = createStore(reducers)

export default store

export type StoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store

