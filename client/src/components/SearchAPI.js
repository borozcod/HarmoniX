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
//  [x] - beautify
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
			<Button onClick= {()=>{generateTracks(artist.id)}} variant="text" align="left" sx={{width:'100%'}}>
				<Grid container spacing={2} alignItems="center" >
					<Grid item xs={3}>
							{artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
					</Grid>
					<Grid item sx={{textAlign:'left'}} xs={6}>
						<Typography align="left">{artist.name}</Typography>
						<Button size="small" variant="outlined">Search tracks</Button>
					</Grid>
				</Grid>
			</Button>
        ))
    }



    const renderTracks = () => {
		return tracks.map(track => (
			<Button variant="text" align="left" sx={{width:'100%'}}>
				<Grid container spacing={2} alignItems="center" >
					<Grid item xs={3}>
					{track.album.images.length ? <img width={"100%"} src={track.album.images[0].url} alt=""/> : <div>No Image</div>}
					</Grid>
					<Grid item sx={{textAlign:'left'}} xs={6}>
						<Typography align="left">{track.name}</Typography>
						<Button size="small" onClick= {()=>{add2Playlist(track)}} variant="outlined">Add to playlist</Button>
					</Grid>
				</Grid>
			</Button>
        ))
    }


	const add2Playlist = (track) => {

		console.log("add2Playlist accessed")
		console.log(track.id)
		var carveID = '35iwgR4jXetI318WEWsa1Q'

		axios.get(`http://localhost:8080/search`,
		{params: 
			{
				value: track.id,
				key: 'id'
			}
		}).then(res => {
			const data = res.data;
			console.log(data[0]) 
			if(data.length == 0){
				axios.post(`http://localhost:8080/playlist_add`,
				{	id: track.id,
					name: track.name, 
					popularity: track.popularity, 
					duration_ms: track.duration_ms, 
					explicit: track.explicit, 
					artists: track.artists[0]['name'], 
					id_artists: track.artists[0]['id'], 
					release_date: track.release_date, 
					danceability: track.danceability, 
					energy: track.energy, 
					key: track.key, 
					loudness: track.loudness, 
					mode: track.mode, 
					speechiness: track.speechiness, 
					acousticness: track.acousticness, 
					instrumentalness: track.instrumentalness, 
					liveness: track.liveness, 
					valence: track.valence,
					tempo: track.tempo, 
					time_signature: track.time_signature
				}).then(res => {
					const data = res.data;
					console.log(data)
					//onSearchHandler(data)  
				}).catch(err => {console.log(err)})
			} 
			else{
				axios.post(`http://localhost:8080/playlist_add`,data[0])
			}
		}).catch(err => {
			console.log(err)
		})



    }










    return (
		<>
			<Card sx={{bgcolor: 'rgba(0, 0, 0, 0.7)'}}>
    		  <CardContent>
    		    <Grid container spacing={0} direction="row" alignItems="flex-start" justifyContent="space-between">
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
									sx={{color: '#fff'}}
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
					<Grid container spacing={0} direction="row" alignItems="flex-start" justifyContent="space-between">
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


