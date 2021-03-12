import {Dispatch} from "redux";
import {TrackAction, TrackActionTypes} from "../../types/track";
import axios from "axios";

export const fetchTracks = () => {
    console.log('update tracks')
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const res = await axios.get('http://localhost:5000/tracks')
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: res.data})
        } catch (e) {
            dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: `Произошла ошибка ${e}`})
        }
    }
}