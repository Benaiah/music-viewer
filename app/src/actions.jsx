import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'
import S from 'string'

export const REQUEST_SONGS = 'REQUEST_SONGS'
export function requestSongs() {
  return {
    type: REQUEST_SONGS
  }
}

export const RECEIVE_SONGS = 'RECEIVE_SONGS'
export function receiveSongs(json) {
  return {
    type: RECEIVE_SONGS,
    songs: json.songs,
    receivedAt: Date.now()
  }
}

export function fetchSongs() {
  return function(dispatch) {
    dispatch(requestSongs())
    return fetch("/api/songs")
      .then(response => { return response.json() })
      .then(data => {
        return {
          songs: data.songs.map((song) =>
            S(song).chompRight('.txt').s
          )
        }
      })
      .then(json => dispatch(receiveSongs(json)))
  }
}

export const SELECT_SONG = 'SELECT_SONG'
export function selectSong(songName) {
  return {
    type: SELECT_SONG,
    songName: songName
  }
}

export const DISPLAY_SONG = 'DISPLAY_SONG'
export function displaySong(song) {
  return {
    type: DISPLAY_SONG,
    song: song
  }
}

export function fetchSong(song) {
  return dispatch => {
    dispatch(selectSong(song))
    return fetch("/api/songs/" + song)
      .then(response => response.json())
      .then(json => dispatch(displaySong(json)))
  }
}
