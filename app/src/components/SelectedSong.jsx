import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const SelectedSong = ({song}) => {
  let chords
  if (song.chords.length > 0) {
    chords = <ul className="selected-song_chords">
      <li><strong>Chords:</strong></li>
      {song.chords.map((chord) => <li key={chord}>{chord}</li>)}
    </ul>
  } else {
    chords = ""
  }
  return <div className="selected-song">
    <h1 className="selected-song_header">{song.name}</h1>
    {chords}
    <pre className="selected-song_text">
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
