// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaGoogle } from 'react-icons/fa';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const onLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(`${API}/users/login`, { email, password });

//       // Store user info in localStorage
//       localStorage.setItem('civicUser', JSON.stringify(data));

//       // Redirect based on the user's role
//       if (data.role === 'superAdmin') {
//         navigate('/super-admin');
//       } else if (data.role === 'authorityAdmin') {
//         navigate('/admin');
//       } else {
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       alert(err?.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     // Use responsive padding: p-6 on mobile, sm:p-8 on larger screens
//     <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
//       <div className="text-center">
//         {/* Use responsive font size: text-2xl on mobile, sm:text-3xl on larger screens */}
//         <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back!</h2>
//         <p className="mt-2 text-sm text-gray-600">Sign in to continue to CivicConnect</p>
//       </div>

//       <form onSubmit={onLogin} className="space-y-6">
//         <div>
//           <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             placeholder="you@example.com"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             placeholder="••••••••"
//             required
//           />
//         </div>
//         <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//           Sign In
//         </button>
//       </form>

//       <div className="relative my-4">
//         <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
//         <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
//       </div>

//       <div>
//         <button type="button" className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//           <FaGoogle className="w-5 h-5 mr-2" />
//           Sign in with Google
//         </button>
//       </div>

//       <p className="text-sm text-center text-gray-600">
//         Don’t have an account?{' '}
//         <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link>
//       </p>
//     </div>
//   );
// }





// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaGoogle } from 'react-icons/fa';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const onLogin = async (e) => {
//     e.preventDefault();
//     console.log('--- Step 1: [FRONTEND] Attempting to log in ---');
//     console.log('Sending Email:', email);
  
//     try {
//       const { data } = await axios.post(`${API}/users/login`, { email, password });
    
//       console.log('--- Step 2: [FRONTEND] Received response from backend ---');
//       console.log('User Data Received:', data); // <-- CRITICAL: What is the backend sending back?
    
//       localStorage.setItem('civicUser', JSON.stringify(data));

//       // Redirect based on the user's role
//       if (data.role === 'superAdmin') {
//         navigate('/super-admin');
//       } else if (data.role === 'authorityAdmin') {
//         navigate('/admin');
//       } else {
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       console.error('--- ERROR: [FRONTEND] Login API call failed ---');
//       console.error('Error message:', err.response?.data?.message || err.message);
//       alert(err?.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     // Use responsive padding: p-6 on mobile, sm:p-8 on larger screens
//     <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
//       <div className="text-center">
//         {/* Use responsive font size: text-2xl on mobile, sm:text-3xl on larger screens */}
//         <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back!</h2>
//         <p className="mt-2 text-sm text-gray-600">Sign in to continue to CivicConnect</p>
//       </div>

//       <form onSubmit={onLogin} className="space-y-6">
//         <div>
//           <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             placeholder="you@example.com"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             placeholder="••••••••"
//             required
//           />
//         </div>
//         <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//           Sign In
//         </button>
//       </form>

//       <div className="relative my-4">
//         <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
//         <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
//       </div>

//       <div>
//         <button type="button" className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//           <FaGoogle className="w-5 h-5 mr-2" />
//           Sign in with Google
//         </button>
//       </div>

//       <p className="text-sm text-center text-gray-600">
//         Don’t have an account?{' '}
//         <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link>
//       </p>
//     </div>
//   );
// }








import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaGoogle } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API}/users/login`, { email, password });

      // Store user info in localStorage
      localStorage.setItem('civicUser', JSON.stringify(data));

      // Redirect based on the user's role
      if (data.role === 'superAdmin') {
        navigate('/super-admin');
      } else if (data.role === 'authorityAdmin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      alert(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    // Use responsive padding: p-6 on mobile, sm:p-8 on larger screens
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
      <div className="text-center">
        {/* Use responsive font size: text-2xl on mobile, sm:text-3xl on larger screens */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back!</h2>
        <p className="mt-2 text-sm text-gray-600">Sign in to continue to CivicConnect</p>
      </div>

      <form onSubmit={onLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
            required
          />
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Sign In
        </button>
      </form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
        <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
      </div>

      <div>
        <button type="button" className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <FaGoogle className="w-5 h-5 mr-2" />
          Sign in with Google
        </button>
      </div>

      <p className="text-sm text-center text-gray-600">
        Don’t have an account?{' '}
        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link>
      </p>
    </div>
  );
}
