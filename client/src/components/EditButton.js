import React from 'react'

const EditButton = ({onClick,text}) => {
  return (
    <button onClick={onClick}>
        {text}
    </button>
  )
}

export default EditButton
