import React from 'react'
import {useState} from 'react'

const Search = () => {

    const [text, setText] = useState('')
    const [category, setCategory] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()

        if(!text){
            alert("Please enter a search")
            return
        }

        console.log(text)
        console.log(category)
        //api call maybe?

        setText('')
        setCategory('0')
    }





  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-group'>
            <label htmlFor='fromGroupExampleInput'>Search query</label>
            <input type= "text" 
            className = "form-control"
            id='formGroupExampleInput'
            value={text}
            onChange={(e) => setText(e.target.value)}
            />      
        </div>

        <div>
            <select className='browser-default custom-select' value = {category} onChange={(e) => setCategory(e.target.value)}>
                <option value= '0'>Choose your option</option>
                <option value = '1'> ID</option>
                <option value = '2'> Name</option>
                <option value = '3'> Popularity</option>
                <option value = '4'> Duration_ms</option>
                <option value = '5'> Explicit</option>
                <option value = '6'> Artists</option>
                <option value = '7'> Id_artists</option>
                <option value = '8'> Release_date</option>
                <option value = '9'> Danceability</option>
                <option value = '10'> Energy</option>
                <option value = '11'> Key</option>
                <option value = '12'> Loudness</option>
                <option value = '13'> Mode</option>
                <option value = '14'>Speechiness</option>
                <option value = '15'>Acousticness</option>
                <option value = '16'>Instrumentalness</option>
                <option value = '17'>Liveness</option>
                <option value = '18'>Valence</option>
                <option value = '19'>Temp</option>
                <option value = '20'>Time_signature</option>

                
            </select>
        </div>
    </form>
  )
}

export default Search