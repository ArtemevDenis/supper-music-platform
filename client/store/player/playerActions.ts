import {PlayerAction, PlayerActionTypes} from "../../types/player";
import {ITrack} from "../../types/track";

export const TRACK_play = (): PlayerAction => {
    return {type: PlayerActionTypes.PLAY}
}

export const TRACK_pause = (): PlayerAction => {
    return {type: PlayerActionTypes.PAUSE}
}
export const TRACK_setDuration = (duration: number): PlayerAction => {
    return {type: PlayerActionTypes.SET_DURATION, payload: duration}
}
export const TRACK_setVolume = (volume: number): PlayerAction => {
    return {type: PlayerActionTypes.SET_VOLUME, payload: volume}
}
export const TRACK_setTrack = (track: ITrack): PlayerAction => {
    return {type: PlayerActionTypes.SET_TRACK, payload: track}
}
export const TRACK_setCurrentTime = (curTime: number): PlayerAction => {
    return {type: PlayerActionTypes.SET_CURRENT_TIME, payload: curTime}
}