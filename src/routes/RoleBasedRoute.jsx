import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const RoleBasedRoute = ({ allowedRoles }) => {
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading user data...</p></div>;
  }

  if (!isAuthenticated) {
    // Should be caught by ProtectedRoute first if nested, but good as a safeguard
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    // User is authenticated but does not have the required role
    console.warn(`Access denied for role: ${currentUser?.role}. Allowed: ${allowedRoles.join(', ')} to path: ${location.pathname}`);
    toast.error("Access Denied: You don't have permission to view this page.");
    return <Navigate to="/dashboard" replace />; // Or to a specific "Unauthorized" page
  }

  return <Outlet />; // Render child component if role is allowed
};

export default RoleBasedRoute;
