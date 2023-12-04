//navbar

// import { NavLink, Link, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
    // const { tenantId } = useParams() 

    const { logOutUser, user } = useContext(AuthContext)
  
    const getToken = () => {
    return localStorage.getItem("authToken");
    };

  return (
    <>
      {!getToken() && (
        <nav
          className="flex items-center justify-between p-6 lg:px-8 z-50"
          // aria-label="Global"
        >
          <Link to={"/"} className="mr-4 z-50">
            HousingMatch
          </Link>
          <Link to={"/signin"} className="mr-4 z-50">
            Sign up/Sign in
          </Link>
        </nav>
      )}

      {getToken() && (
        <nav
          className="flex items-center justify-center p-6 lg:px-8 z-50"
          aria-label="Global"
        >
        {
          user &&

            <Link to={`/profile/${user._id}`} className="mr-4">
              Profile
            </Link>
        }
            <Link to="/listings" className="mr-4">
              Listings
            </Link>
          
            <button onClick={logOutUser}>
              Logout
            </button>
        </nav>
      )}

      
    </>
  );
};



export default Navbar;
