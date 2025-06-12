import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constants';
import { toast } from 'sonner';
import { setCurrentUser,setUser,setUserRole } from '@/store/authSlice';
function Navbar() {
  const dispatch = useDispatch();
  const currentUser=useSelector(store => store.auth.currentUser);
  const userRole= useSelector(store => store.auth.userRole);
  const navigate = useNavigate();
  const handleLogout = async() => {
    try {
      const res=axios.post(`${USER_API_ENDPOINT}/${userRole}/logout`,{}, {
        withCredentials: true,
      });
      console.log("Logout response:", res);
      toast.success(`${userRole} logged out successfully!`);
      dispatch(setCurrentUser(false));
      dispatch(setUserRole(''));
      dispatch(setUser(null));
      navigate('/')
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again.")
    }
  }
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
              <Link to="/dashboard" className="hover:text-scope-accent transition-colors">
                Dashboard
              </Link>
              {['student'].includes(userRole) && (
                <Link to="/events" className="hover:text-scope-accent transition-colors">
                  Events
                </Link>
              )}
              {['teacher'].includes(userRole) && (
                <Link to="/manage-events" className="hover:text-scope-accent transition-colors">
                  Manage Events
                </Link>
              )}
              {['student'].includes(userRole) && (
                <Link to="/queries" className="hover:text-scope-accent transition-colors">
                  Queries
                </Link>
              )}
              {['tpc', 'tpo'].includes(userRole) && (
                <Link to="/manage-queries" className="hover:text-scope-accent transition-colors">
                  Manage Queries
                </Link>
              )}
            </nav>
            <div className="flex items-center space-x-2">
              <Link to="/profile" className="hover:text-scope-accent transition-colors">
                Profile
              </Link>
              <button  onClick={handleLogout}
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