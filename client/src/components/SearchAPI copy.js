import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import {Grid, Box, Card, CardContent, Typography} from '@mui/material'
import { faRecordVinyl} from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';


//[:+:] --------  todo   --------------
//  [x] - get client ID and client Secret from spotify
//  [] - use said artist id and secret to create a token-retrieval function
//  [x] - Change original search function to return artist's id givin the name as a search input
//  [] - use artist id and a spotify API endpoint to get top tracks
//  [] - use artist id and a spotify API endpoint to get artist picture
//  [] - display picture with html



const Search = ({onSearchHandler}) => {

    // These are used to set global vars: setMyvar(JSinput)   -->   myvar := JSinput
    //  -> JSinput can now be accessible thourgh the html below as 'myvar'. 
    const [text_search, setTextSearch] = useState('')
    const [category, setCategory] = useState('')

    //these are used to set the token and top tracks
    const [token, setToken] = useState('');
    const [tracks, setTracks] = useState([]);

    // const [artistID0, setArtistID0] = useState('');
    // const [artistID1, setArtistID1] = useState('');
    // const [artistID2, setArtistID2] = useState('');


    const onSubmit = (e) => {
      e.preventDefault()
      if(!text_search){
          alert("Please enter a search")
          return
        }
        console.log(text_search)
        console.log(category)


        
		  // [+] -------  API call to Get artist IDs from CSV ---------------------//
		  axios.get(`http://localhost:8080/search`,
			  {params: {
						value: text_search,
						key: category
					}
			  })
        .then(res => {
          const data = res.data;
          const artistID0 = res.data[0].id;
          const artistID1 = res.data[1].id;
          const artistID2 = res.data[3].id;
          // setArtistID0()
          // setArtistID1()
          // setArtistID2()
          console.log(artistID0)
          console.log(artistID1)
          console.log(artistID2)
			    onSearchHandler(data)
        })
        .catch(err => {console.log(err)})






      

      //[+] -------  API call to Get token ----------------------------------//
     
        axios('https://accounts.spotify.com/api/token', 
        {
			    'method': 'POST',
			    'headers': {
				    'Content-Type':'application/x-www-form-urlencoded',
				    //'Authorization': 'Basic ' + (new Buffer('907afb2cd3ee4b5996626b2766fce28f' + ':' + 'Y84cab67efc4274ad981c831ec93aca').toString('base64')),
            //'Authorization' : 'Basic ' + btoa( '907afb2cd3ee4b5996626b2766fce28f' + ':' + 'Y84cab67efc4274ad981c831ec93aca')
            'Authorization' : 'Basic ' + Buffer.from( '907afb2cd3ee4b5996626b2766fce28f' + ':' + 'Y84cab67efc4274ad981c831ec93aca', 'base64')
			    },
			    data: 'grant_type=client_credentials'
		    }).then(tokenresponse => {
          console.log("token: ");
			    console.log(tokenresponse.data.access_token);
			    setToken(tokenresponse.data.access_token);
		    }).catch(error => console.log(error));





      // const result = await fetch('https://accounts.spotify.com/api/token', {
      //   method: 'POST',
      //   headers: {
      //       'Content-Type' : 'application/x-www-form-urlencoded', 
      //       'Authorization' : 'Basic ' + btoa( '907afb2cd3ee4b5996626b2766fce28f' + ':' + 'Y84cab67efc4274ad981c831ec93aca')
      //   },
      //   body: 'grant_type=client_credentials'
      // });
      // const data = await result.json();
      // console.log("Token: ");
      // console.log(data.access_token);
      // return data.access_token;











		console.log("hello")
    //resets the global vars
    setTextSearch('')
    setCategory('0')
    }


  return (

    <Card sx={{
        bgcolor: 'rgba(0, 0, 0, 0.7)',
        
      }}>
        <CardContent>
          <Grid container spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="space-between">
            <Grid item xs={4}>
              <Typography sx={{fontWeight: 600}} color='white' variant="h2">
                Search For a <FontAwesomeIcon icon={faFire} color="rgb(244, 123, 80)" /> Track
              </Typography>

              

            </Grid>
            <Grid item xs={4} sx={{
              textAlign: 'center'
            }} >
                <FontAwesomeIcon icon={faRecordVinyl} color='rgb(244, 123, 80)' size='6x'/>
                <Box sx={{
                  paddingTop: '20px'
                }}>
                  <Button variant="contained"> Get Started</Button>
                </Box>
            </Grid>
          </Grid>
        </CardContent>

        <CardContent>
            <Grid item xs={4} sx={{textAlign: 'center'}}>
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
            </Grid>
        </CardContent>
    </Card>
  )
}

export default Search