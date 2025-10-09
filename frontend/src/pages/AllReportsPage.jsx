import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaImage } from 'react-icons/fa'; // Using an icon for placeholders

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AllReportsPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllIssues = async () => {
      try {
        // This endpoint should return all public issues
        const { data } = await axios.get(`${API}/issues`);
        setIssues(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch issues.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllIssues();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading reports...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Nearby Issues</h1>
      
      {issues.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium text-gray-700">No issues reported yet.</h3>
          <p className="text-gray-500 mt-2">Be the first to report an issue in your community!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md">
          <ul className="divide-y divide-gray-200">
            {issues.map((issue) => (
              <li key={issue._id}>
                <Link to={`/issue/${issue._id}`} className="block p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    {issue.imageUrl ? (
                      <img 
                        src={issue.imageUrl} 
                        alt={issue.title} 
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaImage className="text-gray-400" size={24} />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-md font-semibold text-gray-800 truncate">{issue.title}</p>
                      <p className="text-sm text-gray-500">{issue.category}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}