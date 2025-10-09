import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaperPlane, FaTasks, FaUsers } from 'react-icons/fa';

const FeatureCard = ({ icon, title, description }) => (
  <div className="text-center p-6 bg-white rounded-lg shadow-md">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-sm text-gray-600">{description}</p>
  </div>
);

export default function HomePage() {
  return (
    <div className="w-full">
      {/* --- Hero Section --- */}
      <section className="text-center py-16 sm:py-20 bg-white rounded-xl shadow-lg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Empowering Communities, One Report at a Time.
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-gray-600">
            CivicConnect is a platform that bridges the gap between citizens and local authorities, making it easy to report and resolve civic issues.
          </p>
          <div className="mt-8">
            <Link
              to="/register"
              className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaPaperPlane size={24} />}
              title="Easy Reporting"
              description="Quickly report issues like potholes or broken streetlights using your phone or computer with precise location data."
            />
            <FeatureCard
              icon={<FaTasks size={24} />}
              title="Track Progress"
              description="View the status of your reported issues and see them get updated from 'Pending' to 'Resolved' by the local authorities."
            />
            <FeatureCard
              icon={<FaUsers size={24} />}
              title="Community Impact"
              description="Upvote issues reported by others in your area to help authorities prioritize the most critical problems."
            />
          </div>
        </div>
      </section>
    </div>
  );
}