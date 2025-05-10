// MainLayout.js
import React, { useState } from 'react';
import Navbar from './Navbar'; // Assuming Navbar.js is in the same directory
import { useAuth } from '../../hooks/useAuth'; // To get current user's role

import AdminSidebar from './Adminsidebar'; // Assuming Adminsidebar.js is in the same directory
// import DoctorSidebar from './DoctorSidebar';
// import NurseSidebar from './NurseSidebar';
// import ReceptionistSidebar from './ReceptionistSidebar';
// import WardBoySidebar from './WardBoySidebar';
// import BillingStaffSidebar from './BillingStaffSidebar';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Ensure this is installed if used in Navbar or here

const MainLayout = ({ children }) => {
  const { currentUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile sidebar toggle

  const renderSidebar = () => {
    if (!currentUser) return null; // No sidebar if not logged in

    // NOTE: Ensure AdminSidebar component is correctly imported and handles any props it might need (e.g., onLogout if it's generic)
    // The 'Sidebar.js' you provided earlier for 'AdminSidebar' accepted an 'onLogout' prop.
    // If AdminSidebar is that component, you might need to pass the onLogout function from Navbar or MainLayout.
    // For simplicity here, assuming AdminSidebar is self-contained or onLogout is handled elsewhere.
    const handleDummyLogout = () => console.log("Logout triggered from sidebar if prop was passed");

    switch (currentUser.role) {
      case 'Admin':
        // If your AdminSidebar component (which was the content of 'Sidebar.js' you sent)
        // expects an 'onLogout' prop, you'd pass it here.
        // For example: return <AdminSidebar onLogout={handleDummyLogout} />;
        return <AdminSidebar />;
    //   case 'Doctor':
    //     return <DoctorSidebar />;
    //   case 'Nurse':
    //     return <NurseSidebar />;
    //   case 'Receptionist':
    //     return <ReceptionistSidebar />;
    //   case 'WardBoy':
    //     return <WardBoySidebar />;
    //   case 'BillingStaff':
    //     return <BillingStaffSidebar />;
      default:
        return (
          <nav className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-slate-700 border-r border-slate-600 h-full">
            <div className="px-4 py-2 text-slate-300">No specific sidebar for {currentUser.role}</div>
          </nav>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <Navbar onMenuButtonClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Added pt-16 (h-16 is 4rem, typical navbar height) to push content below fixed navbar */}
      <div className="flex flex-1 pt-0">
        {/* Static sidebar for desktop */}
        <aside className="hidden md:flex md:flex-shrink-0">
          {/* The w-64 and h-full (implicitly from parent) will be applied to the rendered sidebar */}
          <div className="flex flex-col w-64">
            {renderSidebar()}
          </div>
        </aside>

        {/* Mobile sidebar (drawer) */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 flex z-40"> {/* z-40 for mobile sidebar drawer */}
            {/* Overlay */}
            <div className="fixed inset-0">
              <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setSidebarOpen(false)}></div>
            </div>
            {/* Sidebar Panel */}
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-700 pt-5 pb-4"> {/* Matching desktop sidebar padding */}
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              {renderSidebar()}
            </div>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        )}

        {/* Main content area */}
        {/* 'relative' class is crucial here for containing absolutely positioned dialogs */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto relative">
          {children} {/* Page content (e.g., RoomManagementPage) renders here */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;