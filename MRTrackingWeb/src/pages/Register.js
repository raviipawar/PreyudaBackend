import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../constants/api';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    roles: 'ROLE_MR',
    contactNo: '',
    region: '',
    location: '',
    dob: '',
    gender: 'MALE',
    imageUrl: '',
    idProof: '',
  });

  const [errors, setErrors] = useState({});

  // 🚫 Redirect if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const role = localStorage.getItem('userRole');
  
    if (token && role) {
      // Normalize role and redirect accordingly
      const normalizedRole = role.toUpperCase();
  
      if (normalizedRole === 'ROLE_ADMIN') navigate('/admin-dashboard');
      else if (normalizedRole === 'ROLE_MR') navigate('/mr-dashboard');
      else navigate('/dashboard'); // fallback
    }
  }, [navigate]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.username.trim()) tempErrors.username = 'Username is required';
    if (!formData.email.trim()) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Invalid email';
    if (!formData.password.trim()) tempErrors.password = 'Password is required';
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = validate();
    if (Object.keys(tempErrors).length) {
      setErrors(tempErrors);
      return;
    }

    const payload = {
      ...formData,
      roles: [formData.roles || 'ROLE_MR'],
    };

    try {
      const response = await fetch(ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Registration successful!');
        setFormData({
          username: '',
          email: '',
          password: '',
          roles: 'ROLE_MR',
          contactNo: '',
          region: '',
          location: '',
          dob: '',
          gender: 'MALE',
          imageUrl: '',
          idProof: '',
        });
        navigate('/login');
      } else {
        const error = await response.json();
        alert(`Registration failed: ${error.message || 'Try again'}`);
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Register</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['Username', 'username'],
            ['Email', 'email', 'email'],
            ['Password', 'password', 'password'],
            ['Contact No', 'contactNo'],
            ['Region', 'region'],
            ['Location', 'location'],
            ['Date of Birth', 'dob', 'date'],
            ['Image URL', 'imageUrl'],
            ['ID Proof', 'idProof'],
          ].map(([label, name, type = 'text']) => (
            <div key={name}>
              <label className="block font-medium">{label}</label>
              <input
                type={type}
                className="w-full border rounded px-3 py-2 mt-1"
                value={formData[name]}
                onChange={(e) => handleChange(name, e.target.value)}
              />
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))}

          {/* Role Dropdown */}
          <div>
            <label className="block font-medium">Role</label>
            <select
              className="w-full border rounded px-3 py-2 mt-1"
              value={formData.roles}
              onChange={(e) => handleChange('roles', e.target.value)}
            >
              <option value="ROLE_MR">MR</option>
              <option value="ROLE_ADMIN">Admin</option>
              <option value="ROLE_DOCTOR">Doctor</option>
            </select>
          </div>

          {/* Gender Dropdown */}
          <div>
            <label className="block font-medium">Gender</label>
            <select
              className="w-full border rounded px-3 py-2 mt-1"
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHERS">Others</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
