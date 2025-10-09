// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function ReportIssuePage() {
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('Road');
//   const [description, setDescription] = useState('');
//   const [file, setFile] = useState(null);
//   const [address, setAddress] = useState('');
//   const [latlng, setLatlng] = useState({ lat: '', lng: '' });
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [locationError, setLocationError] = useState('');

//   const navigate = useNavigate();

//   // This function fetches a readable address from coordinates
//   const fetchAddressFromCoords = async (lat, lng) => {
//     try {
//       const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
//       const data = await response.json();
//       if (data && data.display_name) {
//         setAddress(data.display_name);
//       } else {
//         setAddress('Address not found');
//       }
//     } catch (error) {
//       console.error('Error fetching address:', error);
//       setAddress('Could not fetch address');
//     }
//   };

// // src/pages/ReportIssuePage.jsx

// // ... inside the ReportIssuePage component ...

// const handleGetLocation = () => {
//   if (!navigator.geolocation) {
//     setLocationError('Geolocation is not supported by your browser.');
//     return;
//   }

//   setLoadingLocation(true);
//   setLocationError('');

//   // Options to request a more accurate position
//   const options = {
//     enableHighAccuracy: true, // This is the key change
//     timeout: 10000,           // Wait 10 seconds before timing out
//     maximumAge: 0,            // Don't use a cached position
//   };

//   navigator.geolocation.getCurrentPosition(
//     async (position) => {
//       const { latitude, longitude } = position.coords;
//       setLatlng({ lat: latitude, lng: longitude });
//       await fetchAddressFromCoords(latitude, longitude);
//       setLoadingLocation(false);
//     },
//     (error) => {
//       // Provide a more descriptive error message
//       let message = 'Unable to retrieve your location. ';
//       if (error.code === error.PERMISSION_DENIED) {
//         message += 'Please grant permission to access your location.';
//       } else if (error.code === error.POSITION_UNAVAILABLE) {
//         message += 'Location information is unavailable.';
//       } else if (error.code === error.TIMEOUT) {
//         message += 'The request to get user location timed out.';
//       }
//       setLocationError(message);
//       setLoadingLocation(false);
//     },
//     options // Pass the new options object here
//   );
// };
  
//   // Use useEffect to automatically run location detection on page load
//   useEffect(() => {
//     handleGetLocation();
//   }, []); // Empty dependency array means this runs once on mount

//   const handleLogout = () => {
//     localStorage.removeItem('civicUser');
//     navigate('/login');
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     // ... (rest of the submit logic is the same as before) ...
//     try {
//       const stored = JSON.parse(localStorage.getItem('civicUser') || 'null');
//       if (!stored) return alert('You must login first');

//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('category', category);
//       formData.append('description', description);
//       formData.append('address', address);
//       formData.append('lat', latlng.lat);
//       formData.append('lng', latlng.lng);
//       if (file) formData.append('image', file);
      
//       const headers = { Authorization: `Bearer ${stored.token}`, 'Content-Type': 'multipart/form-data' };
//       await axios.post(`${API}/issues`, formData, { headers });
//       alert('Issue reported successfully!');
//       setTitle(''); setCategory('Road'); setDescription(''); setFile(null);
//     } catch (err) {
//       console.error(err);
//       alert(err?.response?.data?.message || 'Failed to report issue');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Report an Issue</h2>
//         {/* <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
//           Logout
//         </button> */}
//       </div>

//       <form onSubmit={onSubmit} className="space-y-4">
//         {/* ... Title, Category, Description inputs are the same ... */}
//         <input className="w-full border p-2 rounded" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
//         <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border p-2 rounded">
//           <option>Road</option>
//           <option>Sanitation</option>
//           <option>Electricity</option>
//           <option>Water</option>
//           <option>Other</option>
//         </select>
//         <textarea className="w-full border p-2 rounded" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />

//         {/* --- NEW LOCATION SECTION --- */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Location</label>
//           <input className="w-full border p-2 mt-1 rounded" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
//           <div className="flex items-center gap-2 mt-2">
//             <button type="button" onClick={handleGetLocation} className="px-3 py-2 bg-gray-200 rounded text-sm hover:bg-gray-300" disabled={loadingLocation}>
//               {loadingLocation ? 'Detecting...' : 'Detect My Location'}
//             </button>
//             <div className="text-sm text-gray-600 self-center">
//               {latlng.lat ? `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}` : 'No coordinates'}
//             </div>
//           </div>
//           {locationError && <p className="text-xs text-red-600 mt-1">{locationError}</p>}
//         </div>
//         {/* --- END NEW LOCATION SECTION --- */}

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image (Optional)</label>
//           <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
//         </div>
//         <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Issue</button>
//       </form>
//     </div>
//   );
// }










import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ReportIssuePage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Road');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [address, setAddress] = useState('');
  const [latlng, setLatlng] = useState({ lat: '', lng: '' });
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const navigate = useNavigate();

  const fetchAddressFromCoords = useCallback(async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Could not fetch address');
    }
  }, []);

  const handleGetLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    setLoadingLocation(true);
    setLocationError('');

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLatlng({ lat: latitude, lng: longitude });
        await fetchAddressFromCoords(latitude, longitude);
        setLoadingLocation(false);
      },
      (error) => {
        let message = 'Unable to retrieve your location. ';
        if (error.code === error.PERMISSION_DENIED) {
          message += 'Please grant permission to access your location.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message += 'Location information is unavailable.';
        } else if (error.code === error.TIMEOUT) {
          message += 'The request to get user location timed out.';
        }
        setLocationError(message);
        setLoadingLocation(false);
      },
      options
    );
  }, [fetchAddressFromCoords]);

  useEffect(() => {
    handleGetLocation();
  }, [handleGetLocation]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const stored = JSON.parse(localStorage.getItem('civicUser') || 'null');
      if (!stored) return alert('You must login first');

      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('address', address);
      formData.append('lat', latlng.lat);
      formData.append('lng', latlng.lng);
      if (file) formData.append('image', file);
      
      const headers = { Authorization: `Bearer ${stored.token}`, 'Content-Type': 'multipart/form-data' };
      await axios.post(`${API}/issues`, formData, { headers });
      
      alert('Issue reported successfully!');
      // Reset form fields
      setTitle('');
      setCategory('Road');
      setDescription('');
      setFile(null);
      setAddress('');
      setLatlng({ lat: '', lng: '' });
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Failed to report issue');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Report an Issue</h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full border p-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        
        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border p-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          <option>Road</option>
          <option>Sanitation</option>
          <option>Electricity</option>
          <option>Water</option>
          <option>Other</option>
        </select>
        
        <textarea className="w-full border p-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input className="w-full border p-2 mt-1 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
          <div className="flex items-center gap-2 mt-2">
            <button type="button" onClick={handleGetLocation} className="px-3 py-2 bg-gray-200 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-300 disabled:opacity-50" disabled={loadingLocation}>
              {loadingLocation ? 'Detecting...' : 'Detect My Location'}
            </button>
            <div className="text-sm text-gray-600 self-center">
              {latlng.lat ? `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}` : 'No coordinates'}
            </div>
          </div>
          {locationError && <p className="text-xs text-red-600 mt-1">{locationError}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image (Optional)</label>
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
        </div>
        
        <button className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Submit Issue
        </button>
      </form>
    </div>
  );
}