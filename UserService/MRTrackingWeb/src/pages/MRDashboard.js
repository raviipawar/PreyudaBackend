import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../constants/api';

const MRDashboard = () => {
  const navigate = useNavigate();

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
      navigate('/');
    } catch (err) {
      alert(err.message || 'Logout failed');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Welcome to MR Dashboard</h1>
    </div>
  );
};

export default MRDashboard;
