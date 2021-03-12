import * as PlayActionCreators from './player/playerActions'
import * as TracksActionCreators from './tracks/trackActions'
import * as PlayListActionCreators from './playList/playListActions'

export default {
    ...PlayActionCreators,
    ...TracksActionCreators,
    // ...PlayListActionCreators
}