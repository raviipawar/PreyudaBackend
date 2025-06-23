import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../constants/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 🚫 Redirect logged-in users away from login page
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const role = localStorage.getItem('userRole');
    

    if (token && role) {
      const normalizedRole = role.toUpperCase();
      if (normalizedRole === 'ROLE_ADMIN') navigate('/admin-dashboard');
      else if (normalizedRole === 'ROLE_MR') navigate('/mr-dashboard');
      else navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = { username, password };

    try {
      const response = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      const { token, refreshToken, roles } = data;

      // Handle both role structures: ["ROLE_ADMIN"] or [{ name: "ROLE_ADMIN" }]
      const rawRole = roles?.[0]?.name || roles?.[0];
      const role = rawRole?.toUpperCase();

      console.log('Extracted role:', role);

      // Save tokens and role to localStorage
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userRole', role);

      alert('Login successful!');

      // Role-based redirection
      if (role === 'ROLE_ADMIN') navigate('/admin-dashboard');
      else if (role === 'ROLE_MR') navigate('/mr-dashboard');
      else navigate('/dashboard');

      // Optionally reload to update header state
      // window.location.reload();

    } catch (err) {
      alert(err.message || 'Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4 font-semibold text-center">Login</h2>
        <input
          className="w-full border px-3 py-2 mb-3"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full border px-3 py-2 mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
