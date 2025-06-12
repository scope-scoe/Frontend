
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const currentUser = useSelector(store => store.auth.currentUser);
  const userRole= useSelector(store => store.auth.userRole);
  const loading= useSelector(store => store.auth.loading);
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
