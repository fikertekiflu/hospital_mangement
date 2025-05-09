import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ArrowLeftOnRectangleIcon, UserCircleIcon, Cog6ToothIcon, UsersIcon, BriefcaseIcon, BuildingOfficeIcon, CalendarDaysIcon, DocumentTextIcon, CreditCardIcon, ClipboardDocumentListIcon, ListBulletIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <Link to={isAuthenticated ? "/dashboard" : "/login"} className="text-2xl font-bold tracking-tight hover:text-indigo-200 transition-colors">
            Hospital MS
          </Link>
          <div className="flex items-center space-x-4">
            {isAuthenticated && currentUser ? (
              <>
                {/* Role-specific quick links - could be a dropdown menu */}
                {currentUser.role === 'Admin' && (
                  <Link to="/admin/users" title="Manage Users" className="p-2 rounded-md hover:bg-indigo-700 transition-colors">
                    <UsersIcon className="h-6 w-6" />
                  </Link>
                )}
                 {currentUser.role === 'Admin' && (
                  <Link to="/admin/staff" title="Manage Staff" className="p-2 rounded-md hover:bg-indigo-700 transition-colors">
                    <BriefcaseIcon className="h-6 w-6" />
                  </Link>
                )}
                {(currentUser.role === 'Receptionist' || currentUser.role === 'Admin') && (
                  <Link to="/patients/new" title="Register Patient" className="p-2 rounded-md hover:bg-indigo-700 transition-colors">
                     <UserCircleIcon className="h-6 w-6" /> {/* Placeholder, better icon needed */}
                  </Link>
                )}
                 {(currentUser.role === 'Receptionist' || currentUser.role === 'Admin' || currentUser.role === 'Doctor') && (
                  <Link to="/appointments/schedule" title="Schedule Appointment" className="p-2 rounded-md hover:bg-indigo-700 transition-colors">
                     <CalendarDaysIcon className="h-6 w-6" />
                  </Link>
                )}
                 {(currentUser.role === 'Nurse' || currentUser.role === 'WardBoy') && (
                  <Link to="/assignments/my-tasks" title="My Tasks" className="p-2 rounded-md hover:bg-indigo-700 transition-colors">
                     <ListBulletIcon className="h-6 w-6" />
                  </Link>
                )}


                <span className="text-sm text-indigo-100 hidden md:block">
                  {currentUser.full_name || currentUser.username} ({currentUser.role})
                </span>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 rounded-md hover:bg-red-500 hover:bg-opacity-80 transition-colors flex items-center"
                >
                  <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                  <span className="ml-2 hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
