

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import axios from 'axios';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function CompleteAuthorityRegistrationPage() {
//   const [primaryContactName, setPrimaryContactName] = useState('');
//   const [primaryContactDesignation, setPrimaryContactDesignation] = useState('');
//   const [officeAddress, setOfficeAddress] = useState('');
//   const [error, setError] = useState('');
  
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const token = searchParams.get('token');

//   useEffect(() => {
//     if (!token) setError('No registration token found. This link may be invalid or expired.');
//   }, [token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // The payload no longer includes zones
//       const payload = { token, primaryContactName, primaryContactDesignation, officeAddress };
//       await axios.post(`${API}/users/complete-authority-registration`, payload);
//       alert('Onboarding successful! You will now be redirected to the login page.');
//       navigate('/login');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed. The link may have expired.');
//     }
//   };

//   if (!token) {
//     return (
//       <div className="w-full max-w-md text-center bg-white p-8 rounded-xl shadow-lg">
//         <h2 className="text-2xl font-bold text-red-600">Invalid Link</h2>
//         <p className="mt-2 text-gray-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-8">
//       <div className="text-center">
//         <h2 className="text-3xl font-bold text-gray-900">Activate Your Authority Account</h2>
//         <p className="mt-2 text-sm text-gray-600">Please provide your details to complete the setup.</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* --- Authority & Contact Details --- */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Primary Contact Name</label>
//             <input 
//               type="text" 
//               value={primaryContactName} 
//               onChange={e => setPrimaryContactName(e.target.value)} 
//               required 
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
//               placeholder="e.g., John Doe"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Designation</label>
//             <input 
//               type="text" 
//               value={primaryContactDesignation} 
//               onChange={e => setPrimaryContactDesignation(e.target.value)} 
//               required 
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               placeholder="e.g., Municipal Commissioner"
//             />
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Main Office Address</label>
//           <input 
//             type="text" 
//             value={officeAddress} 
//             onChange={e => setOfficeAddress(e.target.value)} 
//             required 
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             placeholder="123 Civic Center, New Delhi"
//           />
//         </div>
        
//         {error && <p className="text-sm text-red-600 text-center">{error}</p>}

//         <button 
//           type="submit" 
//           className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           Complete Onboarding
//         </button>
//       </form>
//     </div>
//   );
// }


















import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function CompleteAuthorityRegistrationPage() {
  const [primaryContactName, setPrimaryContactName] = useState('');
  const [primaryContactDesignation, setPrimaryContactDesignation] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state for button feedback

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) setError('No registration token found. This link may be invalid or expired.');
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading true on submit
    setError(''); // Clear previous errors
    try {
      const payload = { token, primaryContactName, primaryContactDesignation, officeAddress };
      await axios.post(`${API}/users/complete-authority-registration`, payload);
      alert('Onboarding successful! You will now be redirected to the login page.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. The link may have expired.');
    } finally {
      setIsLoading(false); // Set loading false after request finishes
    }
  };

  // Error display for invalid token (no design change needed here)
  if (!token) {
    return (
      <div className="w-full max-w-md text-center bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-red-600">Invalid Link</h2>
        <p className="mt-2 text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    // Keep the card styling consistent with login/register pages
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Activate Your Authority Account</h2>
        <p className="mt-2 text-sm text-gray-600">Please provide your details to complete the setup.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* --- Authority & Contact Details --- */}
        {/* Use consistent labeling and input styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Primary Contact Name</label>
            <input
              id="contact-name"
              type="text"
              value={primaryContactName}
              onChange={e => setPrimaryContactName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., John Doe"
            />
          </div>
          <div>
            <label htmlFor="contact-designation" className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
            <input
              id="contact-designation"
              type="text"
              value={primaryContactDesignation}
              onChange={e => setPrimaryContactDesignation(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Municipal Commissioner"
            />
          </div>
        </div>
        <div>
          <label htmlFor="office-address" className="block text-sm font-medium text-gray-700 mb-1">Main Office Address</label>
          <input
            id="office-address"
            type="text"
            value={officeAddress}
            onChange={e => setOfficeAddress(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="123 Civic Center, New Delhi"
          />
        </div>

        {/* Improved Error Display */}
        {error && (
          <p className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-md">{error}</p>
        )}

        {/* Improved Button Styling with Loading State */}
        <button
          type="submit"
          disabled={isLoading} // Disable button when loading
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-md font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 transition-colors"
        >
          {isLoading ? 'Processing...' : 'Complete Onboarding'}
        </button>
      </form>
    </div>
  );
}