// import { useState } from 'react'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import TenantProfile from './pages/TenantProfile'
import TenantPersonal from './pages/TenantPersonal'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Listings from './pages/Listings'
import EditReview from './pages/EditReview'
import ListingDetails from './pages/ListingDetails'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import './App.css' 

function App() {

  const getToken = () => {
    return localStorage.getItem("authToken");
    };
    
  const IsLoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/signin'/>
  }

  const IsLoggedOut = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/'/>
  }
  

  return (
      <div>
        <Navbar />

    
        <Routes>
          
          <Route path='/' element={<Home />} />

          <Route element={<IsLoggedOut />}>

            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />

          </Route>

          <Route element={<IsLoggedIn />}>

            <Route path='/listings' element={<Listings />} />
            <Route path='/listings/details/:id' element={ <ListingDetails /> } />
            <Route path='/reviews/edit-review/:reviewId' element={<EditReview />} />
            {/* <Route path='/reviews' element={<Reviews />} /> */}
            <Route path='/profile/:tenantId' element={<TenantProfile />} />
            <Route path='/profile/personal/:tenantId' element={ <TenantPersonal /> } />

          </Route>
       
        </Routes>
        
        <Footer />
        

        
      </div>
  )
}

export default App
