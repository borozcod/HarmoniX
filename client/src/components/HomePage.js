import React from 'react'
import "./homePage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import {Grid, Box, Card, CardContent, Typography} from '@mui/material'
import { faRecordVinyl} from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';

const HomePage = () => {

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
                Generate a <FontAwesomeIcon icon={faFire} color="rgb(244, 123, 80)" /> new playlist
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
      </Card>
  )
}

export default HomePage