import {Context, createWrapper, MakeStore} from "next-redux-wrapper";
import {AnyAction, applyMiddleware, compose, createStore} from "redux";
import {reducer, rootReducer, RootState} from "./reducer";
import thunk, {ThunkDispatch} from "redux-thunk";


// @ts-ignore
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const makeStore: MakeStore<RootState> = (context: Context) => {
    const middleware = [
        thunk,
        () => next => action => {
            console.log('action', action)
            next(action)
        }
    ]
    const store = createStore(reducer, composeEnhancers(
        applyMiddleware(...middleware)
    ))
    return store
}

export const wrapper = createWrapper<RootState>(makeStore, {debug: true})

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>

const store = createStore(rootReducer);

export default store;