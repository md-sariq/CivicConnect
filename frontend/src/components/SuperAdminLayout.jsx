// import React from 'react';
// import { Outlet, NavLink, useNavigate } from 'react-router-dom';
// import { FaUsersCog, FaUserPlus } from 'react-icons/fa';

// export default function SuperAdminLayout() {
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     localStorage.removeItem('civicUser');
//     navigate('/login');
//   };
  
//   const navLinkClass = ({ isActive }) => 
//     `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//       isActive ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-500'
//     }`;
  
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <aside className="hidden md:flex flex-shrink-0 w-64 flex-col bg-indigo-600 text-white">
//         <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-indigo-500">
//           Super Admin
//         </div>
//         <nav className="flex-1 p-4 space-y-2">
//           <NavLink to="/super-admin" end className={navLinkClass}><FaUsersCog /> Authorities</NavLink>
//           <NavLink to="/super-admin/invite" className={navLinkClass}><FaUserPlus /> Invite Authority</NavLink>
//         </nav>
//       </aside>
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="bg-white shadow-sm flex justify-between items-center p-4">
//           <h1 className="text-xl font-semibold text-gray-800">Platform Management</h1>
//           <button onClick={handleLogout} className="text-sm font-medium text-gray-600 hover:text-red-600">
//             Logout
//           </button>
//         </header>
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }














import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaUsersCog, FaUserPlus, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Import footer icons

export default function SuperAdminLayout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('civicUser');
    navigate('/login');
  };
  
  const navLinkClass = ({ isActive }) => 
    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-500'
    }`;
  
  return (
    // UPDATED: Use flex-col and min-h-screen for proper footer placement
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* --- Header --- */}
      <header className="bg-white shadow-sm sticky top-0 z-10 flex justify-between items-center p-4">
        <h1 className="text-xl font-semibold text-gray-800">Platform Management</h1>
        <button onClick={handleLogout} className="text-sm font-medium text-gray-600 hover:text-red-600">
          Logout
        </button>
      </header>

      {/* UPDATED: Main content area uses flex-grow */}
      <div className="flex flex-1">
        {/* --- Desktop Sidebar --- */}
        <aside className="hidden md:flex flex-shrink-0 w-64 flex-col bg-indigo-600 text-white">
          <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-indigo-500">
            Super Admin
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <NavLink to="/super-admin" end className={navLinkClass}><FaUsersCog /> Authorities</NavLink>
            <NavLink to="/super-admin/invite" className={navLinkClass}><FaUserPlus /> Invite Authority</NavLink>
          </nav>
        </aside>

        {/* --- Main Page Content --- */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4 sm:p-6 lg:p-8">
          <Outlet /> {/* Renders the specific Super Admin page */}
        </main>
      </div>

      {/* --- NEW: Footer (visible on all screen sizes) --- */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="hover:text-indigo-600"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-indigo-600"><FaGithub size={20} /></a>
            <a href="#" className="hover:text-indigo-600"><FaLinkedin size={20} /></a>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} CivicConnect. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}