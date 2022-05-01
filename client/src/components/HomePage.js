import React from 'react'
import "./homePage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import {Grid} from '@mui/material'
import { faRecordVinyl} from '@fortawesome/free-solid-svg-icons'
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react'
import { fontFamily } from '@mui/system'

const HomePage = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#fafafa',
      }
    },
  });




  return (
    <div className='bg-initial'>
      <div className='container'>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            Generate a 
          </Grid>
          <Grid item xs={4}> 
            <FontAwesomeIcon icon={faFire} color="rgb(244, 123, 80)" />
          </Grid>
          <Grid item xs={4}>
            <FontAwesomeIcon icon={faRecordVinyl} color = 'black' size='3x'/>
          </Grid>
          <Grid item xs={7}>
            new playlist
          </Grid>
          <Grid item xs = {4}> 
            <ThemeProvider theme={theme}>
              <Button varient="outlined" style={{backgroundColor: "rgb(244, 123, 80)"} }> Get Started</Button>
            </ThemeProvider>
          </Grid>
        </Grid>
      </div> 

      <div className='containerSmall'>
        <Grid container spacing={0}>
          <Grid item xs={0}>
            <FontAwesomeIcon icon={faWaveSquare} color='white' size='1.5x'/>
          </Grid>

          <Grid item xs = {3}>
              Harmonix
          </Grid>

          <ThemeProvider theme={theme}>
            <Grid item xs = {2}>
              <Button varient="text" style={{fontSize:'30px' ,fontFamily:'Lato'}} size='small'> Analytic</Button>
            </Grid>

            <Grid item xs = {2}>
              <Button varient="text" style={{fontSize:'30px' ,fontFamily:'Lato'}} size='small'> Generate</Button>
            </Grid>

            <Grid item xs = {3}>
              <Button varient="text" style={{fontSize:'30px' ,fontFamily:'Lato'}} size='small'> Table</Button>
            </Grid>
            </ThemeProvider>
        </Grid>
      </div>
      
    </div>
  )
}

export default HomePage