import React, { PropTypes } from 'react'
import SongListItem from './SongListItem'

const SongList = ({songs, songClickAction}) => {
  return <ul className="song-list">
      {songs.items.map(song => <SongListItem key={song.slug} song={song} />)}
  </ul>
}

export default SongList
