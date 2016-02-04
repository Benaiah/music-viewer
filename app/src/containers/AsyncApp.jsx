import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchSongs, fetchSong } from '../actions'
import SongList from '../components/SongList'
import SelectedSong from '../components/SelectedSong'


class AsyncApp extends Component {
  constructor(props) {
    super(props)
  }

  songClickAction (song) {
    const { dispatch } = this.props
    dispatch(fetchSong(song))
  }
  
  componentDidMount() {
    const { dispatch, songs } = this.props
    dispatch(fetchSongs())
  }
  
  render () {
    const { dispatch, songs } = this.props
    return <div>
      <SongList songs={songs} />
      <SelectedSong />
    </div>
  }
}

function mapStateToProps (state) {
  const { songs } = state
  return { songs }
}

export default connect(mapStateToProps)(AsyncApp)
