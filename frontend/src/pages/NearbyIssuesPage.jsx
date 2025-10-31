


// import React, { useState, useEffect } from 'react'; // Removed useCallback as it wasn't used here
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { FaArrowUp, FaImage } from 'react-icons/fa';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// const API_BASE = API.replace('/api', ''); // 1. Add API_BASE for image URLs

// export default function NearbyIssuesPage() {
//   const [issues, setIssues] = useState([]);
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const user = JSON.parse(localStorage.getItem('civicUser'));

//   // Step 1: Get user's location (using high accuracy)
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError('Geolocation is not supported by your browser.');
//       setLoading(false);
//       return;
//     }
//     const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }; // Added high accuracy options
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocation({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       },
//       () => {
//         setError('Unable to retrieve your location. Please grant permission.');
//         setLoading(false);
//       },
//       options // Pass options here
//     );
//   }, []); // Run only once on mount

//   // Step 2: Fetch nearby issues once location is available
//   useEffect(() => {
//     // Ensure user and location are available before fetching
//     if (location && user?.token) {
//       const fetchNearbyIssues = async () => {
//         try {
//           const headers = { Authorization: `Bearer ${user.token}` };
//           const { data } = await axios.get(
//             `${API}/issues/nearby?lat=${location.lat}&lng=${location.lng}`,
//             { headers }
//           );
//           // Ensure data is an array before setting state
//           setIssues(Array.isArray(data) ? data : []);
//         } catch (err) {
//           setError(err.response?.data?.message || 'Could not load nearby issues.');
//           console.error("Fetch Nearby Error:", err);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchNearbyIssues();
//     } else if (!location && !loading) {
//         // If loading finished but location is still null, set error (likely permission denied)
//         setError('Could not get location to find nearby issues.');
//     }
//   }, [location, user?.token, loading]); // Added loading dependency

//   // Step 3: Handle the upvote action
//   const handleUpvote = async (issueId) => {
//     // Prevent upvoting if not logged in
//     if (!user?.token) {
//         alert('Please log in to upvote.');
//         return;
//     }
//     try {
//       const headers = { Authorization: `Bearer ${user.token}` };
//       const { data } = await axios.put(`${API}/issues/${issueId}/upvote`, {}, { headers });

//       // Update the specific issue in the state
//       setIssues(currentIssues =>
//         currentIssues.map(issue =>
//           issue._id === issueId
//           // Ensure the backend sends back the updated upvotes array and isUpvoted status
//           ? { ...issue, upvotes: data.upvotes || [], isUpvoted: data.isUpvoted }
//           : issue
//         )
//       );
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to upvote.');
//       console.error("Upvote Error:", err);
//     }
//   };

//   // --- Render Logic ---

//   if (loading) return <p className="text-center text-gray-500 p-8">Getting your location and finding nearby issues...</p>;

//   // Display specific error or generic message if location failed
//   if (error && issues.length === 0) return <p className="text-center text-red-500 p-8">{error}</p>;


//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Issues Near You</h1>
//       <div className="space-y-4">
//         {issues.length > 0 ? issues.map((issue) => (
//           <div key={issue._id} className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4">
//             {/* 2. Fix Image Source */}
//             {issue.imageUrl ? (
//               <img
//                 src={`${API_BASE}${issue.imageUrl}`}
//                 alt={issue.title}
//                 className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0" // Slightly smaller image
//               />
//             ) : (
//               <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                 <FaImage className="text-gray-400" size={24} />
//               </div>
//             )}
//             <div className="flex-1 min-w-0"> {/* Added min-w-0 for better text wrapping */}
//               <Link
//                 to={`/issue/${issue._id}`}
//                 className="font-semibold text-gray-800 hover:text-blue-600 block truncate" // Added truncate
//               >
//                 {issue.title}
//               </Link>
//               <p className="text-sm text-gray-500">{issue.category} - {issue.status || 'Status Unknown'}</p> {/* Added Status */}
//             </div>
//             <button
//               onClick={() => handleUpvote(issue._id)}
//               className={`flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-colors flex-shrink-0 ${ // Adjusted padding/size
//                 issue.isUpvoted
//                 ? 'bg-blue-600 text-white hover:bg-blue-700'
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               <FaArrowUp />
//               {/* 3. Ensure upvotes is an array before getting length */}
//               <span>{Array.isArray(issue.upvotes) ? issue.upvotes.length : 0}</span>
//             </button>
//           </div>
//         )) : (
//           <p className="text-center text-gray-500 p-8">No issues found near your current location.</p> // More specific message
//         )}
//       </div>
//     </div>
//   );
// }





















import React, { useState, useEffect } from 'react'; // Removed useCallback as it wasn't used here
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaImage } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// --- REMOVED API_BASE variable ---

export default function NearbyIssuesPage() {
  const [issues, setIssues] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('civicUser'));

  // Step 1: Get user's location (using high accuracy)
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }
    const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }; // Added high accuracy options
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setError('Unable to retrieve your location. Please grant permission.');
        setLoading(false);
      },
      options // Pass options here
    );
  }, []); // Run only once on mount

  // Step 2: Fetch nearby issues once location is available
  useEffect(() => {
    // Ensure user and location are available before fetching
    if (location && user?.token) {
      const fetchNearbyIssues = async () => {
        try {
          const headers = { Authorization: `Bearer ${user.token}` };
          const { data } = await axios.get(
            `${API}/issues/nearby?lat=${location.lat}&lng=${location.lng}`,
            { headers }
          );
          // Ensure data is an array before setting state
          setIssues(Array.isArray(data) ? data : []);
        } catch (err) {
          setError(err.response?.data?.message || 'Could not load nearby issues.');
          console.error("Fetch Nearby Error:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchNearbyIssues();
    } else if (!location && !loading) {
        // If loading finished but location is still null, set error (likely permission denied)
        setError('Could not get location to find nearby issues.');
    }
  }, [location, user?.token, loading]); // Added loading dependency

  // Step 3: Handle the upvote action
  const handleUpvote = async (issueId) => {
    // Prevent upvoting if not logged in
    if (!user?.token) {
        alert('Please log in to upvote.');
        return;
    }
    try {
      const headers = { Authorization: `Bearer ${user.token}` };
      const { data } = await axios.put(`${API}/issues/${issueId}/upvote`, {}, { headers });

      // Update the specific issue in the state
      setIssues(currentIssues =>
        currentIssues.map(issue =>
          issue._id === issueId
          // Ensure the backend sends back the updated upvotes array and isUpvoted status
          ? { ...issue, upvotes: data.upvotes || [], isUpvoted: data.isUpvoted }
          : issue
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to upvote.');
      console.error("Upvote Error:", err);
    }
  };

  // --- Render Logic ---

  if (loading) return <p className="text-center text-gray-500 p-8">Getting your location and finding nearby issues...</p>;

  // Display specific error or generic message if location failed
  if (error && issues.length === 0) return <p className="text-center text-red-500 p-8">{error}</p>;


  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Issues Near You</h1>
      <div className="space-y-4">
        {issues.length > 0 ? issues.map((issue) => (
          <div key={issue._id} className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4">
            {/* 2. Fix Image Source */}
            {issue.imageUrl ? (
              <img
                // --- UPDATED: src now points directly to issue.imageUrl ---
                src={issue.imageUrl}
                alt={issue.title}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0" // Slightly smaller image
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaImage className="text-gray-400" size={24} />
              </div>
            )}
            <div className="flex-1 min-w-0"> {/* Added min-w-0 for better text wrapping */}
              <Link
                to={`/issue/${issue._id}`}
                className="font-semibold text-gray-800 hover:text-blue-600 block truncate" // Added truncate
              >
                {issue.title}
              </Link>
              <p className="text-sm text-gray-500">{issue.category} - {issue.status || 'Status Unknown'}</p> {/* Added Status */}
            </div>
            <button
              onClick={() => handleUpvote(issue._id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-colors flex-shrink-0 ${ // Adjusted padding/size
                issue.isUpvoted
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <FaArrowUp />
              {/* 3. Ensure upvotes is an array before getting length */}
              <span>{Array.isArray(issue.upvotes) ? issue.upvotes.length : 0}</span>
            </button>
          </div>
        )) : (
          <p className="text-center text-gray-500 p-8">No issues found near your current location.</p> // More specific message
        )}
      </div>
    </div>
  );
}
