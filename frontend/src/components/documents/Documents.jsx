import React from 'react'
import { useNavigate } from 'react-router-dom'

const Documents = () => {
  const navigate = useNavigate()
  const coverpageHandle=()=>{
    navigate('../')
  }
  return (
    <div>
      <h1>Documents</h1>
      <button onClick={coverpageHandle}>Cover page</button>
    </div>
  )
}

export default Documents