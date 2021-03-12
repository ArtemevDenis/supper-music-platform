import React from "react";
import LinkedList from "../dataStructure/linkedList/LinkedList";
import {ITrack} from "../types/track";
import LinkedListNode from "../dataStructure/linkedList/LinkedListNode";


interface IPlayerContext {
    playList: LinkedList<ITrack>
    currentTrack: LinkedListNode<ITrack> | null
    setCurrentTrack: (track: LinkedListNode<ITrack>) => void
    setPlayList: (playlist: LinkedList<ITrack>) => void
}

export const PlayerContext = React.createContext<Partial<IPlayerContext>>({});


const ContextPlayerWrap: React.FC = ({children}) => {

    const [currentTrack, setCurrentTrack] = React.useState<LinkedListNode<ITrack> | null>(null)
    const [playList, setPlayList] = React.useState<LinkedList<ITrack> | null>(null)
    const context: IPlayerContext = {
        currentTrack: currentTrack,
        playList: playList,
        setCurrentTrack: setCurrentTrack,
        setPlayList: setPlayList
    }

    return (
        <PlayerContext.Provider value={context}>
            {children}
        </PlayerContext.Provider>
    );
};

export default ContextPlayerWrap;

