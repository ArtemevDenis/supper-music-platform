import {combineReducers} from "redux";
import {playerReducer} from "./player/playerReducer";
import {trackReducer} from "./tracks/trackReducer";
import {playListReducer} from './playList/playListReducer'
import {HYDRATE} from 'next-redux-wrapper';


export const rootReducer = combineReducers({
    player: playerReducer,
    tracks: trackReducer,
    // playlist: playListReducer
})

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        if (state.count) nextState.count = state.count // preserve count value on client side navigation
        return nextState
    } else {
        return rootReducer(state, action)
    }
}

export type RootState = ReturnType<typeof rootReducer>