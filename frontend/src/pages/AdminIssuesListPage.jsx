


// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import { useNavigate, useSearchParams, Link } from 'react-router-dom'; // Import Link
// import { FaSearch, FaMapMarkerAlt, FaImage, FaArrowUp, FaExternalLinkAlt } from 'react-icons/fa'; // Import FaExternalLinkAlt
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// const API_BASE = API.replace('/api', '');

// // Helper function to get Tailwind classes based on status
// const getStatusStyles = (status) => {
//   switch (status) {
//     case 'Pending':
//       return 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200 focus:ring-yellow-500';
//     case 'In Progress':
//       return 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200 focus:ring-blue-500';
//     case 'Resolved':
//       return 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200 focus:ring-green-500';
//     default:
//       return 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 focus:ring-gray-500';
//   }
// };

// export default function AdminIssuesListPage() {
//   const [allIssues, setAllIssues] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const statusFilter = searchParams.get('status');

//   // --- Functions remain the same ---
//   useEffect(() => {
//     const fetchIssues = async () => {
//       try {
//         setLoading(true);
//         const stored = JSON.parse(localStorage.getItem('civicUser'));
//         const headers = { Authorization: `Bearer ${stored.token}` };
//         const { data } = await axios.get(`${API}/issues`, { headers });
//         setAllIssues(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error(err);
//         alert('Failed to fetch issues');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchIssues();
//   }, []);

//   const updateStatus = async (id, status) => {
//      try {
//        const stored = JSON.parse(localStorage.getItem('civicUser'));
//        const headers = { Authorization: `Bearer ${stored.token}` };
//        const { data: updatedIssue } = await axios.put(`${API}/issues/${id}/status`, { status }, { headers });
//        setAllIssues(prevIssues =>
//          prevIssues.map(issue => (issue._id === id ? updatedIssue : issue))
//        );
//      } catch (err) {
//        alert(err.response?.data?.message || 'Failed to update status');
//        console.error("Update Status Error:", err);
//      }
//   };

//   const filteredIssues = useMemo(() => {
//     // ... filtering logic ...
//     let issuesToDisplay = allIssues;
//     if (statusFilter) {
//       issuesToDisplay = issuesToDisplay.filter(issue => issue.status === statusFilter);
//     }
//     if (searchQuery) {
//       issuesToDisplay = issuesToDisplay.filter(issue =>
//         issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         issue.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         issue.reportedBy?.name?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
//     return issuesToDisplay;
//   }, [allIssues, statusFilter, searchQuery]);

//   const pageTitle = statusFilter ? `${statusFilter} Issues` : "All Reported Issues";

//   if (loading) return <p className="text-center text-gray-800 p-8">Loading Issues...</p>;

//   return (
//     <div className="text-gray-800">
//       {/* Search Bar */}
//       <div className="mb-6">
//          <h2 className="text-2xl font-semibold mb-4">{pageTitle}</h2>
//          <div className="relative">
//            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><FaSearch className="text-gray-400" /></span>
//            <input
//              type="text"
//              placeholder="Search issues by title, category, reporter..."
//              value={searchQuery}
//              onChange={(e) => setSearchQuery(e.target.value)}
//              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//            />
//          </div>
//       </div>

//       {/* --- Responsive Card Grid --- */}
//       {filteredIssues.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredIssues.map((issue) => {
//             // ** Get dynamic styles **
//             const statusStyleClasses = getStatusStyles(issue.status);

//             return (
//              <div key={issue._id} className="bg-white rounded-xl shadow-md flex flex-col">
//                {/* Image Section */}
//                <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-t-xl overflow-hidden">
//                  {issue.imageUrl ? (
//                    <LazyLoadImage
//                      alt={issue.title}
//                      src={`${API_BASE}${issue.imageUrl}`}
//                      effect="blur"
//                      className="w-full h-full object-cover"
//                    />
//                  ) : (
//                    <FaImage className="text-gray-400" size={40} />
//                  )}
//                </div>

//                {/* Content Section */}
//                <div className="p-5 flex-grow flex flex-col">
//                  {/* Title and Status */}
//                  <div className="flex justify-between items-start gap-2">
//                    <h3 className="text-lg font-bold text-gray-900 break-words flex-grow pt-1">{issue.title}</h3> {/* Added pt-1 for alignment */}
//                    {/* ** UPDATED className for the select dropdown ** */}
//                    <select
//                      value={issue.status}
//                      onChange={(e) => updateStatus(issue._id, e.target.value)}
//                      // Applied dynamic classes + base styles for appearance
//                      className={`text-xs font-semibold rounded-full px-3 py-1 border appearance-none focus:outline-none focus:ring-2 focus:ring-offset-1 flex-shrink-0 cursor-pointer transition-colors ${statusStyleClasses}`}
//                      // Added inline style for consistent height and padding if appearance-none hides arrow
//                      style={{ paddingRight: '1.75rem', height: '1.75rem' }} // Adjust padding-right if arrow overlaps text
//                    >
//                      <option value="Pending">Pending</option> {/* Added value attributes */}
//                      <option value="In Progress">In Progress</option>
//                      <option value="Resolved">Resolved</option>
//                    </select>
//                  </div>
//                  {/* Reporter and Category */}
//                  <p className="text-xs text-gray-500 mt-1">Reported by: {issue.reportedBy?.name || 'N/A'} | Category: {issue.category}</p>

//                  {/* Description */}
//                  <p className="text-sm text-gray-600 my-3 line-clamp-3 flex-grow">{issue.description || 'No description provided.'}</p>

//                  {/* Row for Address and Upvote Count */}
//                  <div className="flex items-center justify-between text-xs text-gray-500 mt-2 border-t pt-2">
//                    {/* Address (Allow Wrapping) */}
//                    {issue.address ? (
//                      <div className="flex items-start min-w-0 mr-2">
//                        <FaMapMarkerAlt className="mr-1 mt-0.5 flex-shrink-0 text-gray-400" />
//                        <span className="break-words">{issue.address}</span>
//                      </div>
//                    ) : ( <div className="flex-1"></div> )}

//                    {/* Upvote Count */}
//                    <div className="flex items-center gap-1 text-blue-600 font-semibold flex-shrink-0 ml-auto">
//                      <FaArrowUp />
//                      <span>{issue.upvotes && Array.isArray(issue.upvotes) ? issue.upvotes.length : 0}</span>
//                    </div>
//                  </div>

//                  {/* Assign To Dropdown (Disabled) */}
//                  <div className="mt-4"><select disabled className="w-full text-sm text-gray-400 border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"><option>Assign to...</option></select></div>

//                  {/* ** Added explicit View Details Link ** */}
//                  <Link to={`/issue/${issue._id}`} className="mt-4 text-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
//                     View Full Details &rarr;
//                  </Link>
//                </div>
//              </div>
//           )})}
//         </div>
//       ) : (
//          <p className="text-center text-gray-500 mt-10">No {statusFilter ? `${statusFilter.toLowerCase()} ` : ''}issues found.</p>
//       )}
//     </div>
//   );
// }















// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import { useNavigate, useSearchParams, Link } from 'react-router-dom'; // Keep Link import for title
// import { FaSearch, FaMapMarkerAlt, FaImage, FaArrowUp } from 'react-icons/fa'; // Removed FaExternalLinkAlt
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// const API_BASE = API.replace('/api', '');

// // Helper function to get Tailwind classes based on status
// const getStatusStyles = (status) => {
//   switch (status) {
//     case 'Pending':
//       return 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200 focus:ring-yellow-500';
//     case 'In Progress':
//       return 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200 focus:ring-blue-500';
//     case 'Resolved':
//       return 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200 focus:ring-green-500';
//     default:
//       return 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 focus:ring-gray-500';
//   }
// };

// export default function AdminIssuesListPage() {
//   const [allIssues, setAllIssues] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const statusFilter = searchParams.get('status');

//   // --- Functions remain the same ---
//   useEffect(() => {
//     const fetchIssues = async () => {
//       try {
//         setLoading(true);
//         const stored = JSON.parse(localStorage.getItem('civicUser'));
//         const headers = { Authorization: `Bearer ${stored.token}` };
//         const { data } = await axios.get(`${API}/issues`, { headers });
//         setAllIssues(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error(err);
//         alert('Failed to fetch issues');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchIssues();
//   }, []);

//   const updateStatus = async (id, status) => {
//      try {
//        const stored = JSON.parse(localStorage.getItem('civicUser'));
//        const headers = { Authorization: `Bearer ${stored.token}` };
//        const { data: updatedIssue } = await axios.put(`${API}/issues/${id}/status`, { status }, { headers });
//        setAllIssues(prevIssues =>
//          prevIssues.map(issue => (issue._id === id ? updatedIssue : issue))
//        );
//      } catch (err) {
//        alert(err.response?.data?.message || 'Failed to update status');
//        console.error("Update Status Error:", err);
//      }
//   };

//   const filteredIssues = useMemo(() => {
//     // ... filtering logic ...
//     let issuesToDisplay = allIssues;
//     if (statusFilter) {
//       issuesToDisplay = issuesToDisplay.filter(issue => issue.status === statusFilter);
//     }
//     if (searchQuery) {
//       issuesToDisplay = issuesToDisplay.filter(issue =>
//         issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         issue.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         issue.reportedBy?.name?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
//     return issuesToDisplay;
//   }, [allIssues, statusFilter, searchQuery]);

//   const pageTitle = statusFilter ? `${statusFilter} Issues` : "All Reported Issues";

//   if (loading) return <p className="text-center text-gray-800 p-8">Loading Issues...</p>;

//   return (
//     <div className="text-gray-800">
//       {/* Search Bar */}
//       <div className="mb-6">
//          <h2 className="text-2xl font-semibold mb-4">{pageTitle}</h2>
//          <div className="relative">
//            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><FaSearch className="text-gray-400" /></span>
//            <input
//              type="text"
//              placeholder="Search issues by title, category, reporter..."
//              value={searchQuery}
//              onChange={(e) => setSearchQuery(e.target.value)}
//              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//            />
//          </div>
//       </div>

//       {/* --- Responsive Card Grid --- */}
//       {filteredIssues.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredIssues.map((issue) => {
//             // ** Get dynamic styles **
//             const statusStyleClasses = getStatusStyles(issue.status);

//             return (
//              <div key={issue._id} className="bg-white rounded-xl shadow-md flex flex-col">
//                {/* Image Section */}
//                <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-t-xl overflow-hidden">
//                  {issue.imageUrl ? (
//                    <LazyLoadImage
//                      alt={issue.title}
//                      src={`${API_BASE}${issue.imageUrl}`}
//                      effect="blur"
//                      className="w-full h-full object-cover"
//                    />
//                  ) : (
//                    <FaImage className="text-gray-400" size={40} />
//                  )}
//                </div>

//                {/* Content Section */}
//                <div className="p-5 flex-grow flex flex-col">
//                  {/* Title and Status */}
//                  <div className="flex justify-between items-start gap-2">
//                    {/* ** Title remains, but Link wrapping it is removed for consistency unless you want it clickable ** */}
//                    <h3 className="text-lg font-bold text-gray-900 break-words flex-grow pt-1">{issue.title}</h3>
//                    {/* Styled Select Dropdown */}
//                    <select
//                      value={issue.status}
//                      onChange={(e) => updateStatus(issue._id, e.target.value)}
//                      className={`text-xs font-semibold rounded-full px-3 py-1 border appearance-none focus:outline-none focus:ring-2 focus:ring-offset-1 flex-shrink-0 cursor-pointer transition-colors ${statusStyleClasses}`}
//                      style={{ paddingRight: '1.75rem', height: '1.75rem' }}
//                    >
//                      <option value="Pending">Pending</option>
//                      <option value="In Progress">In Progress</option>
//                      <option value="Resolved">Resolved</option>
//                    </select>
//                  </div>
//                  {/* Reporter and Category */}
//                  <p className="text-xs text-gray-500 mt-1">Reported by: {issue.reportedBy?.name || 'N/A'} | Category: {issue.category}</p>

//                  {/* Description */}
//                  <p className="text-sm text-gray-600 my-3 line-clamp-3 flex-grow">{issue.description || 'No description provided.'}</p>

//                  {/* Row for Address and Upvote Count */}
//                  <div className="flex items-center justify-between text-xs text-gray-500 mt-2 border-t pt-2">
//                    {/* Address (Allow Wrapping) */}
//                    {issue.address ? (
//                      <div className="flex items-start min-w-0 mr-2">
//                        <FaMapMarkerAlt className="mr-1 mt-0.5 flex-shrink-0 text-gray-400" />
//                        <span className="break-words">{issue.address}</span>
//                      </div>
//                    ) : ( <div className="flex-1"></div> )}

//                    {/* Upvote Count */}
//                    <div className="flex items-center gap-1 text-blue-600 font-semibold flex-shrink-0 ml-auto">
//                      <FaArrowUp />
//                      <span>{issue.upvotes && Array.isArray(issue.upvotes) ? issue.upvotes.length : 0}</span>
//                    </div>
//                  </div>

//                  {/* Assign To Dropdown (Disabled) */}
//                  <div className="mt-4"><select disabled className="w-full text-sm text-gray-400 border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"><option>Assign to...</option></select></div>

//                  {/* ** REMOVED the View Details Link ** */}
//                  {/* <Link to={`/issue/${issue._id}`} className="mt-4 text-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
//                     View Full Details &rarr;
//                  </Link> 
//                  */}
//                </div>
//              </div>
//           )})}
//         </div>
//       ) : (
//          <p className="text-center text-gray-500 mt-10">No {statusFilter ? `${statusFilter.toLowerCase()} ` : ''}issues found.</p>
//       )}
//     </div>
//   );
// }




















import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaImage, FaArrowUp } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// UPDATED: Define the backend URL explicitly for reliability
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Helper function to get Tailwind classes based on status
const getStatusStyles = (status) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200 focus:ring-yellow-500';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200 focus:ring-blue-500';
    case 'Resolved':
      return 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200 focus:ring-green-500';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 focus:ring-gray-500';
  }
};

export default function AdminIssuesListPage() {
  const [allIssues, setAllIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status');

  // --- Functions remain the same ---
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        const stored = JSON.parse(localStorage.getItem('civicUser'));
        const headers = { Authorization: `Bearer ${stored.token}` };
        const { data } = await axios.get(`${API}/issues`, { headers });
        setAllIssues(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch issues');
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  const updateStatus = async (id, status) => {
     try {
       const stored = JSON.parse(localStorage.getItem('civicUser'));
       const headers = { Authorization: `Bearer ${stored.token}` };
       const { data: updatedIssue } = await axios.put(`${API}/issues/${id}/status`, { status }, { headers });
       setAllIssues(prevIssues =>
         prevIssues.map(issue => (issue._id === id ? updatedIssue : issue))
       );
     } catch (err) {
       alert(err.response?.data?.message || 'Failed to update status');
       console.error("Update Status Error:", err);
     }
  };

  const filteredIssues = useMemo(() => {
    // ... filtering logic ...
    let issuesToDisplay = allIssues;
    if (statusFilter) {
      issuesToDisplay = issuesToDisplay.filter(issue => issue.status === statusFilter);
    }
    if (searchQuery) {
      issuesToDisplay = issuesToDisplay.filter(issue =>
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.reportedBy?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return issuesToDisplay;
  }, [allIssues, statusFilter, searchQuery]);

  const pageTitle = statusFilter ? `${statusFilter} Issues` : "All Reported Issues";

  if (loading) return <p className="text-center text-gray-800 p-8">Loading Issues...</p>;

  return (
    <div className="text-gray-800">
      {/* Search Bar */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">{pageTitle}</h2>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3"><FaSearch className="text-gray-400" /></span>
          <input
            type="text"
            placeholder="Search issues by title, category, reporter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* --- Responsive Card Grid --- */}
      {filteredIssues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => {
            // ** Get dynamic styles **
            const statusStyleClasses = getStatusStyles(issue.status);

            return (
              <div key={issue._id} className="bg-white rounded-xl shadow-md flex flex-col">
                {/* Image Section */}
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-t-xl overflow-hidden">
                  {issue.imageUrl ? (
                    <LazyLoadImage
                      alt={issue.title}
                      // UPDATED: Use the explicit BACKEND_URL variable
                      src={`${BACKEND_URL}${issue.imageUrl}`}
                      effect="blur"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaImage className="text-gray-400" size={40} />
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5 flex-grow flex flex-col">
                  {/* Title and Status */}
                  <div className="flex justify-between items-start gap-2">
                    {/* ** Title remains, but Link wrapping it is removed for consistency unless you want it clickable ** */}
                    <h3 className="text-lg font-bold text-gray-900 break-words flex-grow pt-1">{issue.title}</h3>
                    {/* Styled Select Dropdown */}
                    <select
                      value={issue.status}
                      onChange={(e) => updateStatus(issue._id, e.target.value)}
                      className={`text-xs font-semibold rounded-full px-3 py-1 border appearance-none focus:outline-none focus:ring-2 focus:ring-offset-1 flex-shrink-0 cursor-pointer transition-colors ${statusStyleClasses}`}
                      style={{ paddingRight: '1.75rem', height: '1.75rem' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                  {/* Reporter and Category */}
                  <p className="text-xs text-gray-500 mt-1">Reported by: {issue.reportedBy?.name || 'N/A'} | Category: {issue.category}</p>

                  {/* Description */}
                  <p className="text-sm text-gray-600 my-3 line-clamp-3 flex-grow">{issue.description || 'No description provided.'}</p>

                  {/* Row for Address and Upvote Count */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-2 border-t pt-2">
                    {/* Address (Allow Wrapping) */}
                    {issue.address ? (
                      <div className="flex items-start min-w-0 mr-2">
                        <FaMapMarkerAlt className="mr-1 mt-0.5 flex-shrink-0 text-gray-400" />
                        <span className="break-words">{issue.address}</span>
                      </div>
                    ) : ( <div className="flex-1"></div> )}

                    {/* Upvote Count */}
                    <div className="flex items-center gap-1 text-blue-600 font-semibold flex-shrink-0 ml-auto">
                      <FaArrowUp />
                      <span>{issue.upvotes && Array.isArray(issue.upvotes) ? issue.upvotes.length : 0}</span>
                    </div>
                  </div>

                  {/* Assign To Dropdown (Disabled) */}
                  <div className="mt-4"><select disabled className="w-full text-sm text-gray-400 border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"><option>Assign to...</option></select></div>

                  {/* ** REMOVED the View Details Link ** */}
                  {/* <Link to={`/issue/${issue._id}`} className="mt-4 text-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
                      View Full Details &rarr;
                  </Link> 
                  */}
                </div>
              </div>
            )})}
        </div>
      ) : (
          <p className="text-center text-gray-500 mt-10">No {statusFilter ? `${statusFilter.toLowerCase()} ` : ''}issues found.</p>
      )}
    </div>
  );
}
