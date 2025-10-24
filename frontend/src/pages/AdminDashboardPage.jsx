// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// // Stat Card Component for the new dark theme
// const StatCard = ({ title, value, color }) => (
//   <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
//     <p className="text-sm font-medium text-gray-400">{title}</p>
//     <p className={`text-4xl font-bold mt-1 ${color}`}>{value}</p>
//   </div>
// );

// export default function AdminDashboardPage() {
//   const [issues, setIssues] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchIssues = async () => {
//       try {
//         const stored = JSON.parse(localStorage.getItem('civicUser'));
//         const headers = { Authorization: `Bearer ${stored.token}` };
//         const { data } = await axios.get(`${API}/issues`, { headers });
//         setIssues(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchIssues();
//   }, []);
  
//   const stats = useMemo(() => {
//     return issues.reduce((acc, issue) => {
//       if (issue.status === 'Pending') acc.pending++;
//       if (issue.status === 'In Progress') acc.inProgress++;
//       if (issue.status === 'Resolved') acc.resolved++;
//       return acc;
//     }, { pending: 0, inProgress: 0, resolved: 0 });
//   }, [issues]);

//   if (loading) return <p className="text-center">Loading stats...</p>;

//   return (
//     <div className="text-white">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">Issue Overview</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <StatCard title="Pending" value={stats.pending} color="text-yellow-400" />
//         <StatCard title="In Progress" value={stats.inProgress} color="text-blue-400" />
//         <StatCard title="Resolved" value={stats.resolved} color="text-green-400" />
//       </div>

//       <div className="mt-10 text-center">
//         <Link 
//           to="/admin/issues" 
//           className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
//         >
//           View All Issues
//         </Link>
//       </div>
//     </div>
//   );
// }










import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Stat Card Component (no changes needed here)
const StatCard = ({ title, value, color }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
    <p className="text-sm font-medium text-gray-400">{title}</p>
    <p className={`text-4xl font-bold mt-1 ${color}`}>{value}</p>
  </div>
);

export default function AdminDashboardPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const stored = JSON.parse(localStorage.getItem('civicUser'));
        const headers = { Authorization: `Bearer ${stored.token}` };
        // Fetch issues assigned to this authority
        const { data } = await axios.get(`${API}/issues`, { headers });
        setIssues(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);
  
  const stats = useMemo(() => {
    return issues.reduce((acc, issue) => {
      if (issue.status === 'Pending') acc.pending++;
      if (issue.status === 'In Progress') acc.inProgress++;
      if (issue.status === 'Resolved') acc.resolved++;
      return acc;
    }, { pending: 0, inProgress: 0, resolved: 0 });
  }, [issues]);

  if (loading) return <p className="text-center text-gray-800">Loading stats...</p>;

  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Issue Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* UPDATED: Wrap StatCards in Link components */}
        <Link to="/admin/issues?status=Pending">
          <StatCard title="Pending" value={stats.pending} color="text-yellow-400" />
        </Link>
        <Link to="/admin/issues?status=In Progress">
          <StatCard title="In Progress" value={stats.inProgress} color="text-blue-400" />
        </Link>
        <Link to="/admin/issues?status=Resolved">
          <StatCard title="Resolved" value={stats.resolved} color="text-green-400" />
        </Link>
      </div>

      <div className="mt-10 text-center">
        <Link 
          to="/admin/issues" // Link without a query parameter shows all issues
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
        >
          View All Issues
        </Link>
      </div>
    </div>
  );
}