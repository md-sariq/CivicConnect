// import React, { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import axios from 'axios';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function CompleteAuthorityRegistrationPage() {
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
  
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
  
//   // Get the token from the URL query string
//   const token = searchParams.get('token');

//   useEffect(() => {
//     if (!token) {
//       setError('No registration token found. This link may be invalid or expired.');
//     }
//   }, [token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');

//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters long.');
//       return;
//     }

//     try {
//       const { data } = await axios.post(`${API}/users/complete-authority-registration`, {
//         token,
//         name,
//         password,
//       });
//       setMessage(data.message);
//       // Redirect to login page after a short delay
//       setTimeout(() => {
//         navigate('/login');
//       }, 3000);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed. The link may have expired.');
//     }
//   };

//   if (!token) {
//     return (
//       <div className="w-full max-w-md text-center">
//         <h2 className="text-2xl font-bold text-red-600">Invalid Link</h2>
//         <p className="mt-2 text-gray-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
//       <div className="text-center">
//         <h2 className="text-3xl font-bold text-gray-900">Complete Your Registration</h2>
//         <p className="mt-2 text-sm text-gray-600">Set your name and password to activate your account.</p>
//       </div>

//       {message ? (
//         <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
//           <p>{message}</p>
//           <p className="text-sm mt-2">Redirecting you to the login page...</p>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="name" className="text-sm font-medium text-gray-700">Your Full Name</label>
//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={e => setName(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="text-sm font-medium text-gray-700">Create Password</label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
//             <input
//               id="confirmPassword"
//               type="password"
//               value={confirmPassword}
//               onChange={e => setConfirmPassword(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           {error && <p className="text-sm text-red-600">{error}</p>}
//           <button type="submit" className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
//             Activate Account
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }
















// import React, { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import axios from 'axios';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function CompleteAuthorityRegistrationPage() {
//   const [primaryContactName, setPrimaryContactName] = useState('');
//   const [primaryContactDesignation, setPrimaryContactDesignation] = useState('');
//   const [officeAddress, setOfficeAddress] = useState('');
//   const [zoneName, setZoneName] = useState('');
//   const [zoneGeoJSON, setZoneGeoJSON] = useState('');
//   const [zones, setZones] = useState([]);
  
//   const [error, setError] = useState('');
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const token = searchParams.get('token');

//   useEffect(() => {
//     if (!token) setError('No registration token found. This link may be invalid or expired.');
//   }, [token]);

//   const handleAddZone = () => {
//     if (!zoneName || !zoneGeoJSON) {
//       alert('Please provide both a zone name and its GeoJSON coordinates.');
//       return;
//     }
//     try {
//       const coordinates = JSON.parse(zoneGeoJSON);
//       const newZone = {
//         name: zoneName,
//         jurisdiction: {
//           type: 'Polygon',
//           coordinates: coordinates
//         }
//       };
//       setZones([...zones, newZone]);
//       setZoneName('');
//       setZoneGeoJSON('');
//     } catch (err) {
//       alert('Invalid GeoJSON format. Please paste only the coordinate array.');
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (zones.length === 0) {
//       alert('You must define at least one operational zone.');
//       return;
//     }
//     try {
//       const payload = { token, primaryContactName, primaryContactDesignation, officeAddress, zones };
//       await axios.post(`${API}/users/complete-authority-registration`, payload);
//       alert('Onboarding successful! You will now be redirected to the login page.');
//       navigate('/login');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed. The link may have expired.');
//     }
//   };

//   // This is the corrected block for handling an invalid token
//   if (!token) {
//     return (
//       <div className="w-full max-w-md text-center bg-white p-8 rounded-xl shadow-lg">
//         <h2 className="text-2xl font-bold text-red-600">Invalid Link</h2>
//         <p className="mt-2 text-gray-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-8">
//       <div className="text-center">
//         <h2 className="text-3xl font-bold text-gray-900">Authority Onboarding</h2>
//         <p className="mt-2 text-sm text-gray-600">Please provide your organization's details to activate your account.</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* --- Authority & Contact Details --- */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Primary Contact Name</label>
//             <input type="text" value={primaryContactName} onChange={e => setPrimaryContactName(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Designation</label>
//             <input type="text" value={primaryContactDesignation} onChange={e => setPrimaryContactDesignation(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Main Office Address</label>
//           <input type="text" value={officeAddress} onChange={e => setOfficeAddress(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//         </div>

//         {/* --- Zone Management --- */}
//         <div className="space-y-4 rounded-lg border border-gray-200 p-4">
//           <h3 className="text-lg font-medium text-gray-800">Operational Zones</h3>
//           <p className="text-sm text-gray-500">Define the internal zones your authority manages. You must add at least one.</p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="text" placeholder="Zone Name (e.g., South Zone)" value={zoneName} onChange={e => setZoneName(e.target.value)} className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//             <textarea placeholder="Paste GeoJSON Polygon coordinates here..." value={zoneGeoJSON} onChange={e => setZoneGeoJSON(e.target.value)} rows="3" className="md:col-span-2 font-mono text-xs border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
//           </div>
//           <button type="button" onClick={handleAddZone} className="w-full md:w-auto px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700">Add Zone</button>
          
//           <div className="mt-4 space-y-2">
//             {zones.map((zone, index) => (
//               <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
//                 <p className="text-sm font-medium">{zone.name}</p>
//                 <p className="text-xs text-green-600">Coordinates Added</p>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         {error && <p className="text-sm text-red-600 text-center">{error}</p>}
//         <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//           Complete Onboarding
//         </button>
//       </form>
//     </div>
//   );
// }













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