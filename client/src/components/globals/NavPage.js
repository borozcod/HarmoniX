import React from 'react'
import {Grid, Container, Typography} from '@mui/material'
import Button from '@mui/material/Button';

const NavPage = ({changePage,page}) => {
  return (
    <Container maxWidth="lg" sx={{
        margin: '20px 0',
        bgcolor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '5px',
        padding: '20px'
      }}>
          <Grid container alignItems="center" spacing={0}>
                <Grid item xs = {11}> 
                    <Button varient='text' onClick = {()=>changePage(page-1)}>Previous</Button>
                </Grid>

                <Grid item xs = {1}>
                    <Button varient='text' onClick={()=>changePage(page+1)}> Next</Button>
                </Grid>
          </Grid>
        </Container>
  )
}

export default NavPage