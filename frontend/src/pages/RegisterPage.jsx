


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function RegisterPage() {
//   const [step, setStep] = useState(1); // 1 for details, 2 for OTP
//   const [name, setName] = useState('');
//   const [contact, setContact] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // const handleSendOtp = async (e) => {
//   //   e.preventDefault();
//   //   setIsLoading(true);
//   //   setError('');
//   //   try {
//   //     await axios.post(`${API}/auth/send-otp`, { contact });
//   //     setStep(2); // Move to OTP step
//   //   } catch (err) {
//   //     setError(err.response?.data?.message || 'Failed to send OTP.');
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };



//   // In RegisterPage.jsx

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     try {
//       // UPDATED: Call the new registration-specific endpoint
//       await axios.post(`${API}/auth/send-register-otp`, { contact });
//       setStep(2); // Move to OTP step
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
//       const { data } = await axios.post(`${API}/auth/verify-otp`, { contact, otp, name });
//       localStorage.setItem('civicUser', JSON.stringify(data));
//       navigate('/dashboard'); // Redirect to dashboard on successful registration & login
//     } catch (err) {
//       setError(err.response?.data?.message || 'Verification failed.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
//       <div className="text-center">
//         <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
//         <p className="mt-2 text-sm text-gray-600">
//           {step === 1 ? 'Enter your details to get started.' : `Enter the OTP sent to ${contact}`}
//         </p>
//       </div>

//       {step === 1 ? (
//         <form onSubmit={handleSendOtp} className="space-y-6">
//           <div>
//             <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
//             <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full input" placeholder="John Doe" />
//           </div>
//           <div>
//             <label htmlFor="contact" className="text-sm font-medium text-gray-700">Email or Phone</label>
//             <input id="contact" type="text" value={contact} onChange={e => setContact(e.target.value)} required className="mt-1 block w-full input" placeholder="you@example.com" />
//           </div>
//           <button type="submit" disabled={isLoading} className="w-full btn-primary">
//             {isLoading ? 'Sending...' : 'Send OTP'}
//           </button>
//         </form>
//       ) : (
//         <form onSubmit={handleVerifyOtp} className="space-y-6">
//           <div>
//             <label htmlFor="otp" className="text-sm font-medium text-gray-700">Verification Code</label>
//             <input id="otp" type="text" value={otp} onChange={e => setOtp(e.target.value)} required className="mt-1 block w-full input" placeholder="6-digit code" />
//           </div>
//           <button type="submit" disabled={isLoading} className="w-full btn-primary">
//             {isLoading ? 'Verifying...' : 'Verify & Register'}
//           </button>
//         </form>
//       )}

//       {error && <p className="text-sm text-red-600 text-center">{error}</p>}

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
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
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
      await axios.post(`${API}/auth/send-register-otp`, { contact });
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
      const { data } = await axios.post(`${API}/auth/verify-otp`, { contact, otp, name });
      localStorage.setItem('civicUser', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Create an Account</h2>
        <p className="mt-2 text-sm text-gray-600">
          {step === 1 ? 'Enter your details to get started.' : `Enter the OTP sent to ${contact}`}
        </p>
      </div>

      {step === 1 ? (
        <form onSubmit={handleSendOtp} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
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
            {isLoading ? 'Sending...' : 'Send OTP'}
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
            {isLoading ? 'Verifying...' : 'Verify & Register'}
          </button>
        </form>
      )}

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      <p className="text-sm text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Sign in</Link>
      </p>
    </div>
  );
}