import React, {useState, useEffect} from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import {Card, CardContent, Typography, Grid} from '@mui/material';
import {Box, InputLabel, MenuItem, FormControl, Select, Button} from '@mui/material';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, CategoryScale, LinearScale, BarElement);

const Analytics = () => {

    const [attribute, setAttribute] = useState('danceability');
    const [tab, setTab] = useState('pie');
    const [percentData, setPercentData] = useState([0,0,0,0,0,0,0,0,0,0]);
    const [genres, setGenres] = useState({"tmp": 0});

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
        
        axios.get(`http://localhost:8080/genres`)
        .then(res => {
            const data = res.data;
            const srotedG = [];

            for (var g in data) {
                srotedG.push([g, data[g]]);
            }

            srotedG.sort(function(a, b) {
                return b[1] - a[1];
            });

            const top100 = srotedG.slice(0, 30);
            const top100obj = {};
            for (let index = 0; index < top100.length; index++) {
                top100obj[top100[index][0]] = top100[index][1]
            }
            //console.log(top100obj);



            setGenres(top100obj);
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
            console.log(data)
            
        })
        .catch(err => {
            console.log(err)
        })
    
    };

    const pieData = {
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

    const barData = {
        labels: Object.keys(genres),
        datasets: [
          {
            label: '# of Votes',
            data: Object.values(genres),
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

      const baseStyle = {
        color: 'white', fontWeight: '600',
        borderRadius: '0px',
    }
    const activeStyle = {
        ...baseStyle,
        borderBottom: 'solid 2px #fff'
    }
    return(
        <Card sx={{
            bgcolor: 'rgba(0, 0, 0, 0.7)',
          }}>
            <CardContent>
                <Typography color='white' variant="h3" sx={{fontWeight: '600'}} >Analytics</Typography>
                <Grid container alignItems="center" spacing={0} sx={{marginBottom: '30px'}}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={0}>
                            <Grid item xs={2}>
                                <Button onClick={()=> setTab('pie')} varient="text" sx={tab === 'pie' ? activeStyle : baseStyle } size='small'>Pie Chart</Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Button onClick={()=> setTab('bar')} varient="text" sx={tab === 'bar' ? activeStyle : baseStyle } size='small'>Bar Chart</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    tab === 'pie' && (
                        <>
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
                                    <Pie data={pieData} />
                                </Box>
                            </Grid>
                        </Grid>
                        </>
                    )
                }
                {
                    tab === 'bar' && (
                        <>
                        <Typography color='white' sx={{marginBottom:'20px'}}>Top 30 genres</Typography>
                        <Box sx={{ maxWidth: 800}}>
                            <Bar data={barData} />
                        </Box>
                        </>
                    )
                }
            </CardContent>
        </Card>
    )
}

export default Analytics