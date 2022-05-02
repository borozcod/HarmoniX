import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {Card, CardContent, Typography, Grid} from '@mui/material';
import {Box, InputLabel, MenuItem, FormControl, Select} from '@mui/material';
import {useState} from 'react'

ChartJS.register(ArcElement, Tooltip);

const Analytics = () => {

    const [attribute, setAttribute] = useState('danceability');

    const handleChange = (event) => {
      setAttribute(event.target.value);
    };
  
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    return(
        <Card sx={{
            bgcolor: 'rgba(0, 0, 0, 0.7)',
          }}>
            <CardContent>
                <Typography color='white' variant="h3" sx={{fontWeight: '600'}} gutterBottom>Analytics</Typography>
                <Grid container spacing={2} justifyContent="space-between">
                    <Grid item xs={2}>
                        <Box sx={{ maxWidth: 120}}>
                            <FormControl fullWidth>
                                <InputLabel sx={{color: 'rgb(244, 123, 80)'}} id="demo-simple-select-label">Attribute</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={attribute}
                                    label="Attribute"
                                    onChange={handleChange}
                                    sx={{
                                        color: 'white',
                                        borderColor: 'rgb(244, 123, 80)'
                                    }}
                                >
                                <MenuItem value='danceability'>Danceability</MenuItem>
                                <MenuItem value='energy'>Energy</MenuItem>
                                <MenuItem value='speechiness'>Speechiness</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box sx={{ maxWidth: 300}}>
                            <Pie data={data} />
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Analytics