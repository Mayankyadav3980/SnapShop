import React, { Children } from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ isUserLoggedIn, children }) => {
    // console.log('inside pr',isUserLoggedIn);
    
  if(isUserLoggedIn) return children;
  return <Navigate to='/signin'/>
};

export default ProtectedRoutes