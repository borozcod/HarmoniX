import React from 'react'

const ReadOnlyRow = ({rows}) => {
  return (
    <tr>
      <td>{rows.id}</td>
      <td>{rows.name}</td>
      <td>{rows.popularity}</td>
      <td>{rows.duration_ms}</td>
      <td>{rows.explicit}</td>
      <td>{rows.artists}</td>
      <td>{rows.id_artists}</td>
      <td>{rows.release_date}</td>
      <td>{rows.danceability}</td>
      <td>{rows.energy}</td>
      <td>{rows.key}</td>
      <td>{rows.loudness}</td>
      <td>{rows.mode}</td>
      <td>{rows.speechiness}</td>
      <td>{rows.acousticness}</td>
      <td>{rows.instrumentalness}</td>
      <td>{rows.liveness}</td>
      <td>{rows.valence}</td>
      <td>{rows.tempo}</td>
      <td>{rows.time_signature}</td>

      
    </tr>
  )
}

export default ReadOnlyRow
