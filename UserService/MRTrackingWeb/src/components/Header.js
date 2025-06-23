import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getUserRole } from '../utils/auth';
import { ENDPOINTS } from '../constants/api';

const Header = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false); // Properly initialize state
  const dropdownRef = useRef(null);

  // Reset state when user logs in or out
  useEffect(() => {
    setShowOptions(false);
  }, [isLoggedIn()]);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      const response = await fetch(ENDPOINTS.LOGOUT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) throw new Error('Logout failed');

      localStorage.clear();
      alert('Logged out successfully!');
      setShowOptions(false); // Reset state on logout
      navigate('/');
    } catch (err) {
      alert(err.message || 'Logout failed');
    }
  };

  // Toggle dropdown visibility on icon click
  const toggleOptions = () => setShowOptions((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

 

  const loggedIn = isLoggedIn();
  const userRole = getUserRole();

  const handleOptionClick = () => {
    if (userRole === 'ROLE_ADMIN') navigate('/admin-dashboard');
    else if (userRole === 'ROLE_MR') navigate('/mr-dashboard');
    else navigate('/');
    setShowOptions(false); // Hide dropdown after click
  };

  return (
    <header className="fixed top-0 w-full bg-white shadow z-10 flex justify-between items-center px-6 py-4">
      <span
        onClick={() => {
          if (userRole === 'ROLE_ADMIN') navigate('/admin-dashboard');
          else if (userRole === 'ROLE_MR') navigate('/mr-dashboard');
          else navigate('/');
        }}
        className="text-xl font-bold text-blue-700 cursor-pointer"
      >
        MR Tracker
      </span>

      <nav className="flex gap-4 items-center">
        {!loggedIn ? (
          <>
            <span
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Login
            </span>
            <span
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Register
            </span>
          </>
        ) : (
          <>
            {/* Profile Icon for All Users */}
            <div className="relative" ref={dropdownRef}>
              <div
                className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer"
                onClick={toggleOptions} // Toggle on click
              >
                <span className="text-xl">{userRole === 'ROLE_ADMIN' ? 'A' : 'M'}</span>
              </div>

              {/* Profile Dropdown - Controlled by state */}
              {showOptions && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 z-10">
                  <ul className="py-2">
                  <li
    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    onClick={() => {
      navigate('/admin/profile');
    setShowOptions(false);
    }}
  >
    View Profile
  </li>
  <li
    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    onClick={() => {
      navigate('/admin/profile/update');
      setShowOptions(false);
    }}
  >
    Update Profile
  </li>
  <li
    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    onClick={() => {
      navigate('/change-password');
      setShowOptions(false);
    }}
  >
    Change Password
  </li>
  <li
    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
    onClick={handleLogout}
  >
    Logout
  </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
