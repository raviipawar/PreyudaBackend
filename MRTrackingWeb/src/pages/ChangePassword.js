import React, { useState } from 'react';
import '../styles/ChangePassword.css';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const token = localStorage.getItem('jwtToken');
  const navigate = useNavigate(); // ✅ initialize navigation

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8082/api/admin/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert('Password changed successfully!');
        const role = localStorage.getItem('userRole');
        const normalizedRole = role.toUpperCase();
        if (normalizedRole === 'ROLE_ADMIN') navigate('/admin-dashboard');
        else if (normalizedRole === 'ROLE_MR') navigate('/mr-dashboard');
        else navigate('/dashboard');
      } else {
        const errorData = await response.json();
        alert('Failed to change password: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="oldPassword"
          placeholder="Current Password"
          value={form.oldPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
