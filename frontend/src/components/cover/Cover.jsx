import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cover = () => {
    const navigate = useNavigate()
    const signupHandle=()=>{
        navigate('../register')
    }
    const loginHandle=()=>{
        navigate('../login')
    }
    const documentsHandle=()=>{
        navigate('../documents')
    }
  return (
    <div>
        <h1>Coverrr paggeeee</h1>
        <button onClick={signupHandle}>Register</button>
        <button onClick={loginHandle}>Login</button>
        <button onClick={documentsHandle}>Documents</button>
    </div>
  )
}

export default Cover