import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = () => {

    const navigate=useNavigate()
 
    const [user, setUser]=useState({username:"", password:""})



    const onchange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})

    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const response=await fetch ("http://localhost:9000/signup",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({username:user.username, password:user.password})
        })
        const json=await response.json()
        if(json.success){
            localStorage.setItem("token",json.token)
          navigate('/')

        }
     
    }


    




    return (
        <form onSubmit={handleSubmit}  className='bg-dark text-white  mt-4 rounded p-5' style={{height:"450px", width:"400px", marginLeft:"35%"}}>
            <h2 className='text-center'>Signup</h2>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" name='username' id="username" aria-describedby="emailHelp" onChange={onchange} />  
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' id="password" onChange={onchange} />
            </div>
            <button type="submit" className="btn btn-primary col-12 mt-4">Sign Up</button>
        </form>
    )
}

export default Signup