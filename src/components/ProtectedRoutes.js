import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ isUserLoggedIn, children }) => {
  if (isUserLoggedIn) return children;
  return <Navigate to="/signin" />;
};

export default ProtectedRoutes;
