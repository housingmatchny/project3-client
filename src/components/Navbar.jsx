//navbar

import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {
    const { tenantId } = useParams() 

    const { logOutUser } = useContext(AuthContext)
  
    const getToken = () => {
    return localStorage.getItem("authToken");
  };

  return (
    <nav>
      {!getToken() && (
        <>
          <Link to="/">Home</Link>
          <Link to="/signup">Sign up</Link>
          <Link to="/signin">Sign in</Link>
        </>
      )}

      {getToken() && (
        <>
          <Link to="/profile/${tenantid}">Profile</Link>
          <Link to="/listings">Listings</Link>
          <button onClick={logOutUser} >Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
