import React from 'react'
import datas from '../mock-data.json'
import {useState} from 'react'


const Table = () => {

  const [musicInfo, setMusicInfo] = useState(datas);
    
  return (
    <div className='app-container'>
        <table> 
            <thead> 
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Popularity</th>
                    <th>Duration_ms</th>

                </tr>
            </thead>

            {musicInfo.map((data) => ( 
                <tbody key={data.id}>
                

                <tr>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.popularity}</td>
                    <td>{data.duration_ms}</td>
                </tr>
            

            </tbody>
            ))}



        </table>
      

    </div>
  )
}

export default Table
