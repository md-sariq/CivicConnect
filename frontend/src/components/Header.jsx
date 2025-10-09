import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">CivicConnect</Link>
        <nav className="space-x-3">
          <Link to="/report" className="px-3 py-1 rounded bg-blue-600 text-white">Report Issue</Link>
          <Link to="/login" className="px-3 py-1 rounded border">Login</Link>
          <Link to="/admin" className="px-3 py-1 rounded border">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
