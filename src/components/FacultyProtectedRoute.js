import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "./context/UserAuthContext";
const FacultyProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/faculty" />;
  }
  return children;
};

export default FacultyProtectedRoute;