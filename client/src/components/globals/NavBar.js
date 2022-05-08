import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Grid, Container, Typography} from '@mui/material'
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';

const NavBar = ({changeTab, active, changePage, page, started, onGetStarted}) => {

    const baseStyle = {
        color: 'white', fontWeight: '600',
        borderRadius: '0px',
    }
    const activeStyle = {
        ...baseStyle,
        borderBottom: 'solid 2px #fff'
    }

  return (
    <Container maxWidth="lg" sx={{
        margin: '20px 0',
        bgcolor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '5px',
        padding: '20px'
      }}>
          <Grid container alignItems="center" spacing={0}>
                <Grid item xs={2}>
                    <Typography color="white" sx={{fontWeight: '600'}}><FontAwesomeIcon icon={faWaveSquare} color='white' size='1.5x'/> Harmonix</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Grid container justifyContent="center" spacing={0}>

                        {
                            started? 
                            <Grid item xs = {2}> 
                                <Button varient='text' onClick = {()=>changePage(page-1)}>Previous</Button>
                            </Grid> :
                            null
                        }
                        <Grid item xs={2}>
                            <Button onClick={()=> changeTab('analytic')} varient="text" sx={active === 'analytic' ? activeStyle : baseStyle } size='small'>Analytic</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button onClick={()=> changeTab('generate')} varient="text" sx={active === 'generate' ? activeStyle : baseStyle } size='small'>Generate</Button>
                        </Grid>

                        <Grid item xs={2}>
                            <Button onClick={()=> changeTab('table')} varient="text" sx={active === 'table' ? activeStyle : baseStyle } size='small'>Table</Button>
                        </Grid>
                        
                        {
                            started?
                            <Grid item xs = {2}>
                                <Button varient='text' onClick={()=>changePage(page+1)}> Next</Button>
                            </Grid> :
                            null
                        }    

                        {
                            started?
                            <Grid item xs = {2}>
                                <Button varient='text' onClick={()=>onGetStarted(false)}> Cancel</Button>
                            </Grid> :
                            null
                        } 
                        

                    </Grid>
                </Grid>
                <Grid item xs={2}></Grid>
          </Grid>
        </Container>
  )
}

export default NavBar