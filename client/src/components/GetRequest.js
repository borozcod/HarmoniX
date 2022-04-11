import React from 'react';
import axios from 'axios';

import {useEffect} from 'react'
import {useState} from 'react'

const GetRequest = () =>{

    const [message, setMessage] = useState('')
    
      useEffect(() => {      
          axios.get(`http://localhost:8080/`)
            .then(res => {
                const message2 = res.data;
                setMessage({ message2 });
                console.log(message2)
                }
            )

        }, []
    )


      return (
        <ul>
          {message}
        </ul>
      )
}

export default GetRequest