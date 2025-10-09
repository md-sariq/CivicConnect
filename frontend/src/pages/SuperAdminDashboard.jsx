import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function SuperAdminDashboard() {
  const [authorities, setAuthorities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorities = async () => {
      try {
        const stored = JSON.parse(localStorage.getItem('civicUser'));
        const headers = { Authorization: `Bearer ${stored.token}` };
        const { data } = await axios.get(`${API}/superadmin/authorities`, { headers });
        setAuthorities(data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch authorities');
      } finally {
        setLoading(false);
      }
    };
    fetchAuthorities();
  }, []);

  if (loading) return <p>Loading authorities...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Authorities</h2>
        <Link to="/super-admin/invite" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">
          + Invite New Authority
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Simple list for now; can be upgraded to a table */}
        <ul className="divide-y divide-gray-200">
          {authorities.map(auth => (
            <li key={auth._id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{auth.name}</p>
                <p className="text-sm text-gray-500">{auth.contactEmail}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                auth.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {auth.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}