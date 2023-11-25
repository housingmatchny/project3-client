//navbar

import { NavLink, Link, useParams } from "react-router-dom";
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
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <NavLink to="/">
            HousingMatch
          </NavLink>
          <NavLink to="/signin">
            Sign up/Sign in
          </NavLink>
        </nav>
      )}

      {getToken() && (
        <nav
          className="flex items-center justify-center p-6 lg:px-8"
          aria-label="Global"
        >
        {
          user &&

            <NavLink to={`/profile/${user._id}`} className="mr-4">
              Profile
            </NavLink>
        }
            <NavLink to="/listings" className="mr-4">
              Listings
            </NavLink>
          
            <button onClick={logOutUser}>
              Logout
            </button>
        </nav>
      )}

      
    </>
  );
};



export default Navbar;
