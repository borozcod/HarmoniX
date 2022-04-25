import React from 'react'

const AddRow = ({addFormData, handleAddFormChange, handleAddClick}) => {
  return (
    <tr>
      <td>
        <button type='button' onClick={handleAddClick}>Add</button>
      </td>

      <td>
        <input type = 'text'  placeholder='Enter id' name='id'  onChange={handleAddFormChange} value = {addFormData.id}> 
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter name' name='name'  onChange={handleAddFormChange} value = {addFormData.name}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter popularity' name='popularity'onChange={handleAddFormChange} value = {addFormData.popularity}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter duration_ms' name='duration_ms'onChange={handleAddFormChange} value = {addFormData.duration_ms}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter explicit' name='explicit'onChange={handleAddFormChange} value = {addFormData.explicit}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter artists' name='artists'onChange={handleAddFormChange} value = {addFormData.artists}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter id_artists' name='id_artists'onChange={handleAddFormChange} value = {addFormData.id_artists}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter release_date' name='release_date'onChange={handleAddFormChange} value = {addFormData.release_date}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter danceability' name='danceability'onChange={handleAddFormChange} value = {addFormData.danceability}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter energy' name='energy'onChange={handleAddFormChange} value = {addFormData.energy}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter key' name='key'onChange={handleAddFormChange} value = {addFormData.key}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter loudness' name='loudness'onChange={handleAddFormChange} value = {addFormData.loudness}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter mode' name='mode'onChange={handleAddFormChange} value = {addFormData.mode}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter speechiness' name='speechiness'onChange={handleAddFormChange} value = {addFormData.speechiness}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter acousticness' name='acousticness'onChange={handleAddFormChange} value = {addFormData.acousticness}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter instrumentalness' name='instrumentalness'onChange={handleAddFormChange} value = {addFormData.instrumentalness}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter liveness' name='liveness'onChange={handleAddFormChange} value = {addFormData.liveness}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter valence' name='valence'onChange={handleAddFormChange} value = {addFormData.valence}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter tempo' name='tempo'onChange={handleAddFormChange} value = {addFormData.tempo}>
        </input>
      </td>
      <td>
        <input type = 'text'  placeholder='Enter time_signature' name='time_signature'onChange={handleAddFormChange} value = {addFormData.time_signature}>
        </input>
      </td>

    </tr>
  )
}

export default AddRow
