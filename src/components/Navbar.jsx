//navbar

import { Link, useParams } from "react-router-dom";

const Navbar = () => {
    const { tenantId } = useParams() 
  
    const getToken = () => {
    return localStorage.getItem("authToken");
  };

  return (
    <nav>
      {!getToken() && (
        <>
          <Link to="/">Home</Link>
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Sign in</Link>
        </>
      )}

      {getToken() && <Link to="/profile/${tenantid}">Profile</Link>}
    </nav>
  );
};

export default Navbar;
