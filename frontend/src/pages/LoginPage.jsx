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

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function LoginPage() {
//   const [step, setStep] = useState(1);
//   const [contact, setContact] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

  // const handleSendOtp = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError('');
  //   try {
  //     await axios.post(`${API}/auth/send-otp`, { contact });
  //     setStep(2);
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Failed to send OTP.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };



  // In LoginPage.jsx

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     try {
//       // UPDATED: Call the new login-specific endpoint
//       await axios.post(`${API}/auth/send-login-otp`, { contact });
//       setStep(2);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to send OTP.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     try {
//       const { data } = await axios.post(`${API}/auth/verify-otp`, { contact, otp });
//       localStorage.setItem('civicUser', JSON.stringify(data));
//       // Redirect based on role
//       if (data.role === 'superAdmin') navigate('/super-admin');
//       else if (data.role === 'authorityAdmin') navigate('/admin');
//       else navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Verification failed.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
//       <div className="text-center">
//         <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
//         <p className="mt-2 text-sm text-gray-600">
//           {step === 1 ? 'Enter your email to receive a login code.' : `Enter the code sent to ${contact}`}
//         </p>
//       </div>

//       {step === 1 ? (
//         <form onSubmit={handleSendOtp} className="space-y-6">
//           <div>
//             <label htmlFor="contact" className="text-sm font-medium text-gray-700">Email or Phone</label>
//             <input id="contact" type="text" value={contact} onChange={e => setContact(e.target.value)} required className="mt-1 block w-full input" placeholder="you@example.com" />
//           </div>
//           <button type="submit" disabled={isLoading} className="w-full btn-primary">
//             {isLoading ? 'Sending...' : 'Send Login Code'}
//           </button>
//         </form>
//       ) : (
//         <form onSubmit={handleVerifyOtp} className="space-y-6">
//           <div>
//             <label htmlFor="otp" className="text-sm font-medium text-gray-700">Verification Code</label>
//             <input id="otp" type="text" value={otp} onChange={e => setOtp(e.target.value)} required className="mt-1 block w-full input" placeholder="6-digit code" />
//           </div>
//           <button type="submit" disabled={isLoading} className="w-full btn-primary">
//             {isLoading ? 'Verifying...' : 'Sign In'}
//           </button>
//         </form>
//       )}

//       {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      
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

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await axios.post(`${API}/auth/send-login-otp`, { contact });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`${API}/auth/verify-otp`, { contact, otp });
      localStorage.setItem('civicUser', JSON.stringify(data));
      
      if (data.role === 'superAdmin') navigate('/super-admin');
      else if (data.role === 'authorityAdmin') navigate('/admin');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Sign In</h2>
        <p className="mt-2 text-sm text-gray-600">
          {step === 1 ? 'Enter your email to receive a login code.' : `Enter the code sent to ${contact}`}
        </p>
      </div>

      {step === 1 ? (
        <form onSubmit={handleSendOtp} className="space-y-6">
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Email or Phone</label>
            <input
              id="contact"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {isLoading ? 'Sending...' : 'Send Login Code'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Verification Code</label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="6-digit code"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {isLoading ? 'Verifying...' : 'Verify & Sign In'}
          </button>
        </form>
      )}

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      
      <p className="text-sm text-center text-gray-600">
        Don’t have an account?{' '}
        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link>
      </p>
    </div>
  );
}