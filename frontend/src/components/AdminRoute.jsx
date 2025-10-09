// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const AdminRoute = () => {
//   const userString = localStorage.getItem('civicUser');
//   const user = userString ? JSON.parse(userString) : null;

//   // Check if user is logged in AND has the 'admin' role
//   if (user && user.role === 'admin') {
//     return <Outlet />; // If yes, show the nested component (the admin page)
//   }
  
//   // Otherwise, redirect them to the login page
//   return <Navigate to="/login" />;
// };

// export default AdminRoute;



import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const userString = localStorage.getItem('civicUser');
  const user = userString ? JSON.parse(userString) : null;

  // CORRECTED: Check for 'authorityAdmin' instead of 'admin'
  if (user && user.role === 'authorityAdmin') {
    return <Outlet />; // If the role is correct, show the admin page
  }
  
  // Otherwise, redirect them to the login page
  return <Navigate to="/login" />;
};

// export export default AdminRoute;
export default AdminRoute;