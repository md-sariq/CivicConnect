import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function HomePage() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        // public/list requires auth (protect) per backend; provide token if available
        const stored = JSON.parse(localStorage.getItem('civicUser') || 'null');
        const headers = stored ? { Authorization: `Bearer ${stored.token}` } : {};
        const { data } = await axios.get(`${API}/issues`, { headers });
        setIssues(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Recent Issues</h1>
      <div className="space-y-4">
        {issues.length === 0 && <p>No issues yet.</p>}
        {issues.map(issue => (
          <div key={issue._id} className="bg-white p-4 rounded shadow">
            <div className="flex items-start gap-4">
              {issue.imageUrl ? (
                <img src={`${issue.imageUrl.startsWith('/uploads') ? (import.meta.env.VITE_API_URL?.replace('/api','') || 'http://localhost:5000') + issue.imageUrl : issue.imageUrl}`} alt="" className="w-24 h-24 object-cover rounded" />
              ) : <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center text-sm">No Image</div>}
              <div>
                <h3 className="text-lg font-semibold">{issue.title}</h3>
                <p className="text-sm text-gray-600">{issue.category} • {issue.status}</p>
                <p className="mt-2">{issue.description}</p>
                <p className="text-xs text-gray-500 mt-2">Reported by: {issue.reportedBy?.name || 'Unknown'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
