import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaListUl, FaObjectGroup } from 'react-icons/fa';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('civicUser');
    navigate('/login');
  };
  
  const navLinkClass = ({ isActive }) => 
    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive 
      ? 'bg-blue-600 text-white' 
      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* --- Desktop Sidebar --- */}
      <aside className="hidden md:flex flex-shrink-0 w-64 flex-col bg-gray-800 text-white">
        <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/admin" end className={navLinkClass}><FaTachometerAlt /> Dashboard</NavLink>
          <NavLink to="/admin/issues" className={navLinkClass}><FaListUl /> All Issues</NavLink>
          <NavLink to="/admin/grouped-reports" className={navLinkClass}><FaObjectGroup /> Grouped Reports</NavLink>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* --- Header --- */}
        <header className="bg-white shadow-sm flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
           <button onClick={handleLogout} className="text-sm font-medium text-gray-600 hover:text-red-600">
            Logout
          </button>
        </header>

        {/* --- Main Content --- */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          <Outlet />
        </main>
      </div>

       {/* --- Mobile Bottom Nav --- */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-white border-t border-gray-700">
        <nav className="flex justify-around items-center h-16">
          <NavLink to="/admin" end className={navLinkClass}><FaTachometerAlt size={20} /></NavLink>
          <NavLink to="/admin/issues" className={navLinkClass}><FaListUl size={20} /></NavLink>
          <NavLink to="/admin/grouped-reports" className={navLinkClass}><FaObjectGroup size={20} /></NavLink>
        </nav>
      </footer>
    </div>
  );
}