import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaImage } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function NearbyIssuesPage() {
  const [issues, setIssues] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('civicUser'));

  // Step 1: Get user's location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }
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
      }
    );
  }, []);

  // Step 2: Fetch nearby issues once location is available
  useEffect(() => {
    if (location) {
      const fetchNearbyIssues = async () => {
        try {
          const headers = { Authorization: `Bearer ${user.token}` };
          const { data } = await axios.get(
            `${API}/issues/nearby?lat=${location.lat}&lng=${location.lng}`,
            { headers }
          );
          setIssues(data);
        } catch (err) {
          setError('Could not load nearby issues.');
        } finally {
          setLoading(false);
        }
      };
      fetchNearbyIssues();
    }
  }, [location, user.token]);

  // Step 3: Handle the upvote action
  const handleUpvote = async (issueId) => {
    try {
      const headers = { Authorization: `Bearer ${user.token}` };
      const { data } = await axios.put(`${API}/issues/${issueId}/upvote`, {}, { headers });
      
      // Optimistically update the UI
      setIssues(issues.map(issue => 
        issue._id === issueId 
        ? { ...issue, upvotes: data.upvotes, isUpvoted: data.isUpvoted } 
        : issue
      ));
    } catch (err) {
      alert('Failed to upvote.');
    }
  };

  if (loading) return <p className="text-center text-gray-500">Getting your location and finding nearby issues...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Issues Near You</h1>
      <div className="space-y-4">
        {issues.length > 0 ? issues.map((issue) => (
          <div key={issue._id} className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4">
            {issue.imageUrl ? (
              <img src={issue.imageUrl} alt={issue.title} className="w-20 h-20 object-cover rounded-lg" />
            ) : (
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center"><FaImage className="text-gray-400" size={24} /></div>
            )}
            <div className="flex-1">
              <Link to={`/issue/${issue._id}`} className="font-semibold text-gray-800 hover:text-blue-600">{issue.title}</Link>
              <p className="text-sm text-gray-500">{issue.category}</p>
            </div>
            <button 
              onClick={() => handleUpvote(issue._id)} 
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                issue.isUpvoted 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <FaArrowUp />
              <span>{issue.upvotes.length}</span>
            </button>
          </div>
        )) : <p>No issues found near your location.</p>}
      </div>
    </div>
  );
}