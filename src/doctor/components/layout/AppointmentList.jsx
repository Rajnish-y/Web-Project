import React, { useState } from "react";
import { Calendar, Clock, User, CheckCircle, AlertCircle, XCircle, Plus, ChevronDown, Frown, Smile } from "lucide-react";
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
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      patient: "Mike Peters",
      time: "10:30 AM",
      type: "Follow-up",
      status: "Confirmed",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      patient: "Emma Wilson",
      time: "02:00 PM",
      type: "Consultation",
      status: "Confirmed",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
  ]);

  const [appointmentRequests, setAppointmentRequests] = useState([
    {
      id: 4,
      patient: "John Doe",
      time: "11:00 AM",
      type: "Check-up",
      status: "Pending",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
      id: 5,
      patient: "Alice Brown",
      time: "01:30 PM",
      type: "Consultation",
      status: "Pending",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    },
  ]);

  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    time: "",
    type: "Check-up"
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAccept = (id) => {
    const acceptedRequest = appointmentRequests.find(req => req.id === id);
    setAppointments([...appointments, { ...acceptedRequest, status: "Confirmed" }]);
    setAppointmentRequests(appointmentRequests.filter(req => req.id !== id));
  };

  const handleReject = (id) => {
    setAppointmentRequests(appointmentRequests.filter(req => req.id !== id));
  };

  const handleAddRequest = (e) => {
    e.preventDefault();
    if (!newAppointment.patient || !newAppointment.time) return;

    const newRequest = {
      id: Math.max(...appointmentRequests.map(r => r.id), 0) + 1,
      patient: newAppointment.patient,
      time: newAppointment.time,
      type: newAppointment.type,
      status: "Pending",
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
    };

    setAppointmentRequests([...appointmentRequests, newRequest]);
    setNewAppointment({ patient: "", time: "", type: "Check-up" });
    setShowAddForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
                <p className="text-gray-600 mt-2">Manage your daily appointments and requests</p>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Appointment
                </button>
              </div>
            </div>

            {/* Add Appointment Form */}
            {showAddForm && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Add New Appointment</h2>
                <form onSubmit={handleAddRequest}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                      <input
                        type="text"
                        name="patient"
                        value={newAppointment.patient}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter patient name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <input
                        type="time"
                        name="time"
                        value={newAppointment.time}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select
                        name="type"
                        value={newAppointment.type}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Check-up">Check-up</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Consultation">Consultation</option>
                        <option value="Emergency">Emergency</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Add Appointment
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Confirmed</p>
                    <p className="text-2xl font-semibold text-gray-800">{appointments.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pending</p>
                    <p className="text-2xl font-semibold text-gray-800">{appointmentRequests.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                    <XCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Cancelled</p>
                    <p className="text-2xl font-semibold text-gray-800">1</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Completed</p>
                    <p className="text-2xl font-semibold text-gray-800">10</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmed Appointments */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Confirmed Appointments
                </h2>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  Today, {new Date().toLocaleDateString()}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map(appointment => (
                      <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img className="h-10 w-10 rounded-full mr-3" src={appointment.avatar} alt={appointment.patient} />
                            <div>
                              <div className="font-medium text-gray-900">{appointment.patient}</div>
                              <div className="text-sm text-gray-500">Patient ID: {appointment.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-gray-900">{appointment.time}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{appointment.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Appointment Requests */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  Appointment Requests
                </h2>
              </div>
              {appointmentRequests.length === 0 ? (
                <div className="p-8 text-center">
                  <Frown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No pending requests</h3>
                  <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {appointmentRequests.map(request => (
                        <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img className="h-10 w-10 rounded-full mr-3" src={request.avatar} alt={request.patient} />
                              <div>
                                <div className="font-medium text-gray-900">{request.patient}</div>
                                <div className="text-sm text-gray-500">Patient ID: {request.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-gray-900">{request.time}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">{request.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleAccept(request.id)}
                                className="px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200 flex items-center"
                              >
                                <Smile className="h-4 w-4 mr-1" />
                                Accept
                              </button>
                              <button
                                onClick={() => handleReject(request.id)}
                                className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 flex items-center"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default AppointmentList;