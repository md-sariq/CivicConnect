


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { formatDistanceToNow } from 'date-fns';
// import { Link } from 'react-router-dom';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// const API_BASE = API.replace('/api', '');

// export default function ViewMyIssuesPage() {
//   const [issues, setIssues] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchMyIssues = async () => {
//       try {
//         const storedUser = JSON.parse(localStorage.getItem('civicUser'));
//         if (!storedUser || !storedUser.token) {
//           throw new Error('Authentication token not found.');
//         }

//         const headers = { Authorization: `Bearer ${storedUser.token}` };
//         const { data } = await axios.get(`${API}/issues/my-issues`, { headers });
//         setIssues(data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch your issues. Please try again.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyIssues();
//   }, []);

//   const getStatusStyles = (status) => {
//     switch (status) {
//       case 'Pending':
//         return { dot: 'bg-yellow-400', text: 'bg-yellow-100 text-yellow-800' };
//       case 'In Progress':
//         return { dot: 'bg-blue-400', text: 'bg-blue-100 text-blue-800' };
//       case 'Resolved':
//         return { dot: 'bg-green-400', text: 'bg-green-100 text-green-800' };
//       default:
//         return { dot: 'bg-gray-400', text: 'bg-gray-100 text-gray-800' };
//     }
//   };
  
//   if (loading) {
//     return <p className="text-center text-gray-500">Loading your issues...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">{error}</p>;
//   }

//   return (
//     <div>
//       <div className="flex items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">My Issues</h1>
//       </div>
      
//       {issues.length === 0 ? (
//         <div className="text-center py-10 px-4 bg-white rounded-lg shadow">
//           <h3 className="text-lg font-medium text-gray-700">No issues found</h3>
//           <p className="text-gray-500 mt-2">You have not reported any issues yet.</p>
//           <Link to="/report" className="mt-4 inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700">
//             Report Your First Issue
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {issues.map((issue) => {
//             const statusStyle = getStatusStyles(issue.status);
//             return (
//               <div key={issue._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg">
//                 <div className="p-5">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${statusStyle.text}`}>
//                         <span className={`w-2 h-2 mr-1.5 rounded-full ${statusStyle.dot}`}></span>
//                         {issue.status}
//                       </div>
//                       <h3 className="mt-2 text-xl font-semibold text-gray-800">{issue.title}</h3>
//                       <p className="mt-1 text-sm text-gray-500">
//                         Reported: {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
//                       </p>
//                     </div>
//                     {issue.imageUrl && (
//                       <img 
//                         src={`${API_BASE}${issue.imageUrl}`} 
//                         alt={issue.title} 
//                         className="w-20 h-20 object-cover rounded-lg ml-4"
//                       />
//                     )}
//                   </div>
//                   <div className="mt-5">
//                      <button className="w-full text-center font-semibold py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { formatDistanceToNow } from 'date-fns';
// import { Link } from 'react-router-dom'; // Link is already imported

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// const API_BASE = API.replace('/api', '');

// export default function ViewMyIssuesPage() {
//   const [issues, setIssues] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchMyIssues = async () => {
//       try {
//         const storedUser = JSON.parse(localStorage.getItem('civicUser'));
//         if (!storedUser || !storedUser.token) {
//           throw new Error('Authentication token not found.');
//         }

//         const headers = { Authorization: `Bearer ${storedUser.token}` };
//         const { data } = await axios.get(`${API}/issues/my-issues`, { headers });
//         setIssues(data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch your issues. Please try again.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyIssues();
//   }, []);

//   const getStatusStyles = (status) => {
//     switch (status) {
//       case 'Pending':
//         return { dot: 'bg-yellow-400', text: 'bg-yellow-100 text-yellow-800' };
//       case 'In Progress':
//         return { dot: 'bg-blue-400', text: 'bg-blue-100 text-blue-800' };
//       case 'Resolved':
//         return { dot: 'bg-green-400', text: 'bg-green-100 text-green-800' };
//       default:
//         return { dot: 'bg-gray-400', text: 'bg-gray-100 text-gray-800' };
//     }
//   };

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading your issues...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">{error}</p>;
//   }

//   return (
//     <div>
//       <div className="flex items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">My Issues</h1>
//       </div>

//       {issues.length === 0 ? (
//         <div className="text-center py-10 px-4 bg-white rounded-lg shadow">
//           <h3 className="text-lg font-medium text-gray-700">No issues found</h3>
//           <p className="text-gray-500 mt-2">You have not reported any issues yet.</p>
//           <Link to="/report" className="mt-4 inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700">
//             Report Your First Issue
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {issues.map((issue) => {
//             const statusStyle = getStatusStyles(issue.status);
//             return (
//               <div key={issue._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg">
//                 <div className="p-5">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${statusStyle.text}`}>
//                         <span className={`w-2 h-2 mr-1.5 rounded-full ${statusStyle.dot}`}></span>
//                         {issue.status}
//                       </div>
//                       <h3 className="mt-2 text-xl font-semibold text-gray-800">{issue.title}</h3>
//                       <p className="mt-1 text-sm text-gray-500">
//                         Reported: {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
//                       </p>
//                     </div>
//                     {issue.imageUrl && (
//                       <img
//                         src={`${API_BASE}${issue.imageUrl}`}
//                         alt={issue.title}
//                         className="w-20 h-20 object-cover rounded-lg ml-4"
//                       />
//                     )}
//                   </div>
//                   <div className="mt-5">
//                     {/* --- UPDATED PART --- */}
//                     {/* Changed button to Link */}
//                     <Link
//                       to={`/issue/${issue._id}`} // Set the destination URL using the issue's ID
//                       className="w-full text-center font-semibold py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 block" // Added 'block' for proper styling
//                     >
//                       View Details
//                     </Link>
//                     {/* --- END OF UPDATED PART --- */}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom'; // Link is already imported

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// --- REMOVED API_BASE variable ---

export default function ViewMyIssuesPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyIssues = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('civicUser'));
        if (!storedUser || !storedUser.token) {
          throw new Error('Authentication token not found.');
        }

        const headers = { Authorization: `Bearer ${storedUser.token}` };
        const { data } = await axios.get(`${API}/issues/my-issues`, { headers });
        setIssues(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch your issues. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyIssues();
  }, []);

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Pending':
        return { dot: 'bg-yellow-400', text: 'bg-yellow-100 text-yellow-800' };
      case 'In Progress':
        return { dot: 'bg-blue-400', text: 'bg-blue-100 text-blue-800' };
      case 'Resolved':
        return { dot: 'bg-green-400', text: 'bg-green-100 text-green-800' };
      default:
        return { dot: 'bg-gray-400', text: 'bg-gray-100 text-gray-800' };
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading your issues...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Issues</h1>
      </div>

      {issues.length === 0 ? (
        <div className="text-center py-10 px-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700">No issues found</h3>
          <p className="text-gray-500 mt-2">You have not reported any issues yet.</p>
          <Link to="/report" className="mt-4 inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700">
            Report Your First Issue
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => {
            const statusStyle = getStatusStyles(issue.status);
            return (
              <div key={issue._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${statusStyle.text}`}>
                        <span className={`w-2 h-2 mr-1.5 rounded-full ${statusStyle.dot}`}></span>
                        {issue.status}
                      </div>
                      <h3 className="mt-2 text-xl font-semibold text-gray-800">{issue.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Reported: {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    {issue.imageUrl && (
                      <img
                        // --- UPDATED: src now points directly to issue.imageUrl ---
                        src={issue.imageUrl}
                        alt={issue.title}
                        className="w-20 h-20 object-cover rounded-lg ml-4"
                      />
                    )}
                  </div>
                  <div className="mt-5">
                    {/* --- UPDATED PART --- */}
                    {/* Changed button to Link */}
                    <Link
                      to={`/issue/${issue._id}`} // Set the destination URL using the issue's ID
                      className="w-full text-center font-semibold py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 block" // Added 'block' for proper styling
                    >
                      View Details
                    </Link>
                    {/* --- END OF UPDATED PART --- */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
