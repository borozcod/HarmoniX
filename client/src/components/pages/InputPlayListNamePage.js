import React from 'react'
import {Grid, Box, Card, CardContent, Typography} from '@mui/material'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const InputPlayListNamePage = ({onGetStarted, changePage, page, playListName, changePlayListName}) => {
  return (
    <Card sx={{
      bgcolor: 'rgba(0, 0, 0, 0.7)',
      
    }}>
      <CardContent>
        <TextField fullWidth label="Play List Name" id="playListName" type='text' required='required' placeholder='Enter play list name'  onChange={changePlayListName} value = {playListName}/>
        <Grid container spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="space-between">

          <Grid item xs = {2}> 
              <Button varient='text' onClick = {()=>changePage(page-1)}>Previous</Button>
          </Grid> 

          <Grid item xs = {2}>
            <Button varient='text' onClick={()=>changePage(page+1)}> Next</Button>
          </Grid> 

          <Grid item xs = {2}>
            <Button varient='text' onClick={()=>onGetStarted(false)}> Cancel</Button>
          </Grid> 
          
        </Grid>
      </CardContent>
    </Card>
  )
}

export default InputPlayListNamePage