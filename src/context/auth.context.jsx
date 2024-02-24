// src/context/auth.context.jsx

import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { get } from "../services/authService";

const AuthContext = createContext();

function AuthProviderWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate()

  const storeToken = (token) => { 
    //store JWT token in local storage (i.e., storing key-value pairs in a user's web browser)
    localStorage.setItem('authToken', token);
  }

  const removeToken = () => { 
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  }

  const authenticateUser = () => {   
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      get('/auth/verify')
      .then((response) => {
        // If the server verifies that the JWT token is valid  
        const user = response.data;
       // Update state variables        
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);        
      })
      .catch((error) => {
        // If the server sends an error response (invalid token) 
        // Update state variables 
        removeToken()        
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);        
      });      
    } else {
      // If the token is not available (or is removed)
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);      
    }   
  }
 
  const logOutUserSafe = () => {
    //changes the current browser location to Google, specific search: memory game; I'm feeling lucky didn't have a link
    //tried window.location.replace to redirect and replace the link history to show as Google. Button stopped working so I reverted back.
    // navigate('/') -- originally navigated to the home page upon exit       
    window.location.href = 'https://www.google.com/search?q=google+memory+game';
    // To log out the user, remove the token
    removeToken();
    // and update the state variables    
    authenticateUser();
  }  
  const logOutUser = () => {
    //changes the current browser location to Google
    //tried window.location.replace to redirect and replace the link history to show as Google. Button stopped working so I reverted back.
    navigate('/')     
    // To log out the user, remove the token
    removeToken();
    // and update the state variables    
    authenticateUser();
  }  
  
  useEffect(() => { 

    authenticateUser()

  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, setUser, storeToken, authenticateUser, logOutUser, logOutUserSafe, removeToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };
