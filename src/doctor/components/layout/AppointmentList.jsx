import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "Sarah Johnson",
      time: "09:00 AM",
      type: "Check-up",
      status: "Confirmed",
    },
    {
      id: 2,
      patient: "Mike Peters",
      time: "10:30 AM",
      type: "Follow-up",
      status: "Confirmed",
    },
    {
      id: 3,
      patient: "Emma Wilson",
      time: "02:00 PM",
      type: "Consultation",
      status: "Confirmed",
    },
  ]);

  const [appointmentRequests, setAppointmentRequests] = useState([
    { id: 4, patient: "John Doe", time: "11:00 AM", type: "Check-up", status: "Pending" },
    { id: 5, patient: "Alice Brown", time: "01:30 PM", type: "Consultation", status: "Pending" },
  ]);

  // Handle accepting an appointment request
  const handleAccept = (id) => {
    const acceptedRequest = appointmentRequests.find((req) => req.id === id);
    setAppointments([
      ...appointments,
      { ...acceptedRequest, status: "Confirmed" },
    ]);
    setAppointmentRequests(appointmentRequests.filter((req) => req.id !== id));
  };

  // Handle rejecting an appointment request
  const handleReject = (id) => {
    setAppointmentRequests(appointmentRequests.filter((req) => req.id !== id));
  };

  // Handle adding a new appointment request
  const handleAddRequest = (patient, time, type) => {
    const newRequest = {
      id: appointmentRequests.length + 1, // Auto-increment ID
      patient,
      time,
      type,
      status: "Pending",
    };
    setAppointmentRequests([...appointmentRequests, newRequest]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-blue-50">
          <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-4 text-[#0D2853] text-center drop-shadow-lg">
              Today's Appointments
            </h1>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {[{
                  title: "Confirmed Appointments",
                  value: appointments.length,
                  color: "text-green-500",
                },
                {
                  title: "Pending Requests",
                  value: appointmentRequests.length,
                  color: "text-yellow-500",
                },
                {
                  title: "Cancelled Appointments",
                  value: "1",
                  color: "text-red-500",
                },
                {
                  title: "Completed Appointments",
                  value: "10",
                  color: "text-blue-500",
                }
              ].map((stat, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-lg shadow-lg border border-white/40 rounded-xl p-6 transition-transform hover:scale-105 hover:bg-white/30">
                  <h2 className="text-xl font-semibold mb-2">{stat.title}</h2>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Confirmed Appointments Table */}
            <div className="mt-10 bg-white/20 backdrop-blur-lg shadow-lg border border-white/40 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-[#0D2853] drop-shadow-lg">
                Appointment Details
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-white/30 backdrop-blur-md">
                    <tr>
                      {["Patient Name", "Time", "Type", "Status"].map((heading, index) => (
                        <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {appointments.map((appointment) => (
                      <tr key={appointment.id} className="hover:bg-white/30 transition">
                        <td className="px-6 py-4 whitespace-nowrap">{appointment.patient}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{appointment.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-900">
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Appointment Requests Section */}
            <div className="mt-10 bg-white/20 backdrop-blur-lg shadow-lg border border-white/40 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-[#0D2853] drop-shadow-lg">
                Appointment Requests
              </h2>

              {/* Add Request Button */}
              <button
                onClick={() => handleAddRequest("James Lee", "03:30 PM", "Consultation")}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition opacity-0"
              >
                + Add Appointment Request
              </button>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-white/30 backdrop-blur-md">
                    <tr>
                      {["Patient Name", "Time", "Type", "Actions"].map((heading, index) => (
                        <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {appointmentRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-white/30 transition">
                        <td className="px-6 py-4 whitespace-nowrap">{request.patient}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{request.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{request.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap flex justify-center space-x-4">
                          <button
                            onClick={() => handleAccept(request.id)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
                          >
                            ✔ Accept
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
                          >
                            ✖ Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentList;
