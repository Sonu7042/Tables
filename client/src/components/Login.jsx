import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'

const Login = () => {

  const navigate=useNavigate()

  const [user, setUser] = useState({ username: "", password: "" })


  const onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })

  }

  const handleSubmit = async (e) => {
    console.log(user)
    e.preventDefault()
    const response = await fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ username: user.username, password: user.password })
    })
    const json = await response.json()
    if(json.success){
      localStorage.setItem("token",json.token)
      navigate('/')

    }
   
  }


  return (
    <form onSubmit={handleSubmit} className='bg-dark text-white  mt-4 rounded p-5' style={{height:"450px", width:"400px", marginLeft:"35%"}} >
      <h2 className='text-center ' >Login</h2>
      <div className="mb-3 ">
        <label htmlFor="username" className="form-label">Username</label>
        <input type="text" className="form-control" id="username" name='username' aria-describedby="emailHelp" onChange={onchange} />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" name='password' id="password"  onChange={onchange} />
      </div>
      <button type="submit" className="btn btn-primary col-12 mt-4">Login</button>
      <p className='text-center mt-4 '>Don't have a account <br/><span ><Link style={{textDecoration:"none", fontWeight:"bold", fontSize:"18px" }} className='fw-4'  to="/signup">Sign Up</Link></span> here</p>
    </form>
  )
}

export default Login