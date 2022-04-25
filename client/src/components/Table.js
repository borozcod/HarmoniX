import React from 'react'
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

import {useState, Fragment} from 'react'

import axios from 'axios';



const DataTable = () => {
	
	const [rows, setRows] = useState(json_data);


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
		{id: 'id', label: "ID", minWidth: 170},
		{id: 'name', label: "Name", minWidth: 170},
		{id: 'popularity', label: "Popularity", minWidth: 170},
		{id: 'duration_ms', label: "Duration (ms)", minWidth: 170},
		{id: 'explicit', label: "Explicit", minWidth: 170},
		{id: 'artists', label: "Artists", minWidth: 150},
		{id: 'id_artists', label: "Artist ID", minWidth: 150},
		{id: 'release_date', label: "Release Date", minWidth: 150},
		{id: 'danceability', label: "Danceability", minWidth: 150},
		{id: 'energy', label: "Energy", minWidth: 150},
		{id: 'key', label: "Key", minWidth: 150},
		{id: 'loudness', label: "Loudness", minWidth: 150},
		{id: 'mode', label: "Mode", minWidth: 150},
		{id: 'speechiness', label: "Speechiness", minWidth: 150},
		{id: 'acousticness', label: "Acousticness", minWidth: 150},
		{id: 'instrumentalness', label: "Instrumentalness", minWidth: 150},
		{id: 'liveness', label: "Liveness", minWidth: 150},
		{id: 'valence', label: "Valence", minWidth: 150},
		{id: 'tempo', label: "Tempo", minWidth: 150},
		{id: 'time_signature', label: "Time Signature", minWidth: 150},
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
	
	const handleDeleteClick = (event, row) => {
		event.preventDefault();
		
		const deletedrow = {
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

		const newRow = [...rows]

		const index = rows.findIndex( (row)=> row.id === row.id)
		
		axios.post('http://localhost:8080/delete', deletedrow)
		.then(response => {
			console.log(response)
		})
		.catch(error=>{
			console.log(error)
		})
		
		newRow.splice(index, 1)
		setRows(newRow)
		
		console.log("Hello")
		console.log(rows)
		
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
									<ReadOnlyRow rows = {row} handleEditClick = {handleEditClick} handleDeleteClick = {handleDeleteClick} />}		
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
