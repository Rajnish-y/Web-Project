import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, User, Calendar, Clipboard, Stethoscope, Plus } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const PatientList = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPatient, setExpandedPatient] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "lastVisit", direction: "desc" });

  const patientData = {
    recent: [
      {
        id: 1,
        name: "John Doe",
        age: 35,
        gender: "Male",
        lastVisit: "2025-01-20",
        nextAppointment: "2025-03-15",
        condition: "Hypertension",
        notes: "Routine check-up, blood pressure slightly elevated. Recommended lifestyle changes and follow-up in 2 months.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        id: 2,
        name: "Jane Smith",
        age: 28,
        gender: "Female",
        lastVisit: "2025-02-05",
        nextAppointment: "",
        condition: "Acute Rhinitis",
        notes: "Presented with cold symptoms. Prescribed antihistamines and rest. No complications expected.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        id: 3,
        name: "Bob Johnson",
        age: 42,
        gender: "Male",
        lastVisit: "2025-02-10",
        nextAppointment: "2025-02-24",
        condition: "Type 2 Diabetes",
        notes: "Blood sugar levels improving with current medication. Adjusted insulin dosage slightly.",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg"
      }
    ],
    all: [
      {
        id: 4,
        name: "Emily Brown",
        age: 30,
        gender: "Female",
        lastVisit: "2025-01-18",
        nextAppointment: "2025-04-10",
        condition: "Post-operative",
        notes: "Recovering well from appendectomy. Wound healing normally. Cleared for light activity.",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg"
      },
      {
        id: 5,
        name: "Michael Lee",
        age: 50,
        gender: "Male",
        lastVisit: "2025-02-01",
        nextAppointment: "2026-02-01",
        condition: "Annual Checkup",
        notes: "Excellent overall health. Cholesterol levels optimal. Recommended maintaining current exercise regimen.",
        avatar: "https://randomuser.me/api/portraits/men/86.jpg"
      }
    ]
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedPatients = [...patientData[activeTab]].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredPatients = sortedPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const formatDate = (dateString) => {
    if (!dateString) return "Not scheduled";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Patient Records
              </h1>
              <p className="text-gray-600">
                Manage your patient information and medical history
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm">
                {[
                  { id: "recent", label: "Recent Patients" },
                  { id: "all", label: "All Patients" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search patients or conditions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                  />
                </div>
                <button className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md">
                  <Plus className="h-5 w-5 mr-2" />
                  New Patient
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 border-b border-gray-200">
                <div className="col-span-4 font-medium text-gray-500">
                  <button
                    onClick={() => requestSort("name")}
                    className="flex items-center hover:text-gray-700"
                  >
                    Patient
                    {sortConfig.key === "name" && (
                      sortConfig.direction === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="col-span-2 font-medium text-gray-500">Condition</div>
                <div className="col-span-2 font-medium text-gray-500">
                  <button
                    onClick={() => requestSort("lastVisit")}
                    className="flex items-center hover:text-gray-700"
                  >
                    Last Visit
                    {sortConfig.key === "lastVisit" && (
                      sortConfig.direction === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="col-span-2 font-medium text-gray-500">Next Appointment</div>
                <div className="col-span-2 font-medium text-gray-500">Actions</div>
              </div>
              {filteredPatients.length > 0 ? (
                filteredPatients.map(patient => (
                  <div
                    key={patient.id}
                    className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${expandedPatient === patient.id ? "bg-blue-50" : ""
                      }`}
                  >
                    <div className="col-span-4 flex items-center">
                      <img
                        src={patient.avatar}
                        alt={patient.name}
                        className="h-10 w-10 rounded-full mr-3 border-2 border-white shadow-sm"
                      />
                      <div>
                        <div className="font-medium text-gray-800">{patient.name}</div>
                        <div className="text-sm text-gray-500">
                          {patient.age} years • {patient.gender}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {patient.condition}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center text-gray-700">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {formatDate(patient.lastVisit)}
                    </div>
                    <div className="col-span-2 flex items-center text-gray-700">
                      {patient.nextAppointment ? (
                        <>
                          <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                          {formatDate(patient.nextAppointment)}
                        </>
                      ) : (
                        <span className="text-gray-400">Not scheduled</span>
                      )}
                    </div>
                    <div className="col-span-2 flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setExpandedPatient(expandedPatient === patient.id ? null : patient.id)}
                        className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-200 transition-colors"
                        aria-label={expandedPatient === patient.id ? "Collapse details" : "Expand details"}
                      >
                        {expandedPatient === patient.id ? <ChevronUp /> : <ChevronDown />}
                      </button>
                      <button className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-200 transition-colors">
                        <Stethoscope className="h-5 w-5" />
                      </button>
                    </div>
                    {expandedPatient === patient.id && (
                      <div className="col-span-12 pt-3 pb-2">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <Clipboard className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-gray-800 mb-1">Clinical Notes</h4>
                              <p className="text-gray-600 text-sm">{patient.notes}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-6 py-12 text-center bg-white">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No patients found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm ? "Try adjusting your search" : "No patients in this category"}
                  </p>
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

export default PatientList;