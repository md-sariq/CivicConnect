import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer({ hoverColor = 'blue-600' }) {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className={`hover:text-${hoverColor} transition-colors`}>
            <FaTwitter size={20} />
          </a>
          <a href="#" className={`hover:text-${hoverColor} transition-colors`}>
            <FaGithub size={20} />
          </a>
          <a href="#" className={`hover:text-${hoverColor} transition-colors`}>
            <FaLinkedin size={20} />
          </a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} CivicConnect. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
