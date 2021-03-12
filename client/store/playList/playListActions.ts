import {PlayListAction, PlayListActionTypes} from "../../types/playList";
import {ITrack} from "../../types/track";

export const next = (): PlayListAction => {
    return {type: PlayListActionTypes.NEXT}
}
export const prev = (): PlayListAction => {
    return {type: PlayListActionTypes.PREV}
}
export const setPlaylist = (tracks: ITrack[]): PlayListAction => {
    return {type: PlayListActionTypes.SET_PLAYLIST, payload: tracks}
}

export const setCurrentTrack = (track: ITrack): PlayListAction => {
    return {type: PlayListActionTypes.SET_TRACK, payload: track}
}
