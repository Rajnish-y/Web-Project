import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "./doctor/components/layout/Dashboard";
import DAuthPage from "./doctor/components/authentication/DAuthPage";
import Header from "./doctor/components/layout/Header";
import Sidebar from './doctor/components/layout/Sidebar';
import Footer from "./doctor/components/layout/Footer";
import AppointmentList from "./doctor/components/layout/AppointmentList";
import PatientList from "./doctor/components/layout/PatientList";
import ProfileCard from "./doctor/components/layout/ProfileCard";
import PAuthPage from "./patient/components/authentication/PAuthPage";
import PDashboard from "./Pdash/PDashboard.jsx";
import AiBot from "./Pdash/AiBot.jsx";
import MapComponent from "./Pdash/MapComponent.jsx";
import AppointmentBooking from "./Pdash/AppointmentBooking.jsx";

import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage type="none" />} />
        <Route path="/auth" element={<DAuthPage />} />
        <Route path="/pauth" element={<PAuthPage />} />

        <Route path="/dashboard" element={
          <ProtectedRoute requiredRole="doctor">
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/appointments" element={
          <ProtectedRoute requiredRole="doctor">
            <AppointmentList />
          </ProtectedRoute>
        } />

        <Route path="/patients" element={
          <ProtectedRoute requiredRole="doctor">
            <PatientList />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute requiredRole="doctor">
            <ProfileCard />
          </ProtectedRoute>
        } />

        <Route path="/pdashboard" element={
          <ProtectedRoute requiredRole="patient">
            <PDashboard />
          </ProtectedRoute>
        } />

        <Route path="/ai" element={
          <ProtectedRoute requiredRole="patient">
            <AiBot />
          </ProtectedRoute>
        } />

        <Route path="/map" element={
          <ProtectedRoute requiredRole="patient">
            <MapComponent />
          </ProtectedRoute>
        } />

        <Route path="/appointment" element={
          <ProtectedRoute requiredRole="patient">
            <AppointmentBooking />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

