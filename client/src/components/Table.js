import React from 'react'
import datas from '../mock-data.json'
//import {useState} from 'react'
import {MDBDataTable} from 'mdbreact'


const Table = () => {

  //const [musicInfo, setMusicInfo] = useState();

  const data = {
      columns:[
          {
              label: 'ID',
              field: 'id',
              sort: 'asc',
              width: 150
          },
          {
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Popularity',
            field: 'popularity',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Duration_ms',
            field: 'duration_ms',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Explicit',
            field: 'explicit',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Artists',
            field: 'artists',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Id_artists',
            field: 'id_artists',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Release_date',
            field: 'release_date',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Danceability',
            field: 'danceability',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Energy',
            field: 'energy',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Key',
            field: 'key',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Loudness',
            field: 'loudness',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Mode',
            field: 'mode',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Speechiness',
            field: 'speechiness',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Acousticness',
            field: 'acousticness',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Instrumentalness',
            field: 'instrumentalness',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Liveness',
            field: 'liveness',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Valence',
            field: 'valence',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Temp',
            field: 'temp',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Time_signature',
            field: 'time_signature',
            sort: 'asc',
            width: 150
        },


      ],

      rows: datas
  };
    
  return (


    <div>
        <MDBDataTable 
        scrollX
        bordered
        striped
        maxHeight='300px'
        data={data}
        />
    </div>

  );
}

export default Table
