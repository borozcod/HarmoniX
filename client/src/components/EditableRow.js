import React from 'react'

const EditableRow = ({editFormData, handleEditFormChange}) => {
  return (
    <tr>
      <td>
        <button type = 'submit'>Save</button>
      </td>

      <td>
        <input type = 'text' required = 'required' placeholder='Enter id' name='id'  onChange={handleEditFormChange} value = {editFormData.id}> 
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter name' name='name'  onChange={handleEditFormChange} value = {editFormData.name}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter popularity' name='popularity'onChange={handleEditFormChange} value = {editFormData.popularity}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter duration_ms' name='duration_ms'onChange={handleEditFormChange} value = {editFormData.duration_ms}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter explicit' name='explicit'onChange={handleEditFormChange} value = {editFormData.explicit}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter artists' name='artists'onChange={handleEditFormChange} value = {editFormData.artists}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter id_artists' name='id_artist'onChange={handleEditFormChange} value = {editFormData.id_artists}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter release_date' name='release_date'onChange={handleEditFormChange} value = {editFormData.release_date}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter danceability' name='danceability'onChange={handleEditFormChange} value = {editFormData.danceability}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter energy' name='energy'onChange={handleEditFormChange} value = {editFormData.energy}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter key' name='key'onChange={handleEditFormChange} value = {editFormData.key}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter loudness' name='loudness'onChange={handleEditFormChange} value = {editFormData.loudness}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter mode' name='mode'onChange={handleEditFormChange} value = {editFormData.mode}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter speechiness' name='speechiness'onChange={handleEditFormChange} value = {editFormData.speechiness}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter acousticness' name='acousticness'onChange={handleEditFormChange} value = {editFormData.acousticness}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter instrumentalness' name='instrumentalness'onChange={handleEditFormChange} value = {editFormData.instrumentalness}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter liveness' name='liveness'onChange={handleEditFormChange} value = {editFormData.liveness}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter valence' name='valence'onChange={handleEditFormChange} value = {editFormData.valence}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter tempo' name='tempo'onChange={handleEditFormChange} value = {editFormData.tempo}>
        </input>
      </td>
      <td>
        <input type = 'text' required = 'required' placeholder='Enter time_signature' name='time_signature'onChange={handleEditFormChange} value = {editFormData.time_signature}>
        </input>
      </td>

    </tr>
  )
}

export default EditableRow
