import React from 'react'
import { connect } from 'react-redux'
import { fetchSong } from '../actions'

const SongListItem = function ({song, onClick}) {
  return <li>
    <a href="#" onClick={e => {
        e.preventDefault()
        onClick()
      }}>{song}</a>
  </li>
}

const mapStateToProps = (state, ownProps) => {
  return {}
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
