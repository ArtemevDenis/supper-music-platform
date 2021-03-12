import React, {useContext, useEffect} from 'react';
import {ITrack} from "../../types/track";
import styles from '../../styles/TrackItem.module.sass'
import {Card, Grid, IconButton} from "@material-ui/core";
import {Pause, PlayArrow} from "@material-ui/icons";
import {useRouter} from "next/router";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import useTimeToStingTime from "../../hooks/useTimeToStingTime";
import {PlayerContext} from "../../context/ContextPlayerWrap";
import useSetTracksToPlayer from "../../hooks/useSetTracksToPlayer";

interface TrackItemProps {
    track: ITrack,
    active?: boolean
    duration?: number
    currentTime?: number
}


const TrackItem: React.FC<TrackItemProps> = ({track, active = false, duration, currentTime}) => {
    const router = useRouter()
    const {TRACK_play, TRACK_pause} = useActions()
    const player = useTypedSelector(state => state.player)
    const {tracks} = useTypedSelector(state => state.tracks)

    const {setTrack, setTrackAndPlayList} = useSetTracksToPlayer()


    const {playList, currentTrack, setCurrentTrack, setPlayList} = useContext(PlayerContext)
    const hmsTimeDuration = useTimeToStingTime(duration)
    const hmsTimeCurrentTime = useTimeToStingTime(currentTime)

    const play = (e) => {
        e.stopPropagation()
        setPlayListIntoPlayer()

        if (currentTrack && currentTrack.value._id === track._id) {
            console.log(player.pause)
            player.pause ? TRACK_play() : TRACK_pause()
        } else {
            setTrack(track)
            TRACK_play()
        }
    }


    const setPlayListIntoPlayer =() =>{
        console.log('setPlayListIntoPlayer')
        if (!playList) {
            setTrackAndPlayList(track, tracks)
        }
    }

    useEffect(() => {
        console.log('render component track item')
    }, [])

    return (
        <Card
            className={styles.track}
            onClick={() => router.push(`/tracks/${track._id}`)}>
            <IconButton onClick={play}>
                {!active
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>
            <img className={styles.track__image} src={'http://localhost:5000/' + track.picture} width={70} height={70}
                 alt={'picture ' + track.name + ' ' + track.artist}/>
            <Grid className={styles.info} container direction='column'>
                <p className={styles.info__name}>{track.name}</p>
                <p className={styles.info__artist}>{track.artist}</p>
            </Grid>
            {currentTrack && track._id === currentTrack.value._id && <div>{hmsTimeCurrentTime}/ {hmsTimeDuration}</div>}
        </Card>
    );
};

export default TrackItem;