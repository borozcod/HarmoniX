import React from 'react'
import {useState} from 'react'
import axios from 'axios';

const Search = ({onSearchHandler}) => {

    const [text_search, setTextSearch] = useState('')
    const [category, setCategory] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()

        if(!text_search){
            alert("Please enter a search")
            return
        }

        console.log(text_search)
        console.log(category)
        
		// Api call
		axios.get(`http://localhost:8080/search`,
					{params: {
								value: text_search,
								key: category
							}
					}
			)
            .then(res => {
                const data = res.data;
                console.log(data)
				onSearchHandler(data)  
                })
			.catch(err => {
				console.log(err)
            })
		console.log("hello")

        setTextSearch('')
        setCategory('0')
    }


  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-group'>
            <label htmlFor='fromGroupExampleInput'>Search query</label>
            <input type= "text_search" 
            className = "form-control"
            id='formGroupExampleInput'
            value={text_search}
            onChange={(e) => setTextSearch(e.target.value)}
            />      
        </div>

        <div>
            <select className='browser-default custom-select' value = {category} onChange={(e) => setCategory(e.target.value)}>
                <option value= 'none'>Choose your option</option>
                <option value = 'id'> ID</option>
                <option value = 'name'> Name</option>
                <option value = 'popularity'> Popularity</option>
                <option value = 'duration_ms'> Duration time in ms</option>
                <option value = 'explicit'> Explicit</option>
                <option value = 'artists'> Artists</option>
                <option value = 'id_artists'> Id artists</option>
                <option value = 'release_date'> Release date</option>
                <option value = 'danceability'> Danceability</option>
                <option value = 'energy'> Energy</option>
                <option value = 'key'> Key</option>
                <option value = 'loudness'> Loudness</option>
                <option value = 'mode'> Mode</option>
                <option value = 'speechiness'>Speechiness</option>
                <option value = 'acousticness'>Acousticness</option>
                <option value = 'instrumentalness'>Instrumentalness</option>
                <option value = 'liveness'>Liveness</option>
                <option value = 'valence'>Valence</option>
                <option value = 'tempo'>Tempo</option>
                <option value = 'time_signature'>Time signature</option>

                
            </select>
        </div>
    </form>
  )
}

export default Search