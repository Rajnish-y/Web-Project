import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "./doctor/components/layout/Dashboard";
import DAuthPage from "./doctor/components/authentication/DAuthPage";
import Header from "./doctor/components/layout/Header";
import Sidebar from './doctor/components/layout/Sidebar'; // Ensure the filename matches exactly (case-sensitive).
import Footer from "./doctor/components/layout/Footer";
import AppointmentList from "./doctor/components/layout/AppointmentList";
import PatientList from "./doctor/components/layout/PatientList";
import ProfileCard from "./doctor/components/layout/ProfileCard";
import PAuthPage from "./patient/components/authentication/PAuthPage"
import PDashboard from "./Pdash/PDashboard.jsx";
import AiBot from "./Pdash/AiBot.jsx"
import MapComponent from "./Pdash/MapComponent.jsx";
import AppointmentBooking from "./Pdash/AppointmentBooking.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage type="none" />} />
        <Route path="/auth" element={<DAuthPage />} />
        <Route path="/pauth" element={<PAuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
              <Route path="/appointments" element={<AppointmentList />} />
              <Route path="/patients" element={<PatientList />} />
              <Route path="/profile" element={<ProfileCard />} />
              <Route path="/pdashboard" element={<PDashboard />} />
              <Route path="/ai" element={<AiBot />} />
              <Route path="/map" element = {<MapComponent />} />
              <Route path="/appointment" element={<AppointmentBooking />} />
      </Routes>
    </Router>
  );
}
