import React, {useContext, useEffect} from 'react';
import {Grid, IconButton} from "@material-ui/core";
import {Pause, PlayArrow, Repeat, Shuffle, SkipNext, SkipPrevious, VolumeUp} from "@material-ui/icons";
import styles from '../../styles/Player.module.sass'
import TrackProgress from "./TrackProgress";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {PlayerContext} from "../../context/ContextPlayerWrap";
import useSetTracksToPlayer from "../../hooks/useSetTracksToPlayer";


let audio;
const Player = () => {
    const {currentTrack} = useContext(PlayerContext)
    const {TRACK_setDuration, TRACK_setCurrentTime, TRACK_setVolume, TRACK_pause, TRACK_play, TRACK_setTrack} = useActions()
    const {pause, duration, volume, currentTime} = useTypedSelector(state => state.player)
    const {nextTrack, haveNext, prevTrack, havePrev, setShufflePlayList} = useSetTracksToPlayer()


    useEffect(() => {
        audio = new Audio()
        console.log('set audio')
    }, [])

    useEffect(() => {
        currentTrack && TRACK_setTrack(currentTrack?.value)
    }, [currentTrack])

    const handlerPlayButton = () => {
        if (currentTrack?.value)
            pause
                ?
                TRACK_play()
                :
                TRACK_pause()
    }

    const play = () => {
        if (audio && currentTrack?.value)
            !pause
                ?
                audio.play()
                :
                audio.pause()
    }

    useEffect(() => {
        play()
    }, [pause])

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const volume = Number(e.target.value)
        TRACK_setVolume(volume)
        audio.volume = volume / 100
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const curTime = Number(e.target.value)
        TRACK_setCurrentTime(curTime)
        audio.currentTime = curTime
    }

    useEffect(() => {

        if (currentTrack?.value) {
            audio.pause()
            setAudioData()
            audio.play()
            TRACK_play()
        }
    }, [currentTrack])


    const setNextTrack = () => {
        audio.pause()
        haveNext && nextTrack()

    }
    const setPrevTrack = () => {
        audio.pause()
        havePrev && prevTrack()
    }


    const setAudioData = () => {
        audio.src = 'http://localhost:5000/' + currentTrack?.value.audio
        audio.volume = volume / 100
        audio.onloadedmetadata = () => {
            TRACK_setDuration(Math.ceil(audio.duration))
        }
        audio.ontimeupdate = () => {
            TRACK_setCurrentTime(Math.ceil(audio.currentTime))
        }
        audio.onended = () => {
            setNextTrack()
        }
    }

    if (!currentTrack)
        return null

    return (
        <div className={styles.player__content}>
            <IconButton onClick={setPrevTrack} disabled={!havePrev}><SkipPrevious/></IconButton>
            <IconButton onClick={handlerPlayButton}>
                {pause
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>
            <IconButton onClick={setNextTrack} disabled={!haveNext}><SkipNext/></IconButton>
            <IconButton><Repeat/></IconButton>
            <IconButton onClick={setShufflePlayList}><Shuffle/></IconButton>
            <img src={'http://localhost:5000/' + currentTrack.value.picture} width={50} height={50}/>
            <Grid className={styles.info} container direction='column' style={{width: 200, margin: '0 20px'}}>
                <div className={styles.info__name}>{currentTrack.value?.name}</div>
                <div className={styles.info__artist}>{currentTrack.value?.artist}</div>
            </Grid>

            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} type='time'/>
            <VolumeUp/>
            <TrackProgress left={volume} right={100} onChange={changeVolume} type='number'/>
        </div>

    );
};

export default Player;