import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function IssueDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <Link to="/reports" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to all issues</Link>
      <h1 className="text-2xl font-bold">Issue Detail Page</h1>
      <p className="mt-4 text-gray-700">Details for issue with ID: <strong>{id}</strong></p>
      <p className="mt-2 text-gray-500">This is where the full details, map, and comments for the issue will be displayed.</p>
    </div>
  );
}