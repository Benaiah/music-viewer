import React, { PropTypes } from 'react'
import SongListItem from './SongListItem'

const SongList = ({songs, songClickAction}) => {
  return <ul>
      {songs.items.map(song => <SongListItem key={song} song={song} />)}
  </ul>
}

export default SongList
