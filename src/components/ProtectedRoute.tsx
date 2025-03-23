import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({
  children,
  user,
  role
}) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== role) {
    return <Navigate to={`/${user.role}`} replace />;
  }
  return children;
};
export default ProtectedRoute;