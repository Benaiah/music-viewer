import { combineReducers } from 'redux'
import {
  REQUEST_SONGS, RECEIVE_SONGS, SELECT_SONG, DISPLAY_SONG
} from './actions'

const initialState = {
  selectedSong: {
    name: '',
    text: ''
  },
  songs: {
    isFetching: true,
    items: []
  }
}

function selectedSong (state = initialState.selectedSong, action) {
  switch(action.type) {
  case SELECT_SONG:
    return Object.assign({}, state, {
      name: action.songName
    })
  case DISPLAY_SONG:
    return action.song
  default:
    return state
  }
}

function songs (state = initialState.songs, action) {
  switch(action.type) {
  case REQUEST_SONGS:
    return Object.assign({}, state, {
      isFetching: true
    })
  case RECEIVE_SONGS:
    return Object.assign({}, state, {
      isFetching: false,
      items: action.songs,
      lastUpdated: action.receivedAt
    })
  default:
    return state
  }
}

const rootReducer = combineReducers({selectedSong, songs})
export default rootReducer
