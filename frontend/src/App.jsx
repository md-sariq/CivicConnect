// import { Routes, Route, Navigate } from 'react-router-dom';

// // --- Layouts & Route Guards ---
// import PublicLayout from './components/PublicLayout';
// import CitizenLayout from './components/CitizenLayout';
// import AdminLayout from './components/AdminLayout';
// import SuperAdminLayout from './components/SuperAdminLayout';
// import ProtectedRoute from './components/ProtectedRoute';
// import AdminRoute from './components/AdminRoute';
// import SuperAdminRoute from './components/SuperAdminRoute';

// // --- Public Pages ---
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import CompleteAuthorityRegistrationPage from './pages/CompleteAuthorityRegistrationPage'; 

// // --- Citizen Pages ---
// import CitizenDashboardPage from './pages/CitizenDashboardPage';
// import ReportIssuePage from './pages/ReportIssuePage';
// import ViewMyIssuesPage from './pages/ViewMyIssuesPage';
// import NearbyIssuesPage from './pages/NearbyIssuesPage';
// import MapPage from './pages/MapPage';
// import IssueDetailPage from './pages/IssueDetailPage';

// // --- Authority Admin Pages ---
// import AdminDashboardPage from './pages/AdminDashboardPage';
// import AdminIssuesListPage from './pages/AdminIssuesListPage';
// import GroupedReportsPage from './pages/GroupedReportsPage';

// // --- Super Admin Pages ---
// import SuperAdminDashboard from './pages/SuperAdminDashboard';
// import InviteAuthorityPage from './pages/InviteAuthorityPage';


// function App() {
//   return (
//     <Routes>
//       {/* === PUBLIC ROUTES === */}
//       <Route element={<PublicLayout />}>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         {/* This is the new public route for the invitation link */}
//         <Route path="/authority-register" element={<CompleteAuthorityRegistrationPage />} />
//         <Route path="/" element={<Navigate to="/login" />} />
//       </Route>

//       {/* === CITIZEN PROTECTED ROUTES === */}
//       <Route element={<ProtectedRoute />}>
//         <Route element={<CitizenLayout />}>
//           <Route path="/dashboard" element={<CitizenDashboardPage />} />
//           <Route path="/report" element={<ReportIssuePage />} />
//           <Route path="/my-issues" element={<ViewMyIssuesPage />} />
//           <Route path="/nearby" element={<NearbyIssuesPage />} />
//           <Route path="/map" element={<MapPage />} />
//           <Route path="/issue/:id" element={<IssueDetailPage />} />
//         </Route>
//       </Route>
      
//       {/* === AUTHORITY ADMIN PROTECTED ROUTES === */}
//       <Route element={<AdminRoute />}>
//         <Route element={<AdminLayout />}>
//           <Route path="/admin" element={<AdminDashboardPage />} />
//           <Route path="/admin/issues" element={<AdminIssuesListPage />} />
//           <Route path="/admin/grouped-reports" element={<GroupedReportsPage />} />
//         </Route>
//       </Route>

//       {/* === SUPER ADMIN PROTECTED ROUTES === */}
//       <Route element={<SuperAdminRoute />}>
//         <Route element={<SuperAdminLayout />}>
//           <Route path="/super-admin" element={<SuperAdminDashboard />} />
//           <Route path="/super-admin/invite" element={<InviteAuthorityPage />} />
//         </Route>
//       </Route>

//     </Routes>
//   );
// }

// export default App;





import { Routes, Route, Navigate } from 'react-router-dom';

// --- Layouts & Route Guards ---
import PublicLayout from './components/PublicLayout';
import CitizenLayout from './components/CitizenLayout';
import AdminLayout from './components/AdminLayout';
import SuperAdminLayout from './components/SuperAdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import SuperAdminRoute from './components/SuperAdminRoute';

// --- Public Pages ---
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CompleteAuthorityRegistrationPage from './pages/CompleteAuthorityRegistrationPage'; 

// --- Citizen Pages ---
import CitizenDashboardPage from './pages/CitizenDashboardPage';
import ReportIssuePage from './pages/ReportIssuePage';
import ViewMyIssuesPage from './pages/ViewMyIssuesPage';
import NearbyIssuesPage from './pages/NearbyIssuesPage';
import MapPage from './pages/MapPage';
import IssueDetailPage from './pages/IssueDetailPage';
import FeedPage from './pages/FeedPage'; // Use the renamed FeedPage for reports

// --- Authority Admin Pages ---
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminIssuesListPage from './pages/AdminIssuesListPage';
import GroupedReportsPage from './pages/GroupedReportsPage';

// --- Super Admin Pages ---
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import InviteAuthorityPage from './pages/InviteAuthorityPage';


function App() {
  return (
    <Routes>
      {/* === PUBLIC ROUTES === */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} /> {/* UPDATED: HomePage is now the default */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/authority-register" element={<CompleteAuthorityRegistrationPage />} />
      </Route>

      {/* === CITIZEN PROTECTED ROUTES === */}
      <Route element={<ProtectedRoute />}>
        <Route element={<CitizenLayout />}>
          <Route path="/dashboard" element={<CitizenDashboardPage />} />
          <Route path="/report" element={<ReportIssuePage />} />
          <Route path="/my-issues" element={<ViewMyIssuesPage />} />
          <Route path="/reports" element={<FeedPage />} /> {/* UPDATED: Using FeedPage here */}
          <Route path="/nearby" element={<NearbyIssuesPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/issue/:id" element={<IssueDetailPage />} />
        </Route>
      </Route>
      
      {/* === AUTHORITY ADMIN PROTECTED ROUTES === */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/issues" element={<AdminIssuesListPage />} />
          <Route path="/admin/grouped-reports" element={<GroupedReportsPage />} />
        </Route>
      </Route>

      {/* === SUPER ADMIN PROTECTED ROUTES === */}
      <Route element={<SuperAdminRoute />}>
        <Route element={<SuperAdminLayout />}>
          <Route path="/super-admin" element={<SuperAdminDashboard />} />
          <Route path="/super-admin/invite" element={<InviteAuthorityPage />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default App;