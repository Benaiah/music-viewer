import React from 'react'
import { connect } from 'react-redux'
import { fetchSong } from '../actions'

const SongListItem = function ({song, onClick, isCurrentSong}) {
  let selectedClass
  isCurrentSong ? selectedClass = "selected" : selectedClass=""
  return <li className={selectedClass}>
    <a href="#" onClick={e => {
        e.preventDefault()
        onClick()
      }}>{song.name}</a>
  </li>
}

const mapStateToProps = (state, ownProps) => {
  let isCurrentSong
  ownProps.song.slug == state.selectedSong.slug ? isCurrentSong = true : isCurrentSong = false
  return { isCurrentSong }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(fetchSong(ownProps.song))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongListItem)
