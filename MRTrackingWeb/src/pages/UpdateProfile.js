import React, { useState, useEffect } from 'react';
import '../styles/UpdateProfile.css';
import { useNavigate } from 'react-router-dom';


const UpdateProfile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    contactNo: '',
    location: '',
    region: '',
  });

  const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate(); // ✅ initialize navigation
  

  useEffect(() => {
    // Fetch current profile
    fetch('http://localhost:8082/api/admin/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error('Failed to load profile', err));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8082/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        alert('Profile updated successfully!');
        const role = localStorage.getItem('userRole');
        const normalizedRole = role.toUpperCase();
        if (normalizedRole === 'ROLE_ADMIN') navigate('/admin-dashboard');
        else if (normalizedRole === 'ROLE_MR') navigate('/mr-dashboard');
        else navigate('/dashboard');      } else {
        const errorData = await response.json();
        alert('Update failed: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="username"
          value={profile.username}
          onChange={handleChange}
          placeholder="Username"
          disabled
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          disabled
        />
        <input
          type="text"
          name="contactNo"
          value={profile.contactNo}
          onChange={handleChange}
          placeholder="Contact Number"
        />
        <input
          type="text"
          name="location"
          value={profile.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <input
          type="text"
          name="region"
          value={profile.region}
          onChange={handleChange}
          placeholder="Region"
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;

