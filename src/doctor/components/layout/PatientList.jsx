import React, { useState } from "react";
import Header from "./Header"; // Assuming you have a Header component
import Footer from "./Footer"; // Assuming you have a Footer component
import Sidebar from "./Sidebar"; // Import Sidebar component

const PatientList = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const [search, setSearch] = useState("");
  const [expandedPatient, setExpandedPatient] = useState(null);

  const recentPatients = [
    {
      id: 1,
      name: "John Doe",
      age: 35,
      lastVisit: "2025-01-20",
      notes: "Routine check-up, no issues.",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      lastVisit: "2025-02-05",
      notes: "Mild cold, prescribed medication.",
    },
    {
      id: 3,
      name: "Bob Johnson",
      age: 42,
      lastVisit: "2025-02-10",
      notes: "Hypertension under observation.",
    },
  ];

  const allPatients = [
    ...recentPatients,
    {
      id: 4,
      name: "Emily Brown",
      age: 30,
      lastVisit: "2025-01-18",
      notes: "Post-surgery follow-up, recovering well.",
    },
    {
      id: 5,
      name: "Michael Lee",
      age: 50,
      lastVisit: "2025-02-01",
      notes: "Annual health check, good condition.",
    },
  ];

  const filteredPatients = (
    activeTab === "recent" ? recentPatients : allPatients
  ).filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow">
        <Sidebar /> {/* Add Sidebar here */}
        <div className="flex-grow bg-blue-50 p-6">
          <h1
            className="text-4xl font-bold mb-8 text-[#0D2853] text-center drop-shadow-lg"
          >
            Welcome back, Dr. Smith!
          </h1>
          {/* Tabs */}
          <div className="flex justify-center gap-6 mb-8">
            {["recent", "all"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-lg font-semibold rounded-full transition 
                ${
                  activeTab === tab
                    ? "bg-[#7D5FFF] text-white shadow-lg"
                    : "bg-white/30 text-[#0D2853] hover:bg-white/40"
                }`}
              >
                {tab === "recent" ? "Recent Patients" : "All Patients"}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mb-8 w-full flex justify-center">
            <input
              type="text"
              placeholder="🔍 Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-2/3 sm:w-1/2 px-4 py-2 text-lg bg-white/40 backdrop-blur-lg border border-black rounded-full focus:ring-4 focus:ring-[#7D5FFF] outline-none transition"
            />
          </div>

          {/* Patient List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                onClick={() =>
                  setExpandedPatient(
                    expandedPatient === patient.id ? null : patient.id
                  )
                }
                className="relative bg-white/20 backdrop-blur-lg shadow-lg border border-white/40 
                  rounded-xl p-6 transition-transform hover:scale-105 hover:bg-white/30 cursor-pointer overflow-hidden"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent hover:border-[#7D5FFF] transition"></div>

                <h3 className="text-xl font-bold text-[#0D2853] mb-2">
                  {patient.name}
                </h3>
                <p className="text-gray-700 mb-2">Age: {patient.age}</p>
                <p className="text-gray-700 mb-4">Last Visit: {patient.lastVisit}</p>

                {/* Expanded Notes */}
                {expandedPatient === patient.id && (
                  <div className="mt-3 p-3 bg-white/30 rounded-lg shadow-inner text-gray-800">
                    <p className="text-sm">{patient.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PatientList;
