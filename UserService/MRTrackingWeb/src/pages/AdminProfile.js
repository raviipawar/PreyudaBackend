import React, { useEffect, useState } from 'react';

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // Or wherever you're storing it

    fetch('http://localhost:8082/api/admin/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }
        return res.json();
      })
      .then(data => setProfile(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
      <ul className="text-lg">
        <li><strong>Username:</strong> {profile.username}</li>
        <li><strong>Email:</strong> {profile.email}</li>
        <li><strong>Contact No:</strong> {profile.contactNo}</li>
        <li><strong>Location:</strong> {profile.location}</li>
        <li><strong>Region:</strong> {profile.region}</li>
        {/* Add more fields as needed */}
      </ul>
    </div>
  );
};

export default AdminProfile;
