import React, { useState } from "react";
import axios from "axios";
import MRListByRegion from "../pages/MRListByRegion";

const AdminDashboard = () => {
  const [showAddMrModal, setShowAddMrModal] = useState(false);
  const [showViewMrModal, setShowViewMrModal] = useState(false);
  const [showViewMrByRegionModal, setShowViewMrByRegionModal] = useState(false);
  const [showEditMrModal, setShowEditMrModal] = useState(false);
  const [mrList, setMrList] = useState([]);
  const [selectedMr, setSelectedMr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [mrData, setMrData] = useState({
    username: "",
    email: "",
    password: "",
    roles: ["ROLE_MR"],
    contactNo: "",
    region: "",
    location: "",
    dob: "",
    gender: "MALE",
    imageUrl: "",
    idProof: "",
  });

  // Open Edit Modal
  const handleEditClick = (mr) => {
    setSelectedMr(mr);
    setMrData(mr);
    setShowEditMrModal(true);
  };

  // Update MR function
  const handleUpdateMr = async () => {
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:8084/api/admin/mr/${selectedMr.id}`,
        mrData
      );
      //setMessage('MR updated successfully!');
      setShowEditMrModal(false);
      fetchMrList(); // Refresh the list after update
    } catch (error) {
      setMessage("Failed to update MR: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  // Fetch MR List
  const fetchMrList = async () => {
    try {
      const response = await axios.get("http://localhost:8084/api/admin/mrs");
      setMrList(response.data);
      setShowViewMrModal(true);
    } catch (error) {
      setMessage("Failed to fetch MR list: " + error.message);
    }
  };

  // Fetch MR List by Region
  const fetchMrListByRegion = async () => {
    try {
      const response = await axios.get("http://localhost:8084/api/admin/mrs");
      setMrList(response.data);
      setShowViewMrByRegionModal(true);
    } catch (error) {
      setMessage("Failed to fetch MR list by region: " + error.message);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMrData({ ...mrData, [name]: value });
  };

  // Add MR function
  const handleAddMr = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8084/api/admin/mr", mrData);
      setMessage("MR added successfully!");
      setShowAddMrModal(false);
      setMrData({
        username: "",
        email: "",
        password: "",
        roles: ["ROLE_MR"],
        contactNo: "",
        region: "",
        location: "",
        dob: "",
        gender: "MALE",
        imageUrl: "",
        idProof: "",
      });
    } catch (error) {
      //setMessage("Failed to add MR: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage your Medical Representatives efficiently.
        </p>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ActionCard
          title="Add MR"
          description="Register a new Medical Representative."
          onClick={() => setShowAddMrModal(true)}
          bgColor="bg-indigo-500"
        />
        <ActionCard
          title="View All MRs"
          description="Check the list of all MRs."
          onClick={fetchMrList}
          bgColor="bg-blue-500"
        />
        <ActionCard
          title="View MR by Region"
          description="Find MR of specific regions."
          onClick={fetchMrListByRegion}
          bgColor="bg-purple-500"
        />
        <ActionCard
          title="View MR Activity"
          description="Check MR Activity."
          onClick={() => (window.location.href = "")}
          bgColor="bg-yellow-500"
        />
        <ActionCard
          title="Assign Task to MR"
          description="Assign Tasks to MR."
          onClick={() => (window.location.href = "")}
          bgColor="bg-green-500"
        />
        <ActionCard
          title="Offline MR Tool"
          description="Remove an MR from the system."
          onClick={() => (window.location.href = "")}
          bgColor="bg-red-500"
        />
      </div>

      {/* Add MR Modal */}
      {showAddMrModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-xl w-full max-w-3xl h-3/4 overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Add New MR</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "username",
                "email",
                "password",
                "contactNo",
                "region",
                "location",
                "dob",
                "imageUrl",
                "idProof",
              ].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-gray-700 mb-1">
                    {field.toUpperCase()}
                  </label>
                  <input
                    type={field === "dob" ? "date" : "text"}
                    name={field}
                    value={mrData[field]}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={() => setShowAddMrModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAddMr}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add MR"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View MR Modal */}
      {showViewMrModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-xl w-full max-w-4xl h-3/4 overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">
              All Medical Representatives
            </h2>
            {mrList.length === 0 ? (
              <p>No MR data available.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Username</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Contact</th>
                    <th className="p-2">Location</th>
                    <th className="p-2">Region</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mrList.map((mr) => (
                    <tr key={mr.id} className="border-b">
                      <td className="p-2">{mr.username}</td>
                      <td className="p-2">{mr.email}</td>
                      <td className="p-2">{mr.contactNo}</td>
                      <td className="p-2">{mr.location}</td>
                      <td className="p-2">{mr.region}</td>
                      <td className="p-2">
                        <button
                          onClick={() => handleEditClick(mr)}
                          className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={() => setShowViewMrModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit MR Modal */}
      {showEditMrModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-xl w-full max-w-3xl h-3/4 overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Edit MR - {mrData.username}
            </h2>

            {Object.keys(mrData).map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-gray-700 mb-1">
                  {field.toUpperCase()}
                </label>
                <input
                  type={field === "dob" ? "date" : "text"}
                  name={field}
                  value={mrData[field]}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={() => setShowEditMrModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleUpdateMr}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showViewMrByRegionModal && (
        <MRListByRegion
          mrList={mrList}
          setShowViewMrByRegionModal={setShowViewMrByRegionModal}
        />
      )}
    </div>
  );
};

// Reusable Action Card Component
const ActionCard = ({ title, description, onClick, bgColor }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg cursor-pointer transition transform hover:scale-105 ${bgColor} text-white`}
      onClick={onClick}
    >
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default AdminDashboard;
