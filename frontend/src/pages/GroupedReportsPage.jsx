


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaRegImages, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';
// import { HiOutlineDocumentReport } from 'react-icons/hi';
// import { Link } from 'react-router-dom';
// import { formatDistanceToNow } from 'date-fns';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// // --- UPDATED: Helper function for status badge styles ---
// // This is based on the styles from your other admin pages
// const getStatusStyles = (status) => {
//   switch (status) {
//     case 'In Progress':
//       return 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200 focus:ring-blue-500';
//     case 'Resolved':
//       return 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200 focus:ring-green-500';
//     default: // Pending
//       return 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200 focus:ring-yellow-500';
//   }
// };
// // --- END OF UPDATE ---

// export default function GroupedReportsPage() {
//   const [groupedIssues, setGroupedIssues] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [updating, setUpdating] = useState({}); // Tracks loading state for each button

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

//   // --- Function to handle updating the status of a whole group ---
//   const handleGroupStatusUpdate = async (groupId, allIssueIds, newStatus) => {
//     // Set loading state for this specific button
//     setUpdating(prev => ({ ...prev, [groupId]: newStatus }));
    
//     try {
//       const stored = JSON.parse(localStorage.getItem('civicUser'));
//       const headers = { Authorization: `Bearer ${stored.token}` };
      
//       const payload = {
//         issueIds: allIssueIds, // The array of all issue IDs from the group
//         status: newStatus,
//       };

//       // Call the new backend endpoint
//       await axios.put(`${API}/issues/group-status`, payload, { headers });

//       // --- UPDATED LOGIC ---
//       if (newStatus === 'Resolved') {
//         // If Resolved, remove the group from the UI for immediate feedback
//         setGroupedIssues(prev => prev.filter(group => group._id !== groupId));
//       } else if (newStatus === 'In Progress') {
//         // If In Progress, just update the status locally to keep it on the page
//         setGroupedIssues(prev => prev.map(group => 
//           group._id === groupId ? { ...group, status: newStatus } : group
//         ));
//       }
//       // --- END OF UPDATE ---

//     } catch (err) {
//       console.error(err);
//       alert(`Failed to update group status: ${err.response?.data?.message || 'Server error'}`);
//     } finally {
//       // Remove loading state for this button
//       setUpdating(prev => ({ ...prev, [groupId]: null }));
//     }
//   };
//   // --- END OF NEW FUNCTION ---

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
//           {groupedIssues.map((group) => {
//             const isBusy = !!updating[group._id]; // Check if this group is updating
//             // Use the new getStatusStyles function
//             // --- UPDATED: Check for group.status first ---
//             const currentStatus = isBusy ? updating[group._id] : group.status;
//             const statusStyleClasses = getStatusStyles(currentStatus);
//             // --- END OF UPDATE ---

//             return (
//               <div key={group._id} className="bg-white rounded-xl shadow-md flex flex-col justify-between">
//                 <div>
//                   {/* Image Section */}
//                   <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-t-xl overflow-hidden">
//                     {group.imageUrl ? (
//                       <img
//                         src={group.imageUrl} // This is a full Cloudinary URL
//                         alt={group.title}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <FaRegImages className="text-gray-400" size={40} />
//                     )}
//                   </div>

//                   {/* Content Section */}
//                   <div className="p-5">
                    
//                     {/* --- UPDATED: Title and Status Dropdown --- */}
//                     <div className="flex justify-between items-start gap-2 mb-2">
//                       <div className="flex-grow min-w-0"> {/* Added min-w-0 for flex truncation */}
//                         {/* Badges */}
//                         <div className="flex items-center flex-wrap gap-2 mb-2">
//                           <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
//                             <HiOutlineDocumentReport size={14} />
//                             {group.reportCount} {group.reportCount > 1 ? 'Reports' : 'Report'}
//                           </span>
//                           <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
//                             <FaArrowUp size={12} />
//                             {group.totalUpvotes} {group.totalUpvotes === 1 ? 'Upvote' : 'Upvotes'}
//                           </span>
//                         </div>
                        
//                         {/* Title and Category */}
//                         <h3 className="text-lg font-bold text-gray-900 break-words">{group.title}</h3>
//                       </div>

//                       {/* New Status Dropdown */}
//                       <select
//                         value={currentStatus} // Updated to show current status
//                         disabled={isBusy}
//                         onChange={(e) => handleGroupStatusUpdate(group._id, group.allIssueIds, e.target.value)}
//                         className={`text-xs font-semibold rounded-full px-3 py-1 border appearance-none focus:outline-none focus:ring-2 focus:ring-offset-1 flex-shrink-0 cursor-pointer transition-colors ${statusStyleClasses} ${isBusy ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         style={{ paddingRight: '1.75rem', height: '1.75rem' }}
//                       >
//                         {isBusy ? (
//                            <option value={updating[group._id]}>Updating...</option>
//                         ) : (
//                           <>
//                             {/* --- UPDATED: Only show relevant options --- */}
//                             <option value="Pending" disabled={currentStatus !== 'Pending'}>Pending</option>
//                             <option value="In Progress" disabled={currentStatus === 'In Progress'}>In Progress</option>
//                             <option value="Resolved">Resolved</option>
//                             {/* --- END OF UPDATE --- */}
//                           </>
//                         )}
//                       </select>
//                     </div>
//                     {/* --- END OF UPDATE --- */}

//                     <p className="text-xs text-gray-500 mt-1">
//                       Category: {group.category}
//                     </p>
                    
//                     {/* AI Summary */}
//                     <p className="text-sm text-gray-700 my-3 line-clamp-3">
//                       <span className="font-semibold text-gray-800">AI Summary:</span> {group.summary}
//                     </p>
                    
//                     {/* Address */}
//                     {group.address && (
//                       <div className="flex items-start text-xs text-gray-500 mt-2 border-t pt-2">
//                         <FaMapMarkerAlt className="mr-1.5 mt-0.5 flex-shrink-0 text-gray-400" />
//                         <span className="break-words">{group.address}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* --- UPDATED: Action Buttons --- */}
//                 <div className="p-5 pt-0">
//                   <Link
//                     to={`/issue/${group._id}`} // Links to the main issue's detail page
//                     className="block w-full text-center bg-gray-100 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-200 transition-colors"
//                   >
//                     View Details
//                   </Link>
//                   {/* The other buttons have been removed */}
//                 </div>
//                 {/* --- END OF UPDATE --- */}
//               </div>
//             )})}
//         </div>
//       )}
//     </div>
//   );
// }

















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegImages, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';
import { HiOutlineDocumentReport } from 'react-icons/hi';
// --- UPDATED: Removed Link import ---
import { formatDistanceToNow } from 'date-fns';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// --- UPDATED: Helper function for status badge styles ---
// This is based on the styles from your other admin pages
const getStatusStyles = (status) => {
  switch (status) {
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200 focus:ring-blue-500';
    case 'Resolved':
      return 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200 focus:ring-green-500';
    default: // Pending
      return 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200 focus:ring-yellow-500';
  }
};
// --- END OF UPDATE ---

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

  // --- Function to handle updating the status of a whole group ---
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

      // --- UPDATED LOGIC ---
      if (newStatus === 'Resolved') {
        // If Resolved, remove the group from the UI for immediate feedback
        setGroupedIssues(prev => prev.filter(group => group._id !== groupId));
      } else if (newStatus === 'In Progress') {
        // If In Progress, just update the status locally to keep it on the page
        setGroupedIssues(prev => prev.map(group => 
          group._id === groupId ? { ...group, status: newStatus } : group
        ));
      }
      // --- END OF UPDATE ---

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
            const isBusy = !!updating[group._id]; // Check if this group is updating
            // Use the new getStatusStyles function
            // --- UPDATED: Check for group.status first ---
            const currentStatus = isBusy ? updating[group._id] : group.status;
            const statusStyleClasses = getStatusStyles(currentStatus);
            // --- END OF UPDATE ---

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
                    
                    {/* --- UPDATED: Title and Status Dropdown --- */}
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <div className="flex-grow min-w-0"> {/* Added min-w-0 for flex truncation */}
                        {/* Badges */}
                        <div className="flex items-center flex-wrap gap-2 mb-2">
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
                      </div>

                      {/* New Status Dropdown */}
                      <select
                        value={currentStatus} // Updated to show current status
                        disabled={isBusy}
                        onChange={(e) => handleGroupStatusUpdate(group._id, group.allIssueIds, e.target.value)}
                        className={`text-xs font-semibold rounded-full px-3 py-1 border appearance-none focus:outline-none focus:ring-2 focus:ring-offset-1 flex-shrink-0 cursor-pointer transition-colors ${statusStyleClasses} ${isBusy ? 'opacity-50 cursor-not-allowed' : ''}`}
                        style={{ paddingRight: '1.75rem', height: '1.75rem' }}
                      >
                        {isBusy ? (
                           <option value={updating[group._id]}>Updating...</option>
                        ) : (
                          <>
                            {/* --- UPDATED: Only show relevant options --- */}
                            <option value="Pending" disabled={currentStatus !== 'Pending'}>Pending</option>
                            <option value="In Progress" disabled={currentStatus === 'In Progress'}>In Progress</option>
                            <option value="Resolved">Resolved</option>
                            {/* --- END OF UPDATE --- */}
                          </>
                        )}
                      </select>
                    </div>
                    {/* --- END OF UPDATE --- */}

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
                {/* The 'View Details' button has been removed. */}
                {/* We add a div for padding, so the card height remains consistent. */}
                <div className="p-5 pt-0">
                  <div className="h-9"></div> {/* This empty div acts as a spacer */}
                </div>
                {/* --- END OF UPDATE --- */}
              </div>
            )})}
        </div>
      )}
    </div>
  );
}

