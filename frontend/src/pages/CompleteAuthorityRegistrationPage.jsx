import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function CompleteAuthorityRegistrationPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get the token from the URL query string
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('No registration token found. This link may be invalid or expired.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const { data } = await axios.post(`${API}/users/complete-authority-registration`, {
        token,
        name,
        password,
      });
      setMessage(data.message);
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. The link may have expired.');
    }
  };

  if (!token) {
    return (
      <div className="w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-600">Invalid Link</h2>
        <p className="mt-2 text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Complete Your Registration</h2>
        <p className="mt-2 text-sm text-gray-600">Set your name and password to activate your account.</p>
      </div>

      {message ? (
        <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
          <p>{message}</p>
          <p className="text-sm mt-2">Redirecting you to the login page...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Your Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Create Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            Activate Account
          </button>
        </form>
      )}
    </div>
  );
}