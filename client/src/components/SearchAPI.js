import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {Grid, Box, Card, CardContent, Typography} from '@mui/material'
import { faRecordVinyl} from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';
import { bool } from 'prop-types';


//[:+:] --------  todo   --------------
//  [x] - get client ID and client Secret from spotify
//  [x] - get token-retrieval function
//	[x] - search for artists using spotify api
//  [x] - display artist picture upon searching
//  [x] - generate top tracks, with "add to playlist" button for each track
//  [] - beautify
//  [] - implment "add to playlist" button for custom playlist creation



function App() {
    const CLIENT_ID = "907afb2cd3ee4b5996626b2766fce28f"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [APIartists, setAPIartists] = useState([])
    const [CSVartists, setCSVartists] = useState([])
	const [tracks, setTracks] = useState([])
	const market = 'US';


    // const getToken = () => {
    //     let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
    //     let token = urlParams.get('access_token');
    // }

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        // getToken()
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
    }, [])






    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }




    const searchArtists = async (e) => {
        e.preventDefault()

        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })
        setAPIartists(data.artists.items)


		axios.get(`http://localhost:8080/search`,
		{params: {
				  value: searchKey,
				  key: 'artists'
			  }
		}).then(res => {
			const data = res.data;
			setCSVartists(data)
  		}).catch(err => {console.log(err)})
    }


	const generateTracks = (id) => {
		console.log(id)
		//display = !display;
		axios(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,{
			'method': 'GET',
			'headers': {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		}).then(trackresponse=> {
			console.log(trackresponse.data.tracks);
			setTracks(trackresponse.data.tracks);
		}).catch(error=> console.log(error))
	}



    const renderArtists = () => {
        return APIartists.map(artist => (
            <div key={artist.id} onClick= {()=>{generateTracks(artist.id)}}>
                {artist.images.length ? <img width={"20%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                {artist.name}
            </div>
        ))
    }

    const renderTracks = () => {
		return tracks.map(track => (
            <div key={track.id} >
                {track.album.images.length ? <img width={"10%"} src={track.album.images[0].url} alt=""/> : <div>No Image</div>}
                {track.name}
				<button>Add To Playlist</button>
            </div>
        ))
    }





    return (
        <div className="App">
            <header className="App-header">
                <h1>Harmonix</h1>


                
            </header>

			<Card sx={{bgcolor: 'rgba(0, 0, 0, 0.7)',}}>
    		  <CardContent>
    		    <Grid container spacing={0} direction="row" alignItems="center" justifyContent="space-between">
    		      <Grid item xs={4}>
    		        <Typography sx={{fontWeight: 600}} color='white' variant="h2">
    		          Find an Artist <FontAwesomeIcon icon={faMagnifyingGlass} color="rgb(244, 123, 80)" />

    		        </Typography>
    		      </Grid>
    		      <Grid item xs={8} sx={{textAlign: 'center'}} >
				  {!token ?
                    	<a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Loginto Spotify</a>
                    	: <button onClick={logout}>Logout</button>
				  }
                	  {token ?
                    	<form onSubmit={searchArtists}>
                        	<input type="text" onChange={e => setSearchKey(e.target.value)}/>
                        	<button type={"submit"}>Search</button>
                    	</form>
                       		: <h2>Please login</h2>
                	  }
    		      </Grid>
    		    </Grid>
    		  </CardContent>
    		</Card>


			<Card sx={{bgcolor: 'rgba(0, 0, 0, 0.7)',}}>
    		  <CardContent>
    		    <Grid container spacing={0} direction="row" alignItems="center" justifyContent="space-between">
    		      <Grid item xs={6}>
				  <Card sx={{bgcolor: 'rgba(0, 0, 0, 0.4)',}}>
				  	<Typography sx={{fontWeight: 800}} color='white' variant="h4">
    		          Artist 
    		        </Typography>
				  	{renderArtists()}
				  </Card>
    		      </Grid>
    		      <Grid item xs={6}>
				  <Card sx={{bgcolor: 'rgba(0, 0, 0, 0.4)',}}>
				  	<Typography sx={{fontWeight: 800}} color='white' variant="h4">
    		          Tracks 
    		        </Typography>
				  	{renderTracks()}
				  </Card>
    		      </Grid>
    		    </Grid>
    		  </CardContent>

    		</Card>















			<div class="row">
			  <div class="col-sm-6">
			    <div class="card">
			      <div class="card-body">
				  
			      </div>
			    </div>
			  </div>
			  <div class="col-sm-6">
			    <div class="card">
			      <div class="card-body">
				  
			      </div>
			    </div>
			  </div>
			</div>

        </div>

	    





    );
}

export default App;