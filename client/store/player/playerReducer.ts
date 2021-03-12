import {Player, PlayerAction, PlayerActionTypes} from "../../types/player";

const initialState: Player = {
    currentTime: 0,
    volume: 50,
    pause: true,
    duration: 0,
    track: null
}

export const playerReducer = (state = initialState, action: PlayerAction): Player => {
    switch (action.type) {
        case PlayerActionTypes.PAUSE: {
            console.log('pause')
            return {...state, pause: true}
        }
        case PlayerActionTypes.PLAY:
            return {...state, pause: false}
        case PlayerActionTypes.SET_CURRENT_TIME:
            return {...state, currentTime: action.payload}
        case PlayerActionTypes.SET_DURATION:
            return {...state, duration: action.payload}
        case PlayerActionTypes.SET_VOLUME:
            return {...state, volume: action.payload}
        case PlayerActionTypes.SET_TRACK:
            return {...state, track: action.payload, duration: 0, currentTime: 0}
        default:
            return state
    }

}