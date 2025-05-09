import React from 'react';
import { useAuth } from '../../hooks/useAuth';
// Import your role-specific dashboards here once created
// import AdminDashboard from './AdminDashboard';
// import DoctorDashboard from './DoctorDashboard';
// import NurseDashboard from './NurseDashboard';
// import ReceptionistDashboard from './ReceptionistDashboard';

function DashboardDispatcher() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // This should ideally be caught by ProtectedRoute
    return <p className="p-6 text-center text-gray-700">Loading user data or not authenticated...</p>;
  }

  // Placeholder for actual dashboards
  const renderDashboardByRole = () => {
    switch (currentUser.role) {
      case 'Admin':
        // return <AdminDashboard />;
        return <div className="p-6"><h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1><p className="mt-2 text-gray-600">Welcome, {currentUser.full_name || currentUser.username}! Manage system users, staff, rooms, and services.</p></div>;
      case 'Doctor':
        // return <DoctorDashboard />;
        return <div className="p-6"><h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1><p className="mt-2 text-gray-600">Welcome, Dr. {currentUser.full_name || currentUser.username}! View your appointments and manage patient treatments.</p></div>;
      case 'Nurse':
        // return <NurseDashboard />;
        return <div className="p-6"><h1 className="text-3xl font-bold text-gray-800">Nurse Dashboard</h1><p className="mt-2 text-gray-600">Welcome, {currentUser.full_name || currentUser.username}! View your assigned tasks and patient care duties.</p></div>;
      case 'Receptionist':
        // return <ReceptionistDashboard />;
        return <div className="p-6"><h1 className="text-3xl font-bold text-gray-800">Receptionist Dashboard</h1><p className="mt-2 text-gray-600">Welcome, {currentUser.full_name || currentUser.username}! Manage patient registrations and schedule appointments.</p></div>;
      // Add cases for 'WardBoy', 'BillingStaff'
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800">Welcome, {currentUser.full_name || currentUser.username}!</h1>
            <p className="text-gray-600">Your role is: {currentUser.role}.</p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto mt-8">
      {renderDashboardByRole()}
    </div>
  );
}

export default DashboardDispatcher;
