import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/steps/StepWrapper";
import {Button, Grid, TextField} from "@material-ui/core";
import FileUpload from "../../components/fileUpload/FileUpload";
import {useInput} from "../../hooks/useInput";
import {useRouter} from "next/router";
import axios from "axios";
import StepItem from "../../components/steps/StepItem";

const Create = () => {
    const router = useRouter();
    const [picture, setPicture] = useState<File | null>(null)
    const [audio, setAudio] = useState<File | null>(null)

    const name = useInput("")
    const artist = useInput("")
    const text = useInput("")

    const sendNewTrack = () => {
        const formData = new FormData()
        formData.append('name', name.value)
        formData.append('artist', artist.value)
        formData.append('text', text.value)
        formData.append('picture', picture)
        formData.append('audio', audio)
        axios.post('http://localhost:5000/tracks', formData)
            .then(() => router.push('/tracks'))
    }

    const validTrackInfo = (): boolean => {
        return !(name.value && artist.value && text.value);

    }

    return (
        <MainLayout title={'Создание трека'}>
            <h1>Загрузка трека</h1>
            <StepWrapper finalStepAction={sendNewTrack}>
                <StepItem title={"Информация о треке"} error={validTrackInfo()}>
                    <Grid container direction={"column"} style={{padding: 20}}>
                        <h2>Информация о треке</h2>
                        <TextField
                            {...name}
                            style={{marginTop: 10}}
                            label={"Название трека"}
                        />
                        <TextField
                            {...artist}
                            style={{marginTop: 10}}
                            label={"Исполнитель трека"}
                        />
                        <TextField
                            {...text}
                            style={{marginTop: 10}}
                            label={"Слова трека"}
                            multiline
                            rows={3}
                        />
                    </Grid>
                </StepItem>
                <StepItem title={"Загрузка обложки"} error={!picture}>
                    <FileUpload
                        accept={"image/*"}
                        setFile={setPicture}>
                        <Button>Загрузите обложку</Button>
                    </FileUpload>
                </StepItem>
                <StepItem title={"Загрузка аудио фйла"} error={!audio}>
                    <FileUpload
                        accept={"audio/*"}
                        setFile={setAudio}>
                        <Button>Загрузите аудио</Button>
                    </FileUpload>
                </StepItem>
            </StepWrapper>

        </MainLayout>
    );
};

export default Create;