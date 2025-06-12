
import React from 'react';
import StudentDashboard from './StudentDashboard'
import TeacherDashboard from './TeacherDashboard';
import TPCDashboard from './TPCDashboard';
import TPODashboard from './TPODashboard';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const userRole = useSelector(store => store.auth.userRole);
  
  if (userRole === 'student') {
    return <StudentDashboard />;
  } else if (userRole === 'teacher') {
    return <TeacherDashboard />;
  } else if (userRole === 'tpc') {
    return <TPCDashboard />;
  } else if (userRole === 'tpo') {
    return <TPODashboard />;
  }
  
  // Fallback for unknown roles
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-4 text-lg text-gray-600">
          Welcome to your dashboard. Your role doesn't seem to be configured properly.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
