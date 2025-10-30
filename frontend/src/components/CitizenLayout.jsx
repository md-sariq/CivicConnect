


// import React from 'react';
// import { Outlet, NavLink, useNavigate } from 'react-router-dom';
// import { FaHome, FaPlus, FaList, FaMapMarkedAlt } from 'react-icons/fa';

// export default function CitizenLayout() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('civicUser');
//     navigate('/login');
//   };

//   const navLinkClass = ({ isActive }) => 
//     `flex flex-col md:flex-row items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
//       isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
//     }`;

//   const navItems = [
//     { to: "/dashboard", icon: <FaHome size={20} />, text: "Home" },
//     { to: "/report", icon: <FaPlus size={20} />, text: "Report" },
//     { to: "/my-issues", icon: <FaList size={20} />, text: "My Issues" },
//     { to: "/nearby", icon: <FaMapMarkedAlt size={20} />, text: "Nearby" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm sticky top-0 z-10">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
//           <h1 className="text-xl font-bold text-gray-800">CivicConnect</h1>
//           <div className="flex items-center gap-4">
//              <div className="w-9 h-9 bg-orange-200 rounded-full"></div>
//             <button 
//               onClick={handleLogout} 
//               className="text-sm font-medium text-gray-600 hover:text-blue-600"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="flex">
//         {/* Desktop Sidebar */}
//         <aside className="hidden md:flex md:flex-col w-64 p-4 border-r bg-white">
//           <nav className="flex flex-col gap-2">
//             {navItems.map(item => <NavLink key={item.to} to={item.to} className={navLinkClass}>{item.icon}{item.text}</NavLink>)}
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-4 sm:p-6 lg:p-8">
//            <div className="max-w-6xl mx-auto">
//             <Outlet />
//           </div>
//         </main>
//       </div>

//       {/* Mobile Bottom Nav */}
//       <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
//         <nav className="flex justify-around items-center h-16">
//            {navItems.map(item => <NavLink key={item.to} to={item.to} className={navLinkClass}>{item.icon}<span className="text-xs">{item.text}</span></NavLink>)}
//         </nav>
//       </footer>
//       <div className="md:hidden h-16"></div>
//     </div>
//   );
// }










import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaList, FaMapMarkedAlt } from 'react-icons/fa';
import Footer from './Footer';

export default function CitizenLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('civicUser');
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) => 
    `flex flex-col md:flex-row items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
    }`;

  const navItems = [
    { to: "/dashboard", icon: <FaHome size={20} />, text: "Home" },
    { to: "/report", icon: <FaPlus size={20} />, text: "Report" },
    { to: "/my-issues", icon: <FaList size={20} />, text: "My Issues" },
    { to: "/nearby", icon: <FaMapMarkedAlt size={20} />, text: "Nearby" },
  ];

  return (
    // UPDATED: Make the root a flex column that takes up the full screen height
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* --- Header --- */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">CivicConnect</h1>
          <div className="flex items-center gap-4">
             <div className="w-9 h-9 bg-orange-200 rounded-full"></div>
            <button 
              onClick={handleLogout} 
              className="text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* UPDATED: Main content area will now grow to fill available space */}
      <div className="flex flex-1">
        {/* --- Desktop Sidebar --- */}
        <aside className="hidden md:flex md:flex-col w-64 p-4 border-r bg-white">
          <nav className="flex flex-col gap-2">
            {navItems.map(item => <NavLink key={item.to} to={item.to} className={navLinkClass}>{item.icon}{item.text}</NavLink>)}
          </nav>
        </aside>

        {/* --- Main Page Content --- */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
           <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* --- Footer (visible on all screen sizes) --- */}
      <Footer />

      {/* --- Mobile Bottom Nav --- */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-20">
        <nav className="flex justify-around items-center h-16">
           {navItems.map(item => <NavLink key={item.to} to={item.to} className={navLinkClass}>{item.icon}<span className="text-xs">{item.text}</span></NavLink>)}
        </nav>
      </footer>
      {/* Add spacing at bottom on mobile to account for both footer and nav */}
      <div className="md:hidden h-16"></div>
    </div>
  );
}