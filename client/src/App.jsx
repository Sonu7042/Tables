// import './App.css'
import Navbar from "./components/Navbar"
import Signup from "./components/Signup"
import Home from "./components/Home"
import UserState from "./context/UserState"
import Login from "./components/Login"
import About from "./components/About"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {

  return (
    <>
      <Router>
        <UserState>
          <Navbar />
          <div className="container">

            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About/>}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>

            </Routes>



          </div>

        </UserState>
      </Router>
    </>

  )
}

export default App
