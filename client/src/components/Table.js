import React, {useState, Fragment, useEffect} from 'react'
import json_data from '../mock-data.json'
import Search from "./Search"
import ReadOnlyRow from './ReadOnlyRow'
import EditableRow from './EditableRow'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';


const DataTable = () => {


  const [rows, setRows] = useState(json_data);

    useEffect(() => {
        axios.get(`http://localhost:8080/tracks`)
        .then(res => {
            const data = res.data;
            setRows(data);
            })
        .catch(err => {
            console.log(err)
        })
    }, [])

  //this is for edit row
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState(
      {
        id: "",
        name: "", 
        popularity: "",
        duration_ms: "", 
        explicit: "", 
        artists: "", 
        id_artists: "", 
        release_date: "", 
        danceability: "", 
        energy: "", 
        key: "", 
        loudness: "", 
        mode: "", 
        speechiness: "", 
        acousticness: "", 
        instrumentalness: "", 
        liveness: "", 
        valence: "", 
        tempo: "", 
        time_signature: ""

      }
  )
  
  const onSearchHandler = (newData) => {
	  setRows(newData)
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

  const handleEditFormChange = (event) => {
    event.preventDefault();

    // get the name of the field from event
    const fieldName = event.target.getAttribute("name");

    //get the value store in the category
    const fieldValue = event.target.value;

    // copy existing data over
    const newFormData = { ...editFormData};

    // set index to new value
    newFormData[fieldName] = fieldValue;

    // update data
    setEditFormData(newFormData)

}

  const handleEditClick = (event, row) => {
      event.preventDefault();
      setEditId(row.id);

      const formValues = {
          id: row.id,
          name: row.name,
          popularity: row.popularity,
          duration_ms: row.duration_ms,
          explicit: row.explicit,
          artists: row.artists, 
          id_artists: row.id_artists, 
          release_date: row.release_date, 
          danceability: row.danceability, 
          energy: row.energy, 
          key: row.key, 
          loudness: row.loudness, 
          mode: row.mode, 
          speechiness: row.speechiness, 
          acousticness: row.acousticness, 
          instrumentalness: row.instrumentalness, 
          liveness:row.liveness,
          valence:row.valence,
          tempo: row.tempo,
          time_signature: row.time_signature
      }

      setEditFormData(formValues)
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedrow = {
        id: editFormData.id,
        name: editFormData.name,
        popularity: editFormData.popularity,
        duration_ms: editFormData.duration_ms,
        explicit: editFormData.explicit,
        artists: editFormData.artists, 
        id_artists: editFormData.id_artists, 
        release_date: editFormData.release_date, 
        danceability: editFormData.danceability, 
        energy: editFormData.energy, 
        key: editFormData.key, 
        loudness: editFormData.loudness, 
        mode: editFormData.mode, 
        speechiness: editFormData.speechiness, 
        acousticness: editFormData.acousticness, 
        instrumentalness: editFormData.instrumentalness, 
        liveness:editFormData.liveness,
        valence:editFormData.valence,
        tempo: editFormData.tempo,
        time_signature: editFormData.time_signature
    }

    const newRow = [...rows]

    const index = rows.findIndex( (row)=> row.id === editId)

    newRow[index] = editedrow

    axios.post('http://localhost:8080/update', editedrow)
        .then(response => {
            console.log(response)
        })
        .catch(error=>{
            console.log(error)
        })
    setRows(newRow)

    setEditId(null)

    console.log(rows)
}

const handleEditCancel = (e) => {
    e.preventDefault();
    setEditId(null);
}

  return (
    <div>
    
        <form onSubmit={handleEditFormSubmit}>
            <Paper sx = {{width: '100%'}}>
            <TableContainer sx = {{maxHeight: 440}}>
                <Table stickyHeader aria-label = "sticky table">
                    <TableHead>
                        <TableRow>
                            <th> Action</th>
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
                            <Fragment>
                                {editId === row.id? 
                                <EditableRow editFormData = {editFormData} handleEditFormChange = {handleEditFormChange} handleEditCancel= {handleEditCancel} /> : 
                                <ReadOnlyRow rows = {row} handleEditClick = {handleEditClick}/>}
                                
                            </Fragment>
                        )
                        
                )}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        </form>

        <Search
			onSearchHandler={onSearchHandler}
		/>

        
        
    </div>

  );
}

export default DataTable
