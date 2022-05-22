import React from 'react'
import {Grid, Box, Card, CardContent, Typography} from '@mui/material'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useState} from 'react'

const InputPlayListNamePage = ({onGetStarted, changePage, page, playListName, changePlayListName}) => {


  const [fieldColor, setFieldColor] = useState('primary')
  const [name, setName] = useState('')

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      changePlayListName(name)
      setFieldColor('success')
    }
  }

  const change = (e) => {

    const fieldValue = e.target.value;
    setName(fieldValue);
  }


  return (
    <Card sx={{
      bgcolor: 'rgba(0, 0, 0, 0.7)',
      
    }}>

      <div> Current Play List Name is: {playListName}</div>
      <CardContent>
        <TextField fullWidth label="Play List Name" id="playListName" type='text' required='required' placeholder='Enter play list name'  
        onKeyDown={handleKeyDown}
        onChange={change}
        sx={{ input: { color: 'white' } }} 
        color={fieldColor}
        />
        
        
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