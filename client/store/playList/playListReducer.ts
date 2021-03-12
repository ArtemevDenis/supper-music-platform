import {PlayList, PlayListAction, PlayListActionTypes} from "../../types/playList";
import {ITrack} from "../../types/track";
import LinkedList from "../../dataStructure/linkedList/LinkedList";

const initialState: PlayList = {
    currentTrack: null,
}

export const playListReducer = (state = initialState, action: PlayListAction): PlayList => {
    switch (action.type) {
        case PlayListActionTypes.NEXT:
            console.log(state.currentTrack.next.value)
            return {currentTrack: state.currentTrack.next}
        case PlayListActionTypes.PREV:
            console.log(state.currentTrack.previous.value)
            return {currentTrack: state.currentTrack.previous}
        case PlayListActionTypes.SET_PLAYLIST: {
            const list: LinkedList<ITrack> = new LinkedList<ITrack>()
            list.fromArray(action.payload)
            return {currentTrack: list.head}
        }
        default:
            return state
    }
}