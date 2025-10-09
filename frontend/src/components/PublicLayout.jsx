import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* --- Navbar --- */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Use flex-col and sm:flex-row to stack on mobile and go horizontal on larger screens */}
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-3 sm:py-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              CivicConnect
            </Link>
            <div className="mt-2 sm:mt-0">
              <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-blue-600 mr-4">Login</Link>
              <Link to="/register" className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md">Register</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* --- Main Content --- */}
      {/* Use responsive padding p-4 for mobile, sm:p-6 for small screens and up */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6">
        <Outlet />
      </main>

      {/* --- Footer --- */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="hover:text-blue-600"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-blue-600"><FaGithub size={20} /></a>
            <a href="#" className="hover:text-blue-600"><FaLinkedin size={20} /></a>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} CivicConnect. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}