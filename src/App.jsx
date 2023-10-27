// import './App.css'
// import { useState } from 'react'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import TenantProfile from './pages/TenantProfile'
import TenantPersonal from './pages/TenantPersonal'
import Navbar from './components/Navbar'
import Listings from './pages/Listings'
import EditReview from './pages/EditReview'
import ListingDetails from './pages/ListingDetails'
import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
      <div>
        <Navbar />
      

        <Routes>
          
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/listings' element={<Listings />} />
          <Route path='/listings/details/:id' element={ <ListingDetails /> } />
          <Route path='/reviews/edit-review/:reviewId' element={<EditReview />} />
          {/* <Route path='/reviews' element={<Reviews />} /> */}
          <Route path='/profile/:tenantId' element={<TenantProfile />} />
          <Route path='/profile/personal/:tenantId' element={ <TenantPersonal /> } />

        </Routes>

        
      </div>
  )
}

export default App
