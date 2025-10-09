import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if user info exists in localStorage
  const user = localStorage.getItem('civicUser');

  // If the user is not logged in, redirect them to the /login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, show the child component (the actual page)
  return <Outlet />;
};

export default ProtectedRoute;