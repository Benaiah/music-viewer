import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const SelectedSong = ({song}) => {
  return <div style=>
    <h1>{song.name}</h1>
    <pre>
      {song.text}
    </pre>
  </div>
}

const mapStateToProps = (state, ownProps) => {
  return {
    song: state.selectedSong
  }
}

export default connect(mapStateToProps)(SelectedSong)
