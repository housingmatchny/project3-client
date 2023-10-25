// import './App.css'
// import { useState } from 'react'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
      <div>
        <Navbar />
        <h1>HousingMatch</h1>

        <Routes>
          
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/profile/:tenantId' element={<Profile />} />

        </Routes>
      </div>
  )
}

export default App
