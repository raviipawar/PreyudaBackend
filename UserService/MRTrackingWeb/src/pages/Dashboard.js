import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      {/* Dashboard content here */}
      <div style={{ marginTop: 20 }}>
        <Link to="/">← Go Back to Home</Link>
      </div>
    </div>
  );
};

export default Dashboard;
