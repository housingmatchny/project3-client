// import { useState } from 'react'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import TenantProfile from './pages/TenantProfile'
import TenantPreferences from './pages/TenantPreferences'
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
  //if there is a token, allow access to the Outlet pages; otherwise, navigate user to sign in

  const IsLoggedOut = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/'/>
  }
  

  return (
      <div>
        <Navbar />

    
        <Routes>
          

          <Route element={<IsLoggedOut />}>

            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />

          </Route>

          <Route element={<IsLoggedIn />}>
            {/* way to protect the route while allowing the listings to render before someone signs in: if logged in, then will render all of the child elements below; otherwise, user will be redirected to sign in */}

            <Route path='/listings' element={<Listings />} />
            <Route path='/listings/details/:id' element={ <ListingDetails /> } />
            <Route path='/reviews/edit-review/:reviewId' element={<EditReview />} />
            {/* <Route path='/reviews' element={<Reviews />} /> */}
            <Route path='/profile/:tenantId' element={<TenantProfile />} />
            <Route path='/profile/preferences/:tenantId' element={ <TenantPreferences /> } />
            <Route path='/profile/personal/:tenantId' element={ <TenantPersonal /> } />

          </Route>
       
        </Routes>
        
        <Footer />
        

        
      </div>
  )
}

export default App
