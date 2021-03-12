import {useContext, useEffect, useState} from 'react';
import {PlayerContext} from "../context/ContextPlayerWrap";
import LinkedList from "../dataStructure/linkedList/LinkedList";
import {ITrack} from "../types/track";
import LinkedListNode from "../dataStructure/linkedList/LinkedListNode";

const useSetTracksToPlayer = () => {

    const [haveNext, setHaveNext] = useState<boolean>(false)
    const [havePrev, setHavePrev] = useState<boolean>(false)
    const {setCurrentTrack, playList, currentTrack, setPlayList} = useContext(PlayerContext)

    const setTrackAndPlayList = (track: ITrack, tracks: ITrack[]) => {
        console.log('set playlist')
        const newPlaylist = new LinkedList<ITrack>()
        newPlaylist.fromArray(tracks)
        setPlayList(newPlaylist);
        setCurrentTrack(newPlaylist.find(track))
    }

    const setTrack = (track: ITrack) => {
        console.log('set track')
        if (playList)
            setCurrentTrack(playList.find(track))
    }
    const setPlayListToPlayer = (tracks: ITrack[]) => {
        console.log('set playlist')
        const newPlaylist = new LinkedList<ITrack>()
        newPlaylist.fromArray(tracks)
        setPlayList(newPlaylist);
    }
    const setShufflePlayList = () => {

        const arr: LinkedListNode<ITrack>[] = playList.toArray()
        const shuffledArr: LinkedListNode<ITrack>[] = arr.sort(() =>
            Math.random() - 0.5
        )
        const shuffledArrITrack: ITrack[] = Array.from(shuffledArr, item => item.value)
        const newList = new LinkedList<ITrack>()
        newList.fromArray(shuffledArrITrack)
        setCurrentTrack(newList.find(currentTrack.value))
    }

    const nextTrack = () => {
        haveNext && setCurrentTrack(currentTrack.next)
    }
    const prevTrack = () => {
        havePrev && setCurrentTrack(currentTrack.previous)
    }

    useEffect(() => {
        if (currentTrack) {
            setHavePrev(currentTrack.previous !== null)
            setHaveNext(currentTrack.next !== null)
        }
    }, [currentTrack])

    return {
        setTrack,
        nextTrack,
        prevTrack,
        setPlayListToPlayer,
        setTrackAndPlayList,
        setShufflePlayList,
        haveNext,
        havePrev
    }
};

export default useSetTracksToPlayer;