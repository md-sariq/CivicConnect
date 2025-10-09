import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function InviteAuthorityPage() {
  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic validation for GeoJSON
      const parsedJurisdiction = JSON.parse(jurisdiction);
      
      const stored = JSON.parse(localStorage.getItem('civicUser'));
      const headers = { Authorization: `Bearer ${stored.token}` };

      const payload = {
        name,
        contactEmail,
        jurisdiction: {
          type: 'Polygon',
          coordinates: parsedJurisdiction
        }
      };

      await axios.post(`${API}/superadmin/invite-authority`, payload, { headers });
      alert('Invitation sent successfully!');
      navigate('/super-admin');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send invitation. Make sure the GeoJSON is correct.');
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Invite a New Authority</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Authority Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Official Contact Email</label>
          <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Jurisdiction (GeoJSON Polygon Coordinates)</label>
          <textarea 
            value={jurisdiction} 
            onChange={e => setJurisdiction(e.target.value)} 
            required 
            rows="8"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm font-mono text-xs"
            placeholder='e.g., [[ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]]'
          />
          <p className="text-xs text-gray-500 mt-1">Paste the coordinate array for the GeoJSON Polygon. For a simple box, it's an array containing one array of 5 coordinate pairs (the last must be the same as the first).</p>
        </div>
        <button type="submit" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">
          Send Invitation
        </button>
      </form>
    </div>
  );
}