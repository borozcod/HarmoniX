import React, {useState, useEffect} from 'react'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {Card, CardContent, Typography, Grid} from '@mui/material';
import {Box, InputLabel, MenuItem, FormControl, Select} from '@mui/material';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip);

const Analytics = () => {

    const [attribute, setAttribute] = useState('danceability');
    const [percentData, setPercentData] = useState([0,0,0,0,0,0,0,0,0,0]);

    useEffect(()=> {
        axios.get(`http://localhost:8080/distribution`,
            {params: {
                colName: 'danceability',
            }
        }
        )
        .then(res => {
            const data = res.data;
            setPercentData(data);
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleChange = (event) => {
        setAttribute(event.target.value);
        axios.get(`http://localhost:8080/distribution`,
            {params: {
                colName: event.target.value,
            }
        }
        )
        .then(res => {
            const data = res.data;
            setPercentData(data);
        })
        .catch(err => {
            console.log(err)
        })
    
    };

    const data = {
        labels: ['0.0 - 0.1', '0.1 - 0.2', '0.2 - 0.3', '0.3 - 0.4', '0.4 - 0.5', '0.5 - 0.6', '0.6 - 0.7', '0.7 - 0.8','0.8 - 0.9', '0.9 - 0.99'],
        datasets: [
          {
            label: '# of Votes',
            data: percentData,
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
                <Typography color='white' variant="h3" sx={{fontWeight: '600'}} >Analytics</Typography>
                <Typography color='white' sx={{marginBottom:'20px'}}>Displaying the distribution of of values grouped</Typography>
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