import React, { useState } from "react";
import DAuthPage from "./doctor/components/authentication/DAuthPage";
import PAuthPage from "./patient/components/authentication/PAuthPage";
import PatientPage from "./patient/components/authentication/PatientPage"
import DoctorPage from "./doctor/components/authentication/DoctorPage";
import { Activity, Calendar, Users, Shield, Heart, MessageSquare } from "lucide-react";

const LandingPage = () => {
  const [userType, setUserType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleUserTypeSelection = (type) => {
    setUserType(type);
  };

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  if (userType === null) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle,_#a1c4fd_0%,_#c2e9fb_100%)] p-8">
        <nav className="flex items-center justify-between mb-20">
        <div className="flex items-center space-x-2">
        <Activity className="h-8 w-8 text-blue-400" />
        <span className="text-xl font-bold text-blue-900">DOC HIVE</span>
      </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-105"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-105"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-105"
            >
              Blog
            </a>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center rounded-lg p-8 backdrop-blur-md bg-white bg-opacity-30 shadow-xl">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Connect. Heal. Thrive
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Your health journey starts here. With Doc Hive, connect with
            healthcare professionals and manage your medical care seamlessly.
          </p>

          <div className="flex flex-col space-y-4 max-w-md mx-auto">
            <button
              onClick={() => handleUserTypeSelection("patient")}
              className="w-full py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 ease-in-out duration-300"
            >
              I'm a Patient
            </button>
            <button
              onClick={() => handleUserTypeSelection("doctor")}
              className="w-full py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 ease-in-out duration-300"
            >
              I'm a Doctor
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-20">
          <div className="p-6 rounded-xl backdrop-blur-md bg-white bg-opacity-20 shadow-xl transition-transform transform hover:scale-105 ease-in-out duration-300">
            <div className="text-2xl font-bold text-gray-800 mb-2">24/7</div>
            <div className="text-gray-600">
              Access to healthcare professionals around the clock
            </div>
          </div>
          <div className="p-6 rounded-xl backdrop-blur-md bg-white bg-opacity-20 shadow-xl transition-transform transform hover:scale-105 ease-in-out duration-300">
            <div className="text-2xl font-bold text-gray-800 mb-2">Secure</div>
            <div className="text-gray-600">
              End-to-end encrypted communications and data storage
            </div>
          </div>
          <div className="p-6 rounded-xl backdrop-blur-md bg-white bg-opacity-20 shadow-xl transition-transform transform hover:scale-105 ease-in-out duration-300">
            <div className="text-2xl font-bold text-gray-800 mb-2">Easy</div>
            <div className="text-gray-600">
              Simple and intuitive interface for both patients and doctors
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle,_#a1c4fd_0%,_#c2e9fb_100%)] p-8">
        {userType === "patient" ? (
          <PAuthPage onAuth={handleAuthentication} />
        ) : (
          <DAuthPage onAuth={handleAuthentication} />
        )}
      </div>
    );
  }

  return userType === "patient" ? <PatientPage /> : <DoctorPage />;
};

export default LandingPage;
