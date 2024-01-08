//navbar

import { Link, useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {
  const { logOutUser, logOutUserSafe, user } = useContext(AuthContext);
  const navigate = useNavigate()

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const handleSubmit = () => {
    navigate("/signin");
  };

  // const [isSticky, setSticky] = useState(false)

  //handle sticky navbar when we start to scroll; not needed
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const offset = window.scrollY; //total height you have scrolled on the Y-axis
  //     if(offset > 0){
  //       setSticky(true)
  //     } else{
  //       setSticky(false)
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.addEventListener("scroll", handleScroll);
  //   }
  // },[])


  return (
    <>
    {!getToken() && (
      
      <div className="navbar shadow-sm bg-base-100 fixed top-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out">
        {/* <div className={`navbar ${isSticky ? "fixed top-0 left-0 right-0 z-10 shadow-md bg-base-100 transition-all duration-300 ease-in-out" : ""}`}> */}
          <div className="navbar-start">

          {/* smaller screens */}
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="link link-hover">
                  <Link to="/signin">Sign In</Link>
                </li>
                {/* <li>
                  <a>Parent</a>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Item 3</a>
                </li> */}
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost text-xl"><span aria-label="company name">HousingMatch</span></Link>
          </div>

          {/* larger screens */}
          <div className="navbar-end hidden md:flex gap-4">
              <Link to="/signin" className="shadow bg-base-100 rounded-lg font-medium text-sm px-5 py-2.5 mb-2 link link-hover tracking-tight">Sign In</Link>
              <Link to="/signin" className="focus:outline-none tracking-tight text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 link link-hover">Get Started</Link>
            {/* <ul className="menu menu-horizontal px-1"> */}
              {/* <li>
                <a>Item 1</a>
              </li>
            {/* </ul> */}
          </div>
          {/* <div className="navbar-end">
            <a className="btn btn-primary" href="/signin">Sign In</a>
          </div> */}
        </div>
      
    )}

    {getToken() && user && (
      // <div className={`navbar ${isSticky ? "fixed top-0 left-0 right-0 z-10 shadow-md bg-base-100 transition-all duration-300 ease-in-out" : ""}`}>
      <div className="navbar shadow-sm bg-base-100 fixed top-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="link link-hover">
              <Link to={`/profile/${user._id}`}>
                Profile
              </Link>
              </li>
              <li className="link link-hover">
              <Link to="/listings">
                Matches
              </Link>
              </li>
              <li>
                <button className="link link-hover" onClick={logOutUserSafe}>Exit to Google</button>
              </li>
              <li>
                <button className="link link-hover" onClick={logOutUser}>Log Out</button>
              </li>
            </ul>
          </div>
          <Link to="/listings" className="btn btn-ghost text-xl"><span aria-label="company name">HousingMatch</span></Link>
        </div>

        {/* larger screens */}
        <div className="navbar-end hidden md:flex">
          <ul className="menu menu-horizontal gap-2">
            <li className="link link-hover">
            <Link to={`/profile/${user._id}`}>
              Profile
            </Link>
            </li>
            <li className="link link-hover">
            <Link to="/listings">
              Matches
            </Link>
            </li>
          </ul>
          <div className="navbar-end flex items-center ml-4 gap-4">
            <div className="md:tooltip md:tooltip-bottom md:tooltip-error" data-tip="Safety exit">
              <button className="btn focus:outline-none tracking-tight text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 flex items-center gap-2 link link-hover" onClick={logOutUserSafe}>Exit to Google<ImExit /></button>
            </div>
            <button className="btn focus:outline-none tracking-tight text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 link link-hover" onClick={logOutUser}>Log Out</button>
          </div>

        </div>

      </div>
    )}

      {/* {!getToken() && (
        <nav className="flex items-center justify-between p-6 lg:px-8 z-50">
          <Link to={"/"} className="mr-4 z-50">
            HousingMatch
          </Link>
          <Link to={"/signin"} className="mr-4 z-50">
            Sign up/Sign in
          </Link>
        </nav>
      )} */}

      {/* {getToken() && (
        <nav
          className="flex items-center justify-center p-6 lg:px-8 z-50"
          aria-label="Global"
        >
          {user && (
            <Link to={`/profile/${user._id}`} className="mr-4">
              Profile
            </Link>
          )}
          <Link to="/listings" className="mr-4">
            Listings
          </Link>

          <button onClick={logOutUser}>Logout</button>
        </nav>
      )} */}
    </>
  );
};

export default Navbar;
