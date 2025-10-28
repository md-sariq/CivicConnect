// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function InviteAuthorityPage() {
//   const [name, setName] = useState('');
//   const [contactEmail, setContactEmail] = useState('');
//   const [jurisdiction, setJurisdiction] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Basic validation for GeoJSON
//       const parsedJurisdiction = JSON.parse(jurisdiction);
      
//       const stored = JSON.parse(localStorage.getItem('civicUser'));
//       const headers = { Authorization: `Bearer ${stored.token}` };

//       const payload = {
//         name,
//         contactEmail,
//         jurisdiction: {
//           type: 'Polygon',
//           coordinates: parsedJurisdiction
//         }
//       };

//       await axios.post(`${API}/superadmin/invite-authority`, payload, { headers });
//       alert('Invitation sent successfully!');
//       navigate('/super-admin');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to send invitation. Make sure the GeoJSON is correct.');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">Invite a New Authority</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Authority Name</label>
//           <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Official Contact Email</label>
//           <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Jurisdiction (GeoJSON Polygon Coordinates)</label>
//           <textarea 
//             value={jurisdiction} 
//             onChange={e => setJurisdiction(e.target.value)} 
//             required 
//             rows="8"
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm font-mono text-xs"
//             placeholder='e.g., [[ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]]'
//           />
//           <p className="text-xs text-gray-500 mt-1">Paste the coordinate array for the GeoJSON Polygon. For a simple box, it's an array containing one array of 5 coordinate pairs (the last must be the same as the first).</p>
//         </div>
//         <button type="submit" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">
//           Send Invitation
//         </button>
//       </form>
//     </div>
//   );
// }











// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaPaperPlane, FaExternalLinkAlt } from 'react-icons/fa'; // Import icons

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function InviteAuthorityPage() {
//   const [name, setName] = useState('');
//   const [contactEmail, setContactEmail] = useState('');
//   const [jurisdiction, setJurisdiction] = useState('');
//   const [isLoading, setIsLoading] = useState(false); // Add loading state
//   const [error, setError] = useState(''); // Add error state
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(''); // Clear previous errors

//     let parsedJurisdiction;
//     try {
//       // Basic validation for GeoJSON format
//       parsedJurisdiction = JSON.parse(jurisdiction);
//       // Add more specific checks if needed (e.g., ensure it's an array of arrays)
//       if (!Array.isArray(parsedJurisdiction) || !Array.isArray(parsedJurisdiction[0]) || !Array.isArray(parsedJurisdiction[0][0]) || parsedJurisdiction[0].length < 4) {
//           throw new Error('Invalid GeoJSON Polygon coordinate format.');
//       }
//     } catch (err) {
//       setError('Invalid GeoJSON format. Please ensure you paste only the coordinate array, like [[[lng, lat], ...]].');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const stored = JSON.parse(localStorage.getItem('civicUser'));
//       const headers = { Authorization: `Bearer ${stored.token}` };

//       const payload = {
//         name,
//         contactEmail,
//         jurisdiction: {
//           type: 'Polygon',
//           coordinates: parsedJurisdiction
//         }
//       };

//       await axios.post(`${API}/superadmin/invite-authority`, payload, { headers });
//       alert('Invitation sent successfully!');
//       navigate('/super-admin'); // Navigate back to the authority list
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to send invitation.');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     // Use a slightly wider card for this form
//     <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
//       <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">Invite a New Authority</h2>
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="authority-name" className="block text-sm font-medium text-gray-700 mb-1">Authority Name</label>
//           <input
//             id="authority-name"
//             type="text"
//             value={name}
//             onChange={e => setName(e.target.value)}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="e.g., MCD - South Zone"
//           />
//         </div>

//         <div>
//           <label htmlFor="authority-email" className="block text-sm font-medium text-gray-700 mb-1">Official Contact Email</label>
//           <input
//             id="authority-email"
//             type="email"
//             value={contactEmail}
//             onChange={e => setContactEmail(e.target.value)}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="e.g., contact.south@mcd.gov.in"
//           />
//         </div>

//         <div>
//           <label htmlFor="authority-jurisdiction" className="block text-sm font-medium text-gray-700 mb-1">Jurisdiction Boundaries</label>
//           <textarea
//             id="authority-jurisdiction"
//             value={jurisdiction}
//             onChange={e => setJurisdiction(e.target.value)}
//             required
//             rows="8"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Paste GeoJSON Polygon coordinates here, e.g., [[[77.2, 28.6], ... ]]]"
//           />
//           <p className="text-xs text-gray-500 mt-2">
//             Paste the coordinate array `[[ [lng, lat], [lng, lat], ... ]]` defining the zone boundary. The first and last points must be the same.
//             Need help? Try <a href="http://geojson.io" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline inline-flex items-center gap-1">geojson.io <FaExternalLinkAlt size={10}/></a>.
//           </p>
//         </div>

//         {/* Display Error Messages */}
//         {error && (
//           <p className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-md">{error}</p>
//         )}

//         <button 
//           type="submit" 
//           disabled={isLoading}
//           className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 transition-colors"
//         >
//           <FaPaperPlane /> {isLoading ? 'Sending...' : 'Send Invitation'}
//         </button>
//       </form>
//     </div>
//   );
// }



























import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPaperPlane, FaExternalLinkAlt } from 'react-icons/fa'; // Import icons

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function InviteAuthorityPage() {
  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState(''); // Add error state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear previous errors

    let parsedJurisdiction;
    try {
      // Basic validation for GeoJSON format
      parsedJurisdiction = JSON.parse(jurisdiction);
      
      // --- CORRECTED VALIDATION LOGIC ---
      // 1. Must be an array (outermost container)
      // 2. Must contain the exterior ring (the boundary array)
      // 3. Must contain the first coordinate pair [lng, lat]
      // 4. Must have at least 4 points (to form a closed loop)
      if (
        !Array.isArray(parsedJurisdiction) || 
        !Array.isArray(parsedJurisdiction[0]) || 
        !Array.isArray(parsedJurisdiction[0][0]) || 
        parsedJurisdiction[0].length < 4
      ) {
        throw new Error('Invalid structure. Ensure you have the three layers of brackets (e.g., [[[lng, lat],...]]).');
      }
      
    } catch (err) {
      setError('Invalid GeoJSON format. Please ensure you paste only the coordinate array, like [[[lng, lat], ...]].');
      setIsLoading(false);
      return;
    }

    try {
      const stored = JSON.parse(localStorage.getItem('civicUser'));
      const headers = { Authorization: `Bearer ${stored.token}` };

      const payload = {
        name,
        contactEmail,
        jurisdiction: {
          type: 'Polygon',
          coordinates: parsedJurisdiction
        }
      };

      await axios.post(`${API}/superadmin/invite-authority`, payload, { headers });
      alert('Invitation sent successfully!');
      navigate('/super-admin'); // Navigate back to the authority list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send invitation.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Use a slightly wider card for this form
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">Invite a New Authority</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="authority-name" className="block text-sm font-medium text-gray-700 mb-1">Authority Name</label>
          <input
            id="authority-name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., MCD - South Zone"
          />
        </div>

        <div>
          <label htmlFor="authority-email" className="block text-sm font-medium text-gray-700 mb-1">Official Contact Email</label>
          <input
            id="authority-email"
            type="email"
            value={contactEmail}
            onChange={e => setContactEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., contact.south@mcd.gov.in"
          />
        </div>

        <div>
          <label htmlFor="authority-jurisdiction" className="block text-sm font-medium text-gray-700 mb-1">Jurisdiction Boundaries</label>
          <textarea
            id="authority-jurisdiction"
            value={jurisdiction}
            onChange={e => setJurisdiction(e.target.value)}
            required
            rows="8"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Paste GeoJSON Polygon coordinates here, e.g., [[[77.2, 28.6], ... ]]]"
          />
          <p className="text-xs text-gray-500 mt-2">
            Paste the coordinate array `[[ [lng, lat], [lng, lat], ... ]]` defining the zone boundary. The first and last points must be the same.
            Need help? Try <a href="http://geojson.io" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline inline-flex items-center gap-1">geojson.io <FaExternalLinkAlt size={10}/></a>.
          </p>
        </div>

        {/* Display Error Messages */}
        {error && (
          <p className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-md">{error}</p>
        )}

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 transition-colors"
        >
          <FaPaperPlane /> {isLoading ? 'Sending...' : 'Send Invitation'}
        </button>
      </form>
    </div>
  );
}
