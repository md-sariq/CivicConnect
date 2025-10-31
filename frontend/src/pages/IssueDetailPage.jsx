






// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { format } from 'date-fns'; // For formatting dates
// import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// const API_BASE = API.replace('/api', '');

// // Helper function for status badge styles
// const getStatusStyles = (status) => {
//   switch (status) {
//     case 'Pending':
//       return { dot: 'bg-yellow-400', text: 'bg-yellow-100 text-yellow-800' };
//     case 'In Progress':
//       return { dot: 'bg-blue-400', text: 'bg-blue-100 text-blue-800' };
//     case 'Resolved':
//       return { dot: 'bg-green-400', text: 'bg-green-100 text-green-800' };
//     default:
//       return { dot: 'bg-gray-400', text: 'bg-gray-100 text-gray-800' };
//   }
// };

// export default function IssueDetailPage() {
//   const { id } = useParams(); // Get the issue ID from the URL parameter
//   const [issue, setIssue] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchIssueDetails = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const storedUser = JSON.parse(localStorage.getItem('civicUser'));
//         if (!storedUser || !storedUser.token) {
//           throw new Error('Authentication required.');
//         }
//         const headers = { Authorization: `Bearer ${storedUser.token}` };
        
//         // Fetch details for the specific issue ID
//         const { data } = await axios.get(`${API}/issues/${id}`, { headers });
//         setIssue(data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to load issue details.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchIssueDetails();
//   }, [id]); // Re-run fetch if the ID changes

//   if (loading) {
//     return <p className="text-center text-gray-500 p-8">Loading issue details...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500 p-8">{error}</p>;
//   }

//   if (!issue) {
//     return <p className="text-center text-gray-500 p-8">Issue not found.</p>;
//   }

//   const statusStyle = getStatusStyles(issue.status);

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
//       {/* Back button */}
//       <button 
//         onClick={() => navigate(-1)} // Go back one step in browser history
//         className="text-blue-600 hover:underline mb-6 inline-flex items-center text-sm"
//       >
//         &larr; Back
//       </button>

//       {/* --- Issue Details --- */}
//       <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">{issue.title}</h1>
//         <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyle.text} flex-shrink-0 mt-2 sm:mt-0`}>
//           <span className={`w-2 h-2 mr-1.5 rounded-full ${statusStyle.dot}`}></span>
//           {issue.status}
//         </div>
//       </div>
      
//       <p className="text-sm text-gray-500 mb-6">Category: {issue.category}</p>

//       {issue.imageUrl && (
//         <img
//           src={`${API_BASE}${issue.imageUrl}`}
//           alt={issue.title}
//           className="w-full h-auto max-h-96 object-contain rounded-lg mb-6 shadow-md bg-gray-100" // Use object-contain
//         />
//       )}

//       <div className="space-y-4 text-gray-700">
//         <p className="text-base leading-relaxed">{issue.description}</p>

//         {issue.address && (
//           <div className="flex items-start text-sm text-gray-600 border-t pt-4">
//             <FaMapMarkerAlt className="mr-3 mt-1 flex-shrink-0 text-gray-400" size={16} />
//             <span>{issue.address}</span>
//           </div>
//         )}

//         <div className="flex items-center text-sm text-gray-600 border-t pt-4">
//           <FaCalendarAlt className="mr-3 flex-shrink-0 text-gray-400" size={16} />
//           <span>Reported on: {format(new Date(issue.reportedAt || issue.createdAt), 'dd MMM, yyyy \'at\' h:mm a')}</span>
//         </div>
        
//          <div className="flex items-center text-sm text-gray-600 border-t pt-4">
//           <FaUser className="mr-3 flex-shrink-0 text-gray-400" size={16} />
//           <span>Reported by: {issue.reportedBy?.name || 'Unknown'}</span>
//         </div>

//         {/* You can add placeholders for map and comments here later */}
         
//       </div>
//     </div>
//   );
// }
















import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns'; // For formatting dates
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// --- REMOVED API_BASE variable ---

// Helper function for status badge styles
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

export default function IssueDetailPage() {
  const { id } = useParams(); // Get the issue ID from the URL parameter
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssueDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const storedUser = JSON.parse(localStorage.getItem('civicUser'));
        if (!storedUser || !storedUser.token) {
          throw new Error('Authentication required.');
        }
        const headers = { Authorization: `Bearer ${storedUser.token}` };
        
        // Fetch details for the specific issue ID
        const { data } = await axios.get(`${API}/issues/${id}`, { headers });
        setIssue(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load issue details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssueDetails();
  }, [id]); // Re-run fetch if the ID changes

  if (loading) {
    return <p className="text-center text-gray-500 p-8">Loading issue details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 p-8">{error}</p>;
  }

  if (!issue) {
    return <p className="text-center text-gray-500 p-8">Issue not found.</p>;
  }

  const statusStyle = getStatusStyles(issue.status);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)} // Go back one step in browser history
        className="text-blue-600 hover:underline mb-6 inline-flex items-center text-sm"
      >
        &larr; Back
      </button>

      {/* --- Issue Details --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">{issue.title}</h1>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyle.text} flex-shrink-0 mt-2 sm:mt-0`}>
          <span className={`w-2 h-2 mr-1.5 rounded-full ${statusStyle.dot}`}></span>
          {issue.status}
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mb-6">Category: {issue.category}</p>

      {issue.imageUrl && (
        <img
          // --- UPDATED: src now points directly to issue.imageUrl ---
          src={issue.imageUrl}
          alt={issue.title}
          className="w-full h-auto max-h-96 object-contain rounded-lg mb-6 shadow-md bg-gray-100" // Use object-contain
        />
      )}

      <div className="space-y-4 text-gray-700">
        <p className="text-base leading-relaxed">{issue.description}</p>

        {issue.address && (
          <div className="flex items-start text-sm text-gray-600 border-t pt-4">
            <FaMapMarkerAlt className="mr-3 mt-1 flex-shrink-0 text-gray-400" size={16} />
            <span>{issue.address}</span>
          </div>
        )}

        <div className="flex items-center text-sm text-gray-600 border-t pt-4">
          <FaCalendarAlt className="mr-3 flex-shrink-0 text-gray-400" size={16} />
          <span>Reported on: {format(new Date(issue.reportedAt || issue.createdAt), 'dd MMM, yyyy \'at\' h:mm a')}</span>
        </div>
        
         <div className="flex items-center text-sm text-gray-600 border-t pt-4">
          <FaUser className="mr-3 flex-shrink-0 text-gray-400" size={16} />
          <span>Reported by: {issue.reportedBy?.name || 'Unknown'}</span>
         </div>

        {/* You can add placeholders for map and comments here later */}
         
      </div>
    </div>
  );
}
