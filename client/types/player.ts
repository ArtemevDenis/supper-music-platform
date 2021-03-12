import {ITrack} from "./track";


export interface Player {
    track: null | ITrack
    volume: number
    duration: number
    currentTime: number
    pause: boolean
}

export enum PlayerActionTypes {
    PLAY = 'PLAY',
    PAUSE = 'PAUSE',
    SET_TRACK = 'SET_TRACK',
    SET_DURATION = 'SET_DURATION',
    SET_CURRENT_TIME = 'SET_CURRENT_TIME',
    SET_VOLUME = 'SET_VOLUME'
}

interface PlayAction {
    type: PlayerActionTypes.PLAY
}


interface PauseAction {
    type: PlayerActionTypes.PAUSE
}


interface SetTrackAction {
    type: PlayerActionTypes.SET_TRACK
    payload: ITrack
}

interface SetDurationAction {
    type: PlayerActionTypes.SET_DURATION
    payload: number
}

interface SetCurrentTimeAction {
    type: PlayerActionTypes.SET_CURRENT_TIME
    payload: number
}

interface SetVolumeAction {
    type: PlayerActionTypes.SET_VOLUME
    payload: number
}

export type PlayerAction =
    SetCurrentTimeAction
    | SetDurationAction
    | SetTrackAction
    | SetVolumeAction
    | PauseAction
    | PlayAction