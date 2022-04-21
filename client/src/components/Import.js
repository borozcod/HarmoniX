import React, { useState } from "react";
import axios from 'axios'

const InputFile = () => {

    const [file, setFile] = useState('Choose file');
    var formData = new FormData();

    const handleChange = (selectorFiles) =>
    {
        console.log(selectorFiles);
        formData.append('csv', selectorFiles);
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        setFile(selectorFiles.name);
    }

    const uploadPost = () => {
        axios.post(`http://localhost:8080/import`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }

    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <button className="input-group-text" id="inputGroupFileAddon01" onClick={uploadPost}>
            Upload
          </button>
        </div>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
            onChange={ (e) => handleChange(e.target.files[0]) }
          />
          <label className="custom-file-label" htmlFor="inputGroupFile01">
            {file}
          </label>
        </div>
      </div>
    );
  }

export default InputFile;