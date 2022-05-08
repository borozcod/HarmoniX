import React from 'react'
import {Grid, Box, Card, CardContent, Typography} from '@mui/material'
import Button from '@mui/material/Button';

const InputPlayListNamePage = ({onGetStarted, changePage, page}) => {
  return (
    <Card sx={{
      bgcolor: 'rgba(0, 0, 0, 0.7)',
      
    }}>
      <CardContent>
        <div>InputPlayListNamePage</div>
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