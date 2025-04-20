import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Hospital, Info, Calendar, Clock } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [editMode, setEditMode] = useState(false);
  const [doctor, setDoctor] = useState({
    name: "Dr. Jane Smith",
    specialty: "Cardiologist",
    hospital: "VNA Health Center",
    location: "New York, NY",
    email: "jane.smith@vnahealth.com",
    phone: "(123) 456-7890",
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    bio: "Board-certified cardiologist with over 10 years of experience. Specializes in preventive cardiology and heart failure management. Completed fellowship at Johns Hopkins Hospital.",
    workingHours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "10:00 AM - 6:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 3:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    education: [
      "MD, Harvard Medical School",
      "Residency in Internal Medicine, Massachusetts General Hospital",
      "Fellowship in Cardiology, Johns Hopkins Hospital"
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor(prev => ({ ...prev, [name]: value }));
  };

  const tabs = [
    { id: "about", label: "About", icon: <Info size={18} className="mr-2" /> },
    { id: "contact", label: "Contact", icon: <Mail size={18} className="mr-2" /> },
    { id: "hospital", label: "Hospital", icon: <Hospital size={18} className="mr-2" /> },
    { id: "schedule", label: "Schedule", icon: <Calendar size={18} className="mr-2" /> }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                <img
                  src={doctor.profileImage}
                  alt="Doctor Profile"
                  className="w-full h-full object-cover"
                />
                {editMode && (
                  <button className="absolute bottom-0 left-0 right-0 bg-black/50 text-white py-1 text-xs">
                    Change Photo
                  </button>
                )}
              </div>
              <div className="mt-4">
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={doctor.name}
                    onChange={handleInputChange}
                    className="text-3xl font-bold text-center text-gray-800 border-b border-blue-200 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-800">{doctor.name}</h1>
                )}
                {editMode ? (
                  <input
                    type="text"
                    name="specialty"
                    value={doctor.specialty}
                    onChange={handleInputChange}
                    className="text-xl text-blue-600 text-center font-medium border-b border-blue-200 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="text-xl text-blue-600 font-medium">{doctor.specialty}</p>
                )}
                {editMode ? (
                  <input
                    type="text"
                    name="hospital"
                    value={doctor.hospital}
                    onChange={handleInputChange}
                    className="text-gray-600 text-center border-b border-blue-200 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-600">{doctor.hospital}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setEditMode(!editMode)}
                className={`px-4 py-2 rounded-lg font-medium ${editMode
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
                  } transition-colors`}
              >
                {editMode ? "Save Profile" : "Edit Profile"}
              </button>
            </div>
            <div className="flex space-x-2 mt-8 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${activeTab === tab.id
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {activeTab === "about" && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <Info className="text-blue-500 mr-3" />
                    Professional Bio
                  </h2>
                  {editMode ? (
                    <textarea
                      name="bio"
                      value={doctor.bio}
                      onChange={handleInputChange}
                      className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="5"
                    />
                  ) : (
                    <p className="text-gray-700 mt-4">{doctor.bio}</p>
                  )}

                  <h3 className="text-xl font-semibold text-gray-800 mt-8 flex items-center">
                    <User className="text-blue-500 mr-3" />
                    Education & Qualifications
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {doctor.education.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "contact" && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <Mail className="text-blue-500 mr-3" />
                    Contact Information
                  </h2>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <Mail className="text-blue-500 mr-4" />
                      {editMode ? (
                        <input
                          type="email"
                          name="email"
                          value={doctor.email}
                          onChange={handleInputChange}
                          className="flex-1 p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <a href={`mailto:${doctor.email}`} className="text-gray-700 hover:text-blue-500">
                            {doctor.email}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <Phone className="text-blue-500 mr-4" />
                      {editMode ? (
                        <input
                          type="tel"
                          name="phone"
                          value={doctor.phone}
                          onChange={handleInputChange}
                          className="flex-1 p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <a href={`tel:${doctor.phone.replace(/\D/g, '')}`} className="text-gray-700 hover:text-blue-500">
                            {doctor.phone}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <MapPin className="text-blue-500 mr-4" />
                      {editMode ? (
                        <input
                          type="text"
                          name="location"
                          value={doctor.location}
                          onChange={handleInputChange}
                          className="flex-1 p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="text-gray-700">{doctor.location}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "hospital" && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <Hospital className="text-blue-500 mr-3" />
                    Hospital Affiliation
                  </h2>
                  <div className="mt-6">
                    {editMode ? (
                      <input
                        type="text"
                        name="hospital"
                        value={doctor.hospital}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                          <Hospital className="text-blue-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium text-gray-800">{doctor.hospital}</h3>
                          <p className="text-gray-600 mt-1">{doctor.location}</p>
                          <button className="mt-3 text-blue-500 hover:text-blue-700 font-medium">
                            View Hospital Profile
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {activeTab === "schedule" && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <Calendar className="text-blue-500 mr-3" />
                    Working Hours
                  </h2>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(doctor.workingHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <Clock className="text-blue-500 mr-4" />
                        <div>
                          <p className="text-sm text-gray-500 capitalize">{day}</p>
                          <p className="text-gray-700 font-medium">{hours}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;