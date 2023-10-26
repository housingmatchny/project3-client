// import './App.css'
// import { useState } from 'react'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import TenantProfile from './pages/TenantProfile'
import Navbar from './components/Navbar'
import Listings from './pages/Listings'
import Reviews from './pages/Reviews'
import ListingDetails from './pages/ListingDetails'
import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
      <div>
        <Navbar />
        
        <h1>Get matched to affordable housing</h1>

        <Routes>
          
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/listings' element={<Listings />} />
          <Route path='/reviews' element={<Reviews />} />
          <Route path='/profile/:tenantId' element={<TenantProfile />} />
          <Route path='/listings/details/:id' element={ <ListingDetails /> } />

        </Routes>

        
      </div>
  )
}

export default App
