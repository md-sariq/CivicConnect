// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaSearch } from 'react-icons/fa';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function AdminIssuesListPage() {
//   const [issues, setIssues] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   // --- Data Fetching and Actions ---
//   useEffect(() => {
//     const fetchIssues = async () => {
//       try {
//         setLoading(true);
//         const stored = JSON.parse(localStorage.getItem('civicUser'));
//         const headers = { Authorization: `Bearer ${stored.token}` };
//         const { data } = await axios.get(`${API}/issues`, { headers });
//         setIssues(data);
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
//     try {
//       const stored = JSON.parse(localStorage.getItem('civicUser'));
//       const headers = { Authorization: `Bearer ${stored.token}` };
//       const { data: updatedIssue } = await axios.put(`${API}/issues/${id}/status`, { status }, { headers });
      
//       // Update the issue in the local state without a full refetch
//       setIssues(prevIssues => 
//         prevIssues.map(issue => (issue._id === id ? updatedIssue : issue))
//       );
//     } catch (err) {
//       alert('Failed to update status');
//     }
//   };
  
//   // --- Filtering Logic ---
//   const filteredIssues = useMemo(() => {
//     if (!searchQuery) {
//       return issues;
//     }
//     return issues.filter(issue => 
//       issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       issue.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       issue.reportedBy?.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [issues, searchQuery]);


//   if (loading) {
//     return <p className="text-center text-gray-800 p-8">Loading Issues...</p>;
//   }

//   return (
//     <div className="text-gray-800">
//       {/* --- Header and Search Bar --- */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold mb-4">Issue Management</h2>
//         <div className="relative">
//           <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//             <FaSearch className="text-gray-400" />
//           </span>
//           <input
//             type="text"
//             placeholder="Search issues by title, category, or reporter..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>

//       {/* --- Responsive Card Grid --- */}
//       {filteredIssues.length > 0 ? (
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredIssues.map((issue) => (
//             <div key={issue._id} className="bg-white p-5 rounded-xl shadow-md space-y-4">
//               <div>
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-bold text-gray-900">{issue.title}</h3>
//                   <select 
//                     value={issue.status}
//                     onChange={(e) => updateStatus(issue._id, e.target.value)}
//                     className="text-sm font-semibold border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option>Pending</option>
//                     <option>In Progress</option>
//                     <option>Resolved</option>
//                   </select>
//                 </div>
//                 <p className="text-sm text-gray-500 mt-1">Reported by: {issue.reportedBy?.name || 'N/A'}</p>
//                 <p className="text-sm text-gray-500">Category: {issue.category}</p>
//               </div>
//               <div>
//                 <select 
//                   disabled 
//                   className="w-full text-sm text-gray-400 border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
//                 >
//                   <option>Assign to...</option>
//                 </select>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//          <p className="text-center text-gray-500 mt-10">No issues found.</p>
//       )}
//     </div>
//   );
// }











// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaSearch, FaMapMarkerAlt, FaImage } from 'react-icons/fa';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function AdminIssuesListPage() {
//   const [issues, setIssues] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   // --- Data Fetching and Actions ---
//   useEffect(() => {
//     const fetchIssues = async () => {
//       try {
//         setLoading(true);
//         const stored = JSON.parse(localStorage.getItem('civicUser'));
//         const headers = { Authorization: `Bearer ${stored.token}` };
//         const { data } = await axios.get(`${API}/issues`, { headers });
//         setIssues(data);
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
//     try {
//       const stored = JSON.parse(localStorage.getItem('civicUser'));
//       const headers = { Authorization: `Bearer ${stored.token}` };
//       const { data: updatedIssue } = await axios.put(`${API}/issues/${id}/status`, { status }, { headers });
//       setIssues(prevIssues => 
//         prevIssues.map(issue => (issue._id === id ? updatedIssue : issue))
//       );
//     } catch (err) {
//       alert('Failed to update status');
//     }
//   };
  
//   // --- Filtering Logic ---
//   const filteredIssues = useMemo(() => {
//     if (!searchQuery) return issues;
//     return issues.filter(issue => 
//       issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       issue.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       issue.reportedBy?.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [issues, searchQuery]);

//   if (loading) return <p className="text-center text-gray-800 p-8">Loading Issues...</p>;

//   return (
//     <div className="text-gray-800">
//       {/* --- Header and Search Bar --- */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold mb-4">Issue Management</h2>
//         <div className="relative">
//           <span className="absolute inset-y-0 left-0 flex items-center pl-3"><FaSearch className="text-gray-400" /></span>
//           <input
//             type="text"
//             placeholder="Search issues..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>

//       {/* --- Responsive Card Grid --- */}
//       {filteredIssues.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredIssues.map((issue) => (
//             <div key={issue._id} className="bg-white rounded-xl shadow-md flex flex-col">
//               {issue.imageUrl ? (
//                 <LazyLoadImage
//                   alt={issue.title}
//                   src={issue.imageUrl}
//                   effect="blur"
//                   className="w-full h-48 object-cover rounded-t-xl"
//                 />
//               ) : (
//                 <div className="w-full h-48 bg-gray-100 rounded-t-xl flex items-center justify-center">
//                   <FaImage className="text-gray-400" size={40} />
//                 </div>
//               )}
              
//               <div className="p-5 flex-grow flex flex-col">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-bold text-gray-900 truncate">{issue.title}</h3>
//                   <select 
//                     value={issue.status}
//                     onChange={(e) => updateStatus(issue._id, e.target.value)}
//                     className="text-sm font-semibold border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option>Pending</option>
//                     <option>In Progress</option>
//                     <option>Resolved</option>
//                   </select>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">Reported by: {issue.reportedBy?.name || 'N/A'} | Category: {issue.category}</p>
                
//                 <p className="text-sm text-gray-600 my-3 line-clamp-3 flex-grow">
//                   {issue.description}
//                 </p>

//                 {issue.address && (
//                   <div className="flex items-center text-xs text-gray-500 mt-2">
//                     <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
//                     <span>{issue.address}</span>
//                   </div>
//                 )}
                
//                 <div className="mt-4">
//                   <select disabled className="w-full text-sm text-gray-400 border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed">
//                     <option>Assign to...</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//          <p className="text-center text-gray-500 mt-10">No issues found.</p>
//       )}
//     </div>
//   );
// }











import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaImage } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_BASE = API.replace('/api', '');

export default function AdminIssuesListPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // --- Data Fetching and Actions ---
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        const stored = JSON.parse(localStorage.getItem('civicUser'));
        const headers = { Authorization: `Bearer ${stored.token}` };
        const { data } = await axios.get(`${API}/issues`, { headers });
        setIssues(data);
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
      setIssues(prevIssues => 
        prevIssues.map(issue => (issue._id === id ? updatedIssue : issue))
      );
    } catch (err) {
      alert('Failed to update status');
    }
  };
  
  // --- Filtering Logic ---
  const filteredIssues = useMemo(() => {
    if (!searchQuery) return issues;
    return issues.filter(issue => 
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.reportedBy?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [issues, searchQuery]);

  if (loading) return <p className="text-center text-gray-800 p-8">Loading Issues...</p>;

  return (
    <div className="text-gray-800">
      {/* --- Header and Search Bar --- */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Issue Management</h2>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3"><FaSearch className="text-gray-400" /></span>
          <input
            type="text"
            placeholder="Search issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* --- Responsive Card Grid --- */}
      {filteredIssues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => (
            <div key={issue._id} className="bg-white rounded-xl shadow-md flex flex-col">
              {issue.imageUrl ? (
                <LazyLoadImage
                  alt={issue.title}
                  src={`${API_BASE}${issue.imageUrl}`}
                  effect="blur"
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-t-xl flex items-center justify-center">
                  <FaImage className="text-gray-400" size={40} />
                </div>
              )}
              
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900 truncate">{issue.title}</h3>
                  <select 
                    value={issue.status}
                    onChange={(e) => updateStatus(issue._id, e.target.value)}
                    className="text-sm font-semibold border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500 mt-1">Reported by: {issue.reportedBy?.name || 'N/A'} | Category: {issue.category}</p>
                
                <p className="text-sm text-gray-600 my-3 line-clamp-3 flex-grow">
                  {issue.description}
                </p>

                {issue.address && (
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                    <span>{issue.address}</span>
                  </div>
                )}
                
                <div className="mt-4">
                  <select disabled className="w-full text-sm text-gray-400 border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed">
                    <option>Assign to...</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
         <p className="text-center text-gray-500 mt-10">No issues found.</p>
      )}
    </div>
  );
}