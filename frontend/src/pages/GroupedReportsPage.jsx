import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegImages } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function GroupedReportsPage() {
  const [groupedIssues, setGroupedIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupedIssues = async () => {
      try {
        const stored = JSON.parse(localStorage.getItem('civicUser'));
        const headers = { Authorization: `Bearer ${stored.token}` };
        // This new endpoint will return AI-grouped issues
        const { data } = await axios.get(`${API}/issues/grouped`, { headers });
        setGroupedIssues(data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch grouped reports.');
      } finally {
        setLoading(false);
      }
    };
    fetchGroupedIssues();
  }, []);

  const handleGroupStatusUpdate = async (groupId, status) => {
    try {
      const stored = JSON.parse(localStorage.getItem('civicUser'));
      const headers = { Authorization: `Bearer ${stored.token}` };
      await axios.put(`${API}/issues/grouped/${groupId}/status`, { status }, { headers });
      
      // Visually remove the group from the list for an immediate UI response
      setGroupedIssues(prev => prev.filter(group => group.groupId !== groupId));
    } catch (err) {
      alert('Failed to update group status.');
    }
  };

  if (loading) return <p className="text-center text-gray-800 p-8">AI is analyzing and grouping reports...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Grouped Reports (AI)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {groupedIssues.map((group) => (
          <div key={group.groupId} className="bg-gray-800 text-white rounded-xl shadow-lg p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start space-x-4">
                {group.representativeImage ? (
                   <img src={group.representativeImage} alt={group.title} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                ) : (
                  <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaRegImages size={24} />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold">{group.title}</h3>
                  <p className="text-sm text-gray-400">{group.reportCount} reports</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <button 
                onClick={() => handleGroupStatusUpdate(group.groupId, 'In Progress')}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Mark as In Progress
              </button>
              <button 
                onClick={() => handleGroupStatusUpdate(group.groupId, 'Resolved')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Resolved
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}