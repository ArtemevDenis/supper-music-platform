import {useTypedSelector} from "./useTypedSelector";
import {ITrack} from "../types/track";
import {useContext, useMemo} from "react";
import {PlayerContext} from "../context/ContextPlayerWrap";

const useGetTrackById = (): ITrack | null => {
    const {tracks} = useTypedSelector(state => state.tracks)
    const {currentTrackId} = useContext(PlayerContext)

    return useMemo(() => {
        return currentTrackId
            ?
            tracks.find(element => element._id === currentTrackId)
            :
            null
    }, [currentTrackId])

};

export default useGetTrackById;