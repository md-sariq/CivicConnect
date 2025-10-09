// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function RegisterPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const onRegister = async (e) => { /* ... onRegister logic remains the same ... */ };

//   return (
//     // Use responsive padding: p-6 on mobile, sm:p-8 on larger screens
//     <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
//       <div className="text-center">
//         {/* Use responsive font size: text-2xl on mobile, sm:text-3xl on larger screens */}
//         <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Create an Account</h2>
//         <p className="mt-2 text-sm text-gray-600">Join CivicConnect to make your voice heard</p>
//       </div>

//       <form onSubmit={onRegister} className="space-y-6">
//         <div>
//           <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
//           <input
//             id="name"
//             type="text"
//             value={name}
//             onChange={e => setName(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             placeholder="John Doe"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email-register" className="text-sm font-medium text-gray-700">Email address</label>
//           <input
//             id="email-register"
//             type="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             placeholder="you@example.com"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password-register" className="text-sm font-medium text-gray-700">Password</label>
//           <input
//             id="password-register"
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             placeholder="••••••••"
//             required
//           />
//         </div>
//         <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//           Create Account
//         </button>
//       </form>
//       <p className="text-sm text-center text-gray-600">
//         Already have an account?{' '}
//         <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Sign in</Link>
//       </p>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onRegister = async (e) => {
    e.preventDefault();
    try {
      // Send the registration request to the backend API
      await axios.post(`${API}/users/register`, { name, email, password });
      
      // Notify the user of success
      alert('Registration successful! Please log in with your new account.');
      
      // Redirect the user to the login page
      navigate('/login');
    } catch (err) {
      // Show a detailed error message from the backend, or a generic one
      alert(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    // Use responsive padding: p-6 on mobile, sm:p-8 on larger screens
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
      <div className="text-center">
        {/* Use responsive font size: text-2xl on mobile, sm:text-3xl on larger screens */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Create an Account</h2>
        <p className="mt-2 text-sm text-gray-600">Join CivicConnect to make your voice heard</p>
      </div>

      <form onSubmit={onRegister} className="space-y-6">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label htmlFor="email-register" className="text-sm font-medium text-gray-700">Email address</label>
          <input
            id="email-register"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password-register" className="text-sm font-medium text-gray-700">Password</label>
          <input
            id="password-register"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
            required
          />
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Create Account
        </button>
      </form>
      <p className="text-sm text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Sign in</Link>
      </p>
    </div>
  );
}