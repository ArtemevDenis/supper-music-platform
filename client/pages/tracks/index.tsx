import React, {useEffect} from 'react';
import MainLayout from "../../layouts/MainLayout";
import {Box, Button, Card, Grid} from "@material-ui/core";
import {useRouter} from "next/router";
import TrackList from "../../components/track/TrackList";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks} from "../../store/tracks/trackActions";

const Index: React.FC = () => {
    const router = useRouter()
    const {tracks, error} = useTypedSelector(state => state.tracks)


    useEffect(() => {
        console.log('render page tracks list')
    }, [])

    if (error)
        return (
            <MainLayout>
                {error}
            </MainLayout>)
    return (
        <MainLayout title={'Список треков'}>
            <Card style={{marginBottom: 100}}>
                <Box p={2}>
                    <Grid container justifyContent='space-between'>
                        <h1>Список треков</h1>
                        <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
                    </Grid>
                    <TrackList tracks={tracks}/>
                </Box>
            </Card>
        </MainLayout>
    );
};

export default Index;


export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchTracks())
})