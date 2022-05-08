import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {Grid, Box, FormControl, Input, InputAdornment, Card, CardContent, Typography} from '@mui/material'
import Button from '@mui/material/Button';


//[:+:] --------  todo   --------------
//  [x] - get client ID and client Secret from spotify
//  [x] - get token-retrieval function
//	[x] - search for artists using spotify api
//  [x] - display artist picture upon searching
//  [x] - generate top tracks, with "add to playlist" button for each track
//  [] - beautify
//  [] - implment "add to playlist" button for custom playlist creation

function SearchAPI() {
    const CLIENT_ID = "907afb2cd3ee4b5996626b2766fce28f"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [APIartists, setAPIartists] = useState([])
	const [tracks, setTracks] = useState([])

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
		console.log(token);
        setToken(token)
    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const searchArtists = async (e) => {

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
		<>
			<Card sx={{bgcolor: 'rgba(0, 0, 0, 0.7)'}}>
    		  <CardContent>
    		    <Grid container spacing={0} direction="row" alignItems="center" justifyContent="space-between">
    		      <Grid item xs={4}>
    		        <Typography sx={{fontWeight: 600}} color='white' variant="h3">
    		          Find an Artist
    		        </Typography>
					<Box>
						{token &&
							<FormControl variant="standard">
								<Input
									type="text" 
									onChange={e => setSearchKey(e.target.value)}
									startAdornment={
										<InputAdornment position="start">
											<FontAwesomeIcon icon={faMagnifyingGlass} color="rgb(244, 123, 80)" />
										</InputAdornment>
									}
								/>
								<Button variant="contained" size="small" sx={{marginTop: '10px'}} onClick={searchArtists}>Search</Button>
							</FormControl>
						}
					</Box>
					  {!token ?
							<a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Loginto Spotify</a>
							: <Button onClick={logout}>Logout</Button>
					}
    		      </Grid>
    		      <Grid item xs={8} >
					<Grid container spacing={0} direction="row" alignItems="center" justifyContent="space-between">
						<Grid item xs={6}>
							<Typography sx={{fontWeight: 800}} color='white' variant="h4">Artist </Typography>
							{renderArtists()}
						</Grid>
						<Grid item xs={6}>
							<Typography sx={{fontWeight: 800}} color='white' variant="h4">Tracks</Typography>
							{renderTracks()}
						</Grid>
					</Grid>
    		      </Grid>
    		    </Grid>
    		  </CardContent>
    		</Card>
		</>
    );
}

export default SearchAPI;