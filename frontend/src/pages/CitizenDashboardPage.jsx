import React from 'react';
import { Link } from 'react-router-dom';

export default function CitizenDashboardPage() {
  const user = JSON.parse(localStorage.getItem('civicUser'));

  const ActionButton = ({ to, children, className }) => (
    <Link 
      to={to} 
      className={`block w-full max-w-sm mx-auto text-center font-semibold text-lg py-4 rounded-xl shadow-md transition-transform transform hover:scale-105 ${className}`}
    >
      {children}
    </Link>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome, {user?.name || 'Citizen'}!</h2>
      <p className="text-gray-600 mb-8">What would you like to do today?</p>
      
      <div className="space-y-6">
        <ActionButton to="/report" className="bg-blue-600 text-white">
          Report an Issue
        </ActionButton>
        
        <ActionButton to="/my-issues" className="bg-white text-gray-800 border border-gray-200">
          View My Issues
        </ActionButton>

        <ActionButton to="/reports" className="bg-white text-gray-800 border border-gray-200">
          Support Nearby Issues
        </ActionButton>
      </div>
    </div>
  );
}