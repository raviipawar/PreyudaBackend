// src/components/MRListByRegion.js
import React, { useState } from 'react';

const MRListByRegion = ({ mrList, setShowViewMrByRegionModal }) => {
  const [filteredMrList, setFilteredMrList] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All');

  // Handle Region Change
  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    if (region === 'All') {
      setFilteredMrList(mrList);
    } else {
      const filtered = mrList.filter((mr) => mr.region === region);
      setFilteredMrList(filtered);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 shadow-xl w-full max-w-4xl h-3/4 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Medical Representatives by Region</h2>
        <select
          className="w-full p-2 border rounded mb-4"
          value={selectedRegion}
          onChange={handleRegionChange}
        >
          <option value="All">Select Region</option>
          {[...new Set(mrList.map((mr) => mr.region))].map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        {filteredMrList.length === 0 ? (
          <p>No MRs found for the selected region.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Username</th>
                <th className="p-2">Email</th>
                <th className="p-2">Region</th>
              </tr>
            </thead>
            <tbody>
              {filteredMrList.map((mr) => (
                <tr key={mr.id} className="border-b">
                  <td className="p-2">{mr.username}</td>
                  <td className="p-2">{mr.email}</td>
                  <td className="p-2">{mr.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={() => setShowViewMrByRegionModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MRListByRegion;
