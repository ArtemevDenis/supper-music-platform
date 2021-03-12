import React, {FC, useEffect} from 'react';
import {AppProps} from 'next/app';
import styled from "../styles/Player.module.sass";
import {Container} from "@material-ui/core";
import Player from "../components/player/Player";
import store, {wrapper} from "../store";
import ContextPlayerWrap from "../context/ContextPlayerWrap";
import {Provider} from "react-redux";


const WrappedApp: FC<AppProps> = ({Component, pageProps}) => {
    useEffect(() => {
        console.log('render')
    }, [])
    return (
        // <Provider store={store}>
            <ContextPlayerWrap>
                <Component {...pageProps} />
                <div className={styled.player}>
                    <Container fixed>
                        <Player/>
                    </Container>
                </div>
            </ContextPlayerWrap>
        // </Provider>
    )
    }
;

export default wrapper.withRedux(WrappedApp);