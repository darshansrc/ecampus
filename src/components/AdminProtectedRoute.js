import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "./context/UserAuthContext";
const AdminProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/department" />;
  }
  return children;
};

export default AdminProtectedRoute;