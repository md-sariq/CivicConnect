import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const SuperAdminRoute = () => {
  const userString = localStorage.getItem('civicUser');
  const user = userString ? JSON.parse(userString) : null;

  if (user && user.role === 'superAdmin') {
    return <Outlet />;
  }
  
  return <Navigate to="/login" />;
};

export default SuperAdminRoute;