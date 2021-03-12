import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import {Button} from "@material-ui/core";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import axios from "axios";
import {ITrack} from "../../types/track";

const TrackPage = ({serverTrack}) => {
    const router = useRouter()

    const [track, setTrack] = useState<ITrack>(serverTrack)
    // const track: ITrack = {
    //     _id: '1232dfv31',
    //     artist: 'erer',
    //     audio: 'rfgerfger',
    //     comments: [{_id: 'rerger', author: " wefgerger", text: 'fwefwef'}],
    //     listens: 0,
    //     name: 'ergerger',
    //     picture: 'http://localhost:5000/image/eb42e4dd-b76d-41fa-b954-4e426f45257b.jpg',
    //     text: 'ergegergergre'
    // }
    return (
        <MainLayout title={track.artist + ' ' + track.name}>
            <Button
                variant={'outlined'}
                onClick={() => router.push('/tracks')}>
                К списку
            </Button>
            {JSON.stringify(track)}
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const res = await axios.get(`http://localhost:5000/tracks/${params.id}`)

    return {
        props: {
            serverTrack: res.data
        }
    }
}