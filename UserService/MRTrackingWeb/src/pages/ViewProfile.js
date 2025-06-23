import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../constants/api';

const ViewProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(ENDPOINTS.GET_PROFILE)
      .then((res) => setUser(res.data))
      .catch((err) => console.error('Error fetching profile:', err));
  }, []);

  if (!user) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <ul className="space-y-2">
        <li><strong>Username:</strong> {user.username}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Contact No:</strong> {user.contactNo}</li>
        <li><strong>Region:</strong> {user.region}</li>
        <li><strong>Location:</strong> {user.location}</li>
        <li><strong>DOB:</strong> {user.dob}</li>
        <li><strong>Gender:</strong> {user.gender}</li>
      </ul>
    </div>
  );
};

export default ViewProfile;