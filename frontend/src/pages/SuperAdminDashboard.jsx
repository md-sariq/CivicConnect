// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function SuperAdminDashboard() {
//   const [authorities, setAuthorities] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAuthorities = async () => {
//       try {
//         const stored = JSON.parse(localStorage.getItem('civicUser'));
//         const headers = { Authorization: `Bearer ${stored.token}` };
//         const { data } = await axios.get(`${API}/superadmin/authorities`, { headers });
//         setAuthorities(data);
//       } catch (err) {
//         console.error(err);
//         alert('Failed to fetch authorities');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAuthorities();
//   }, []);

//   if (loading) return <p>Loading authorities...</p>;

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-800">Manage Authorities</h2>
//         <Link to="/super-admin/invite" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">
//           + Invite New Authority
//         </Link>
//       </div>
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         {/* Simple list for now; can be upgraded to a table */}
//         <ul className="divide-y divide-gray-200">
//           {authorities.map(auth => (
//             <li key={auth._id} className="p-4 flex justify-between items-center">
//               <div>
//                 <p className="font-semibold">{auth.name}</p>
//                 <p className="text-sm text-gray-500">{auth.contactEmail}</p>
//               </div>
//               <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                 auth.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//               }`}>
//                 {auth.status}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }











// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function SuperAdminDashboard() {
//   const [authorities, setAuthorities] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAuthorities = async () => {
//       try {
//         const stored = JSON.parse(localStorage.getItem('civicUser'));
//         const headers = { Authorization: `Bearer ${stored.token}` };
//         const { data } = await axios.get(`${API}/superadmin/authorities`, { headers });
//         setAuthorities(data);
//       } catch (err) {
//         console.error(err);
//         alert('Failed to fetch authorities');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAuthorities();
//   }, []);

//   const handleDelete = async (authorityId) => {
//     // Show a confirmation dialog before proceeding
//     if (window.confirm('Are you sure you want to delete this authority and all its data? This action cannot be undone.')) {
//       try {
//         const stored = JSON.parse(localStorage.getItem('civicUser'));
//         const headers = { Authorization: `Bearer ${stored.token}` };
        
//         await axios.delete(`${API}/superadmin/authorities/${authorityId}`, { headers });
        
//         // Update the UI by removing the deleted authority from the state
//         setAuthorities(authorities.filter(auth => auth._id !== authorityId));
//         alert('Authority deleted successfully.');
//       } catch (err) {
//         alert(err.response?.data?.message || 'Failed to delete authority.');
//       }
//     }
//   };

//   if (loading) return <p>Loading authorities...</p>;

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-800">Manage Authorities</h2>
//         <Link to="/super-admin/invite" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">
//           + Invite New Authority
//         </Link>
//       </div>
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <ul className="divide-y divide-gray-200">
//           {authorities.length > 0 ? authorities.map(auth => (
//             <li key={auth._id} className="p-4 flex justify-between items-center">
//               <div>
//                 <p className="font-semibold">{auth.name}</p>
//                 <p className="text-sm text-gray-500">{auth.contactEmail}</p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                   auth.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                 }`}>
//                   {auth.status}
//                 </span>
//                 <button 
//                   onClick={() => handleDelete(auth._id)}
//                   className="text-sm font-medium text-red-600 hover:text-red-800"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           )) : <p className="p-4 text-center text-gray-500">No authorities have been invited yet.</p>}
//         </ul>
//       </div>
//     </div>
//   );
// }





















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function SuperAdminDashboard() {
//   const [authorities, setAuthorities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // 1. Add state for pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const limit = 10; // Items per page

//   // 2. Update fetch function to include pagination parameters
//   const fetchAuthorities = async (pageToFetch = 1) => {
//     try {
//       setLoading(true);
//       const stored = JSON.parse(localStorage.getItem('civicUser'));
//       const headers = { Authorization: `Bearer ${stored.token}` };
      
//       // Request specific page and limit
//       const { data } = await axios.get(
//         `${API}/superadmin/authorities?page=${pageToFetch}&limit=${limit}`, 
//         { headers }
//       );
        
//       setAuthorities(data.authorities);
//       setCurrentPage(data.currentPage);
//       setTotalPages(data.totalPages);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to fetch authorities');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAuthorities(currentPage); // Fetch initial page
//   }, [currentPage]); // Re-fetch when currentPage changes

//   const handleDelete = async (authorityId) => {
//     // Show a confirmation dialog before proceeding
//     if (window.confirm('Are you sure you want to delete this authority and all its data? This action cannot be undone.')) {
//       try {
//         const stored = JSON.parse(localStorage.getItem('civicUser'));
//         const headers = { Authorization: `Bearer ${stored.token}` };
        
//         await axios.delete(`${API}/superadmin/authorities/${authorityId}`, { headers });
        
//         alert('Authority deleted successfully.');
        
//         // After successful delete, refetch the current page to update the list
//         fetchAuthorities(currentPage); 
//       } catch (err) {
//         alert(err.response?.data?.message || 'Failed to delete authority.');
//       }
//     }
//   };

//   if (loading) return <p>Loading authorities...</p>;

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-800">Manage Authorities</h2>
//         <Link to="/super-admin/invite" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">
//           + Invite New Authority
//         </Link>
//       </div>
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <ul className="divide-y divide-gray-200">
//           {authorities.length > 0 ? authorities.map(auth => (
//             <li key={auth._id} className="p-4 flex justify-between items-center">
//               <div>
//                 <p className="font-semibold">{auth.name}</p>
//                 <p className="text-sm text-gray-500">{auth.contactEmail}</p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                   auth.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                 }`}>
//                   {auth.status}
//                 </span>
//                 <button 
//                   onClick={() => handleDelete(auth._id)}
//                   className="text-sm font-medium text-red-600 hover:text-red-800"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           )) : <p className="p-4 text-center text-gray-500">No authorities have been invited yet.</p>}
//         </ul>
//       </div>

//       {/* 3. Add Pagination Controls */}
//       <div className="mt-6 flex justify-between items-center">
//         <button
//           onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span className="text-sm text-gray-700">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaUserPlus } from 'react-icons/fa'; // Corrected: FaUserPlus is now imported

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function SuperAdminDashboard() {
  const [authorities, setAuthorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchAuthorities = async (pageToFetch = 1) => {
    try {
      setLoading(true);
      const stored = JSON.parse(localStorage.getItem('civicUser'));
      const headers = { Authorization: `Bearer ${stored.token}` };
      const { data } = await axios.get(
        `${API}/superadmin/authorities?page=${pageToFetch}&limit=${limit}`,
        { headers }
      );
      setAuthorities(data.authorities);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch authorities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthorities(currentPage);
  }, [currentPage]);

  const handleDelete = async (authorityId, authorityName) => {
    if (window.confirm(`Are you sure you want to delete "${authorityName}" and all its data? This action cannot be undone.`)) {
      try {
        const stored = JSON.parse(localStorage.getItem('civicUser'));
        const headers = { Authorization: `Bearer ${stored.token}` };
        await axios.delete(`${API}/superadmin/authorities/${authorityId}`, { headers });
        alert('Authority deleted successfully.');
        if (authorities.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            fetchAuthorities(currentPage);
        }
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete authority.');
      }
    }
  };

  if (loading) return <div className="text-center p-8 text-gray-700">Loading authorities...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Authorities</h2>
        <Link
          to="/super-admin/invite"
          className="w-full sm:w-auto bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <FaUserPlus /> Invite New Authority {/* Icon is used here */}
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">Authority Name</th>
              <th scope="col" className="px-6 py-3">Contact Email</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {authorities.length > 0 ? authorities.map(auth => (
              <tr key={auth._id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{auth.name}</td>
                <td className="px-6 py-4">{auth.contactEmail}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 font-semibold text-xs rounded-full ${
                    auth.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {auth.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(auth._id, auth.name)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Delete Authority"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-gray-500">No authorities have been invited yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || totalPages === 0}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          {totalPages > 0 ? `Page ${currentPage} of ${totalPages}` : 'No Pages'}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}