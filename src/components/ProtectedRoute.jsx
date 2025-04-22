import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component to check for role
const ProtectedRoute = ({ children, requiredRole }) => {
  const userRole = localStorage.getItem('role'); // Retrieve role from localStorage

  if (!userRole || userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

