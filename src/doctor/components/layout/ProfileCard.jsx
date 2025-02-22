import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faUser,
  faHospital,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar"; // Assuming you have a Sidebar component
import Header from "./Header"; // Assuming you have a Header component
import Footer from "./Footer"; // Assuming you have a Footer component

const Profile = () => {
  const [activeTab, setActiveTab] = useState("About");

  const doctor = {
    name: "Dr. Jane Smith",
    specialty: "Cardiologist",
    hospital: "VNA Health Center",
    location: "New York, NY",
    email: "jane.smith@vnahealth.com",
    phone: "(123) 456-7890",
    profileImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw8gAIuuwvuLLaSO1MOozWfUsNarW1Ws31Lg&s",
    bio: "Dr. Smith is a board-certified cardiologist with over 10 years of experience. She is dedicated to providing the best possible care for her patients.",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar className="w-64 bg-[#0D2853] text-white shadow-xl p-6" />

        {/* Profile Content */}
        <div className="flex-grow bg-blue-50 p-8">
          {/* Profile Header */}
          <div className="w-full max-w-3xl mx-auto bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl shadow-lg p-8 text-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/40 shadow-md mx-auto">
              <img
                src={doctor.profileImage}
                alt="Doctor Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl font-semibold text-[#0D2853] mt-4">
              {doctor.name}
            </h1>
            <p className="text-blue-500 text-xl font-medium">{doctor.specialty}</p>
            <p className="text-gray-600 text-md mt-2">{doctor.hospital}</p>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex space-x-6 justify-center">
            {["About", "Contact", "Hospital"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-blue-500 text-white shadow-xl"
                    : "bg-white/40 text-[#0D2853] hover:bg-white/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="w-full max-w-3xl mx-auto mt-8 space-y-6">
            {activeTab === "About" && (
              <div className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-xl shadow-xl p-8">
                <h2 className="text-2xl font-semibold text-[#0D2853]">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="mr-3 text-blue-500"
                  />
                  About Me
                </h2>
                <p className="text-gray-700 mt-4">{doctor.bio}</p>
              </div>
            )}

            {activeTab === "Contact" && (
              <div className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-xl shadow-xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-[#0D2853]">
                  <FontAwesomeIcon icon={faUser} className="mr-3 text-blue-500" />
                  Contact Info
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center bg-white/30 px-6 py-3 rounded-lg shadow-md hover:bg-white/50 transition-all">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="mr-3 text-blue-500"
                    />
                    <a href={`mailto:${doctor.email}`} className="text-gray-700">
                      {doctor.email}
                    </a>
                  </div>
                  <div className="flex items-center bg-white/30 px-6 py-3 rounded-lg shadow-md hover:bg-white/50 transition-all">
                    <FontAwesomeIcon icon={faPhone} className="mr-3 text-blue-500" />
                    <span className="text-gray-700">{doctor.phone}</span>
                  </div>
                  <div className="flex items-center bg-white/30 px-6 py-3 rounded-lg shadow-md hover:bg-white/50 transition-all">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="mr-3 text-blue-500"
                    />
                    <span className="text-gray-700">{doctor.location}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Hospital" && (
              <div className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-xl shadow-xl p-8">
                <h2 className="text-2xl font-semibold text-[#0D2853]">
                  <FontAwesomeIcon
                    icon={faHospital}
                    className="mr-3 text-blue-500"
                  />
                  Hospital Affiliation
                </h2>
                <p className="text-gray-700 mt-4">{doctor.hospital}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
