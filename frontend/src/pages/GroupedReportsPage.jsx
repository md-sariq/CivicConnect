// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaRegImages } from 'react-icons/fa';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function GroupedReportsPage() {
//   const [groupedIssues, setGroupedIssues] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchGroupedIssues = async () => {
//       try {
//         const stored = JSON.parse(localStorage.getItem('civicUser'));
//         const headers = { Authorization: `Bearer ${stored.token}` };
//         // This new endpoint will return AI-grouped issues
//         const { data } = await axios.get(`${API}/issues/grouped`, { headers });
//         setGroupedIssues(data);
//       } catch (err) {
//         console.error(err);
//         alert('Failed to fetch grouped reports.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchGroupedIssues();
//   }, []);

//   const handleGroupStatusUpdate = async (groupId, status) => {
//     try {
//       const stored = JSON.parse(localStorage.getItem('civicUser'));
//       const headers = { Authorization: `Bearer ${stored.token}` };
//       await axios.put(`${API}/issues/grouped/${groupId}/status`, { status }, { headers });
      
//       // Visually remove the group from the list for an immediate UI response
//       setGroupedIssues(prev => prev.filter(group => group.groupId !== groupId));
//     } catch (err) {
//       alert('Failed to update group status.');
//     }
//   };

//   if (loading) return <p className="text-center text-gray-800 p-8">AI is analyzing and grouping reports...</p>;

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">Grouped Reports (AI)</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {groupedIssues.map((group) => (
//           <div key={group.groupId} className="bg-gray-800 text-white rounded-xl shadow-lg p-5 flex flex-col justify-between">
//             <div>
//               <div className="flex items-start space-x-4">
//                 {group.representativeImage ? (
//                    <img src={group.representativeImage} alt={group.title} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
//                 ) : (
//                   <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <FaRegImages size={24} />
//                   </div>
//                 )}
//                 <div>
//                   <h3 className="text-lg font-bold">{group.title}</h3>
//                   <p className="text-sm text-gray-400">{group.reportCount} reports</p>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-4 flex items-center gap-4">
//               <button 
//                 onClick={() => handleGroupStatusUpdate(group.groupId, 'In Progress')}
//                 className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-lg transition-colors"
//               >
//                 Mark as In Progress
//               </button>
//               <button 
//                 onClick={() => handleGroupStatusUpdate(group.groupId, 'Resolved')}
//                 className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
//               >
//                 Resolved
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaRegImages, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';
// import { HiOutlineDocumentReport } from 'react-icons/hi';
// import { Link } from 'react-router-dom';
// import { formatDistanceToNow } from 'date-fns';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function GroupedReportsPage() {
//   const [groupedIssues, setGroupedIssues] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchGroupedIssues = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const stored = JSON.parse(localStorage.getItem('civicUser'));
//         if (!stored || !stored.token) {
//           throw new Error('User not authenticated');
//         }
//         const headers = { Authorization: `Bearer ${stored.token}` };
//         // This is the new endpoint we created
//         const { data } = await axios.get(`${API}/issues/grouped`, { headers });
//         setGroupedIssues(data);
//       } catch (err) {
//         console.error(err);
//         const errorMsg = err.response?.data?.message || 'Failed to fetch grouped reports.';
//         setError(errorMsg);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchGroupedIssues();
//   }, []);

//   // We will add the status update logic in the next step,
//   // as it requires a new backend endpoint.

//   if (loading) {
//     return (
//       <div className="text-center text-gray-800 p-8">
//         <p className="text-lg font-semibold">AI is analyzing and grouping reports...</p>
//         <p className="text-gray-500">This may take a moment.</p>
//       </div>
//     );
//   }

//   if (error) {
//     return <p className="text-center text-red-600 p-8">Error: {error}</p>;
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">Grouped Reports (AI Analysis)</h2>
      
//       {groupedIssues.length === 0 ? (
//         <p className="text-center text-gray-500 mt-10">No pending reports to group at this time.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {groupedIssues.map((group) => (
//             <div key={group._id} className="bg-white rounded-xl shadow-md flex flex-col justify-between">
//               <div>
//                 {/* Image Section */}
//                 <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-t-xl overflow-hidden">
//                   {group.imageUrl ? (
//                     <img
//                       src={group.imageUrl} // This is a full Cloudinary URL
//                       alt={group.title}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <FaRegImages className="text-gray-400" size={40} />
//                   )}
//                 </div>

//                 {/* Content Section */}
//                 <div className="p-5">
//                   {/* Badges */}
//                   <div className="flex items-center gap-3 mb-2">
//                     <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
//                       <HiOutlineDocumentReport size={14} />
//                       {group.reportCount} {group.reportCount > 1 ? 'Reports' : 'Report'}
//                     </span>
//                     <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
//                       <FaArrowUp size={12} />
//                       {group.totalUpvotes} {group.totalUpvotes === 1 ? 'Upvote' : 'Upvotes'}
//                     </span>
//                   </div>
                  
//                   {/* Title and Category */}
//                   <h3 className="text-lg font-bold text-gray-900 break-words">{group.title}</h3>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Category: {group.category}
//                   </p>
                  
//                   {/* AI Summary */}
//                   <p className="text-sm text-gray-700 my-3 line-clamp-3">
//                     <span className="font-semibold text-gray-800">AI Summary:</span> {group.summary}
//                   </p>
                  
//                   {/* Address */}
//                   {group.address && (
//                     <div className="flex items-start text-xs text-gray-500 mt-2 border-t pt-2">
//                       <FaMapMarkerAlt className="mr-1.5 mt-0.5 flex-shrink-0 text-gray-400" />
//                       <span className="break-words">{group.address}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Action Button */}
//               <div className="p-5 pt-0">
//                 <Link
//                   to={`/issue/${group._id}`} // Links to the main issue's detail page
//                   className="block w-full text-center bg-gray-800 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 transition-colors"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegImages, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// --- NEW: Helper function for button styles ---
// Inspired by your getStatusStyles function
const getActionStyles = (action) => {
  switch (action) {
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'Resolved':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    default:
      // Fallback style
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};
// --- END OF NEW FUNCTION ---

export default function GroupedReportsPage() {
  const [groupedIssues, setGroupedIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState({}); // Tracks loading state for each button

  useEffect(() => {
    const fetchGroupedIssues = async () => {
      setLoading(true);
      setError(null);
      try {
        const stored = JSON.parse(localStorage.getItem('civicUser'));
        if (!stored || !stored.token) {
          throw new Error('User not authenticated');
        }
        const headers = { Authorization: `Bearer ${stored.token}` };
        // This is the new endpoint we created
        const { data } = await axios.get(`${API}/issues/grouped`, { headers });
        setGroupedIssues(data);
      } catch (err) {
        console.error(err);
        const errorMsg = err.response?.data?.message || 'Failed to fetch grouped reports.';
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    fetchGroupedIssues();
  }, []);

  // --- NEW: Function to handle updating the status of a whole group ---
  const handleGroupStatusUpdate = async (groupId, allIssueIds, newStatus) => {
    // Set loading state for this specific button
    setUpdating(prev => ({ ...prev, [groupId]: newStatus }));
    
    try {
      const stored = JSON.parse(localStorage.getItem('civicUser'));
      const headers = { Authorization: `Bearer ${stored.token}` };
      
      const payload = {
        issueIds: allIssueIds, // The array of all issue IDs from the group
        status: newStatus,
      };

      // Call the new backend endpoint
      await axios.put(`${API}/issues/group-status`, payload, { headers });

      // On success, remove the group from the UI for immediate feedback
      setGroupedIssues(prev => prev.filter(group => group._id !== groupId));

    } catch (err) {
      console.error(err);
      alert(`Failed to update group status: ${err.response?.data?.message || 'Server error'}`);
    } finally {
      // Remove loading state for this button
      setUpdating(prev => ({ ...prev, [groupId]: null }));
    }
  };
  // --- END OF NEW FUNCTION ---

  if (loading) {
    return (
      <div className="text-center text-gray-800 p-8">
        <p className="text-lg font-semibold">AI is analyzing and grouping reports...</p>
        <p className="text-gray-500">This may take a moment.</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 p-8">Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Grouped Reports (AI Analysis)</h2>
      
      {groupedIssues.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No pending reports to group at this time.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {groupedIssues.map((group) => {
            const isInProgress = updating[group._id] === 'In Progress';
            const isResolving = updating[group._id] === 'Resolved';
            const isBusy = isInProgress || isResolving;

            return (
              <div key={group._id} className="bg-white rounded-xl shadow-md flex flex-col justify-between">
                <div>
                  {/* Image Section */}
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-t-xl overflow-hidden">
                    {group.imageUrl ? (
                      <img
                        src={group.imageUrl} // This is a full Cloudinary URL
                        alt={group.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaRegImages className="text-gray-400" size={40} />
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-5">
                    {/* Badges */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        <HiOutlineDocumentReport size={14} />
                        {group.reportCount} {group.reportCount > 1 ? 'Reports' : 'Report'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        <FaArrowUp size={12} />
                        {group.totalUpvotes} {group.totalUpvotes === 1 ? 'Upvote' : 'Upvotes'}
                      </span>
                    </div>
                    
                    {/* Title and Category */}
                    <h3 className="text-lg font-bold text-gray-900 break-words">{group.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Category: {group.category}
                    </p>
                    
                    {/* AI Summary */}
                    <p className="text-sm text-gray-700 my-3 line-clamp-3">
                      <span className="font-semibold text-gray-800">AI Summary:</span> {group.summary}
                    </p>
                    
                    {/* Address */}
                    {group.address && (
                      <div className="flex items-start text-xs text-gray-500 mt-2 border-t pt-2">
                        <FaMapMarkerAlt className="mr-1.5 mt-0.5 flex-shrink-0 text-gray-400" />
                        <span className="break-words">{group.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- UPDATED: Action Buttons --- */}
                <div className="p-5 pt-0 space-y-2">
                  <Link
                    to={`/issue/${group._id}`} // Links to the main issue's detail page
                    className="block w-full text-center bg-gray-800 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    View Details
                  </Link>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleGroupStatusUpdate(group._id, group.allIssueIds, 'In Progress')}
                      disabled={isBusy}
                      // --- UPDATED CLASSNAME ---
                      className={`w-full text-center font-semibold py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${getActionStyles('In Progress')}`}
                    >
                      {isInProgress ? 'Updating...' : 'In Progress'}
                    </button>
                    <button
                      onClick={() => handleGroupStatusUpdate(group._id, group.allIssueIds, 'Resolved')}
                      disabled={isBusy}
                      // --- UPDATED CLASSNAME ---
                      className={`w-full text-center font-semibold py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${getActionStyles('Resolved')}`}
                    >
                      {isResolving ? 'Updating...' : 'Resolved'}
                    </button>
                  </div>
                </div>
                {/* --- END OF UPDATE --- */}
              </div>
            )})}
        </div>
      )}
    </div>
  );
}

