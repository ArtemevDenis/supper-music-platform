import {ITrack} from "./track";
import LinkedListNode from "../dataStructure/linkedList/LinkedListNode";

export interface PlayList {
    currentTrack: LinkedListNode<ITrack> | null
}

export enum PlayListActionTypes {
    NEXT = 'NEXT',
    PREV = 'PREV',
    SET_PLAYLIST = 'SET_PLAYLIST',
    SET_TRACK = 'SET_TRACK',
}

interface NextAction {
    type: PlayListActionTypes.NEXT
}

interface PrevAction {
    type: PlayListActionTypes.PREV
}

interface SetPlayListAction {
    type: PlayListActionTypes.SET_PLAYLIST
    payload: ITrack[]
}


interface SetTrackAction {
    type: PlayListActionTypes.SET_TRACK
    payload: ITrack
}


export type PlayListAction =
    NextAction
    | PrevAction
    | SetPlayListAction
    | SetTrackAction
