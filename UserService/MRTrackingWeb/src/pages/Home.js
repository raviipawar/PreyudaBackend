import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="mt-20 mb-16">
      {/* Hero Section with background gradient */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24 px-6 text-center shadow-inner">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to MR Tracking Web App</h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Manage your Medical Representatives, doctor visits, and sales reporting — all in one place.
        </p>
        <Link
          to="/register"
          className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Optional: Services/Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Daily Check-ins</h3>
              <p className="text-gray-600">Track MR daily visits and ensure accountability with time-stamped logs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Doctor Visit Logs</h3>
              <p className="text-gray-600">Get insights into marketing calls and effectiveness of MR field visits.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
              <p className="text-gray-600">Role-based access ensures secure logins for Admins, MRs, and Managers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-blue-600 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom MR Solution?</h2>
          <p className="mb-6 text-lg">We design healthcare and pharma software tailored to your business.</p>
          <a
            href="mailto:contact@mybusiness.com"
            className="bg-white text-blue-600 px-6 py-3 font-semibold rounded hover:bg-gray-100 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
