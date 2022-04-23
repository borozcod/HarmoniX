import React from 'react'
import json_data from '../mock-data.json'
import Search from "./Search"
import EditButton from './EditButton'
import ReadOnlyRow from './ReadOnlyRow'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {useState} from 'react'



const DataTable = () => {


  const [rows, setRows] = useState(json_data);

  const [editable, setEditable] = useState(false);
  const [text, setText] = useState('Edit')
  
  const onSearchHandler = (newData) => {
	  setRows(newData)
  }

  const onClick = () =>{
    setEditable(!editable);
    if(editable){
        setText("Edit");
    }
    else{
        setText("Save")
    }
    console.log({rows})
  }


  const columns =  [
    {id: 'id', label: "Id", minWidth: 170},
    {id: 'name', label: "Name", minWidth: 170},
    {id: 'popularity', label: "Popularity", minWidth: 170},
    {id: 'duration_ms', label: "Duration_ms", minWidth: 170},
    {id: 'explicit', label: "Explicit", minWidth: 170},
    {
        label: 'Artists',
        id: 'artists',
        minWidth: 150
    },
    {
        label: 'Id_artists',
        id: 'id_artists',
        minWidth: 150
    },
    {
        label: 'Release_date',
        id: 'release_date',
        minWidth: 150
    },
    {
        label: 'Danceability',
        id: 'danceability',
        minWidth: 150
    },
    {
        label: 'Energy',
        id: 'energy',
        minWidth: 150
    },
    {
        label: 'Key',
        id: 'key',
        minWidth: 150
    },
    {
        label: 'Loudness',
        id: 'loudness',
        minWidth: 150
    },
    {
        label: 'Mode',
        id: 'mode',
        minWidth: 150
    },
    {
        label: 'Speechiness',
        id: 'speechiness',
        minWidth: 150
    },
    {
        label: 'Acousticness',
        id: 'acousticness',
        minWidth: 150
    },
    {
        label: 'Instrumentalness',
        id: 'instrumentalness',
        minWidth: 150
    },
    {
        label: 'Liveness',
        id: 'liveness',
        minWidth: 150
    },
    {
        label: 'Valence',
        id: 'valence',
        minWidth: 150
    },
    {
        label: 'Tempo',
        id: 'tempo',
        minWidth: 150
    },
    {
        label: 'Time_signature',
        id: 'time_signature',
        minWidth: 150
    },

  ]
    
  return (


    <div>
        <EditButton onClick = {onClick} text = {text}/>
        
        <Paper sx = {{width: '100%'}}>
        <TableContainer sx = {{maxHeight: 440}}>
            <Table stickyHeader aria-label = "sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                          <TableCell 
                            key = {column.id}
                            style = {{minWidth: column.minWidth}}
                          >
                              {column.label}
                          </TableCell>  
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows
                    .map((row) => (
                      <ReadOnlyRow rows = {row}/>
                    )
                      
              )}
                </TableBody>
            </Table>
        </TableContainer>
        </Paper>

        <Search
			onSearchHandler={onSearchHandler}
		/>

        
        
    </div>

  );
}

export default DataTable
