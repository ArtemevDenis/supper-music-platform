import React, {useEffect} from 'react';
import {ITrack} from "../../types/track";
import {Grid} from "@material-ui/core";
import TrackItem from "./TrackItem";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface TrackListProps {
    tracks: ITrack[];
}

const TrackList: React.FC<TrackListProps> = ({tracks}) => {
    const {track, duration, currentTime, pause} = useTypedSelector(state => state.player)

    useEffect(() => {
        console.log('render component list of tracks')
    }, [])

    return (
        <Grid container direction='column'>
            {tracks.map(trackItem => <TrackItem key={trackItem._id}
                                                track={trackItem}
                                                active={track && trackItem._id === track._id && !pause}
                                                duration={duration}
                                                currentTime={currentTime}/>)}
        </Grid>
    );
};

export default TrackList;