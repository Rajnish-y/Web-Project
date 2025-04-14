import React, { useState, useEffect } from "react";
import FFooter from "./FFooter";
import FHeader from "./FHeader";

const AppointmentBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    date: "",
    time: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([
    "10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"
  ]);

  // Fetch doctors and appointments data from JSON files
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorResponse, appointmentResponse] = await Promise.all([
          fetch("/doctors.json"),
          fetch("/appointments.json")
        ]);

        if (!doctorResponse.ok) throw new Error("Error fetching doctors");
        if (!appointmentResponse.ok) throw new Error("Error fetching appointments");

        const doctorData = await doctorResponse.json();
        const appointmentData = await appointmentResponse.json();

        setDoctors(doctorData);
        setAppointments(appointmentData.appointments);
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the time selected is available
    const isTimeAvailable = !appointments.some(
      (appointment) => appointment.time === formData.time && appointment.date === formData.date
    );

    if (!isTimeAvailable) {
      alert("The selected time is already booked. Please choose another time.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3500/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Appointment booked successfully!");
        setFormData({ name: "", email: "", phone: "", doctor: "", date: "", time: "" });
      } else {
        throw new Error("Failed to book appointment");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error booking appointment. Please try again.");
    }
  };

  // Filter available time slots based on appointments for the selected date
  useEffect(() => {
    const filterAvailableTimes = () => {
      const unavailableTimes = appointments
        .filter(appointment => appointment.date === formData.date)
        .map(appointment => appointment.time);

      const filteredTimes = availableTimes.filter(time => !unavailableTimes.includes(time));
      setAvailableTimes(filteredTimes);
    };

    if (formData.date) {
      filterAvailableTimes();
    }
  }, [formData.date, appointments]);

  return (
    <>
      <FHeader />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-600 py-4 px-6">
            <h2 className="text-2xl font-bold text-white">Book an Appointment</h2>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">Select a Doctor</option>
                    {doctors.map((doc, index) => (
                      <option key={index} value={doc.name}>{doc.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">Select a Time</option>
                    {availableTimes.map((time, index) => (
                      <option key={index} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
      <FFooter />
    </>
  );
};

export default AppointmentBooking;