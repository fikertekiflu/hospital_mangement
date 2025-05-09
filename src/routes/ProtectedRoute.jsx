import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // You might want a more sophisticated global loading spinner here
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading application...</p>
        {/* Add a spinner component here */}
      </div>
    );
  }

  if (!isAuthenticated) {
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
