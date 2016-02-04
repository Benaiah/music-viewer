import { combineReducers } from 'redux'
import {
  REQUEST_SONGS, RECEIVE_SONGS, SELECT_SONG, DISPLAY_SONG
} from './actions'
import ChordParser from 'chord-parser'

const initialState = {
  selectedSong: {
    name: '',
    text: '',
    chords: []
  },
  songs: {
    isFetching: true,
    items: []
  }
}

function selectedSong (state = initialState.selectedSong, action) {
  switch(action.type) {
  case SELECT_SONG:
    return action.song
  case DISPLAY_SONG:
    let s = action.song
    let tabs = new ChordParser(s.text)
    s.chords = tabs.unique()
    return s
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
