import React, { PropTypes } from 'react'
import SongListItem from './SongListItem'

const SongList = ({songs, songClickAction}) => {
  return <ul className="song-list">
      {songs.items.slice()
            .sort((a, b) => {
              const tA = a.name.toUpperCase()
              const tB = b.name.toUpperCase()
              return (tA < tB) ? -1 : (tA > tB) ? 1 : 0
            })
            .map(song => <SongListItem key={song.slug} song={song} />)}
  </ul>
}

export default SongList
