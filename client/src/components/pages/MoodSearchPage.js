import React from 'react'
import {Grid, Box, Card, CardContent, Typography} from '@mui/material'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useState} from 'react'
import "./mood.css"

const MoodSearchPage = ({onGetStarted, changePage, page, changeMoodSearch}) => {


  const [fieldColor, setFieldColor] = useState('primary')
  const [search, setSearch] = useState('')
  const [field, setField] = useState([])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      changeMoodSearch(search);
      Seach();
    }
  }

  const Seach = () => {
    if(search.includes("chill")){
      setField([...field,"chill"])
    }
    // add more can use map
  }

  const change = (e) => {
    const fieldValue = e.target.value;
    setSearch(fieldValue);
    highLightedSearch(search)

  }

  const list = ['chill'];

  const highLightedSearch = (string) =>{
    var  highLightString = string;
    list.forEach((f,i)=>{
      highLightString = highLightString.replace(f, `<span id="word-${i}">${f}</span>`)
      })
      console.log(highLightString);
      return <div dangerouslySetInnerHTML={{ __html: highLightString }} />
  }


  return (
    <Card sx={{
      bgcolor: 'rgba(0, 0, 0, 0.7)',
      
    }}>
      <CardContent>
        <TextField fullWidth label="Mood Search" id="moodsearch" type='text' required='required' placeholder='Enter Search'  
        onKeyDown={handleKeyDown}
        onChange={change}
        sx={{ input: { color: 'white' } }} 
        color={fieldColor}
        />
       
        <Typography color='white'> {highLightedSearch(search)} </Typography>
       
       
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

export default MoodSearchPage