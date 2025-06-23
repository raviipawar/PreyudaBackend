import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MRDashboard from "./pages/MRDashboard";
import ViewProfile from "./pages/ViewProfile";
import ChangePassword from "./pages/ChangePassword";
import AdminProfile from "./pages/AdminProfile";
import UpdateProfile from "./pages/UpdateProfile";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-1 overflow-y-auto mt-16 mb-14 px-4">
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/mr-dashboard" element={<MRDashboard />} />
              <Route path="/admin/profile/view" element={<ViewProfile />} />
              <Route path="/admin/profile" element={<AdminProfile/>} />
              <Route path="/admin/profile/update" element={<UpdateProfile/>} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; // <- ✅ THIS LINE IS CRUCIAL
