import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  const currentUser=false
  const userRole='teacher'
  return  (
    <header className="bg-blue-700 sticky top-0 z-50 bg-scope-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            SCOPE
          </Link>
          <span className="hidden md:inline-block ml-2 text-xs text-scope-light/80">
            Streamlined Communication and Organised Placement Engagement
          </span>
        </div>
        
        {currentUser ? (
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-4">
              <div to="/dashboard" className="hover:text-scope-accent transition-colors">
                Dashboard
              </div>
              {['student', 'tpc'].includes(userRole) && (
                <div to="/events" className="hover:text-scope-accent transition-colors">
                  Events
                </div>
              )}
              {['teacher', 'tpo'].includes(userRole) && (
                <div to="/manage-events" className="hover:text-scope-accent transition-colors">
                  Manage Events
                </div>
              )}
              {['student', 'tpc'].includes(userRole) && (
                <div to="/queries" className="hover:text-scope-accent transition-colors">
                  Queries
                </div>
              )}
              {['tpc', 'tpo'].includes(userRole) && (
                <div to="/manage-queries" className="hover:text-scope-accent transition-colors">
                  Manage Queries
                </div>
              )}
              {userRole === 'teacher' && (
                <div to="/student-marks" className="hover:text-scope-accent transition-colors">
                  Student Marks
                </div>
              )}
            </nav>
            <div className="flex items-center space-x-2">
              <div to="/profile" className="hover:text-scope-accent transition-colors">
                Profile
              </div>
              <button  
                className="bg-scope-accent/80 hover:bg-scope-accent px-3 py-1 rounded transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link 
              to="/login" 
              className="hover:text-scope-accent transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-scope-accent/80 hover:bg-scope-accent px-3 py-1 rounded transition-colors"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar