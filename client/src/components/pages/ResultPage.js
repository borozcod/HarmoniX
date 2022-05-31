import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {Grid, Box, FormControl, Input, InputAdornment, Card, CardContent, Typography} from '@mui/material'
import Button from '@mui/material/Button';
import InputPlayListNamePage from './InputPlayListNamePage'


const ResultPage = ({onGetStarted, changePage, page}) => {


  const [playlist, setPlaylist] = useState([])


	const generatePlaylist = () => {
		axios.get(`http://localhost:8080/playlist`,
		{params: 
      {
				start: 0,
				limit: 10
			}
		}).then(res => {
        const data = res.data;
        console.log(data)
        setPlaylist(data)
    }).catch(err => {console.log(err)})
	}


  const renderPlaylist = () => {
		return playlist.map(track => (
			<Button variant="text" align="left" sx={{width:'100%'}}>
				<Grid container spacing={2} alignItems="center" >
					<Grid item sx={{textAlign:'left'}} xs={6}>
						<Typography align="left">{track.artists + "  -  " +track.name}</Typography>
					</Grid>
				</Grid>
			</Button>
        ))
    }



  return (
    <Card sx={{bgcolor: 'rgba(0, 0, 0, 0.7)',}}>
      <CardContent>
        <div>Results Page</div>
        <Grid item xs={8} >
					<Grid container spacing={0} direction="row" alignItems="flex-start" justifyContent="space-between">
						<Grid item xs={6}>
							<Typography sx={{fontWeight: 800}} color='white' variant="h4">Your Playlist</Typography>
							{renderPlaylist()}
						</Grid>
				  </Grid>
				</Grid>


        <Grid container spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="space-between">

          <Grid item xs = {2}> 
              <Button varient='text' onClick = {()=>changePage(page-1)}>Previous</Button>
          </Grid> 

          <Grid item xs = {2}>
            <Button varient='text' onClick={generatePlaylist}> Generate</Button>
          </Grid> 

          <Grid item xs = {2}>
            <Button varient='text' onClick={()=>onGetStarted(false)}> Cancel</Button>
          </Grid> 
          
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ResultPage