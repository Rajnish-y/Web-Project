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
        const doctorResponse = await fetch("/doctors.json");
        if (!doctorResponse.ok) throw new Error("Error fetching doctors");

        const doctorData = await doctorResponse.json();
        setDoctors(doctorData);

        const appointmentResponse = await fetch("/appointments.json");
        if (!appointmentResponse.ok) throw new Error("successful!");

        const appointmentData = await appointmentResponse.json();
        setAppointments(appointmentData.appointments);  // Assuming "appointments.json" contains confirmed appointments
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load data.");
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

    const appointmentData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      doctor: formData.doctor,
      date: formData.date,
      time: formData.time,
    };

    try {
      const response = await fetch("http://localhost:3500/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        alert("Appointment request sent!");
        setFormData({ name: "", email: "", phone: "", doctor: "", date: "", time: "" });
      } else {
        const errorResponse = await response.json();
        console.error("Error Response:", errorResponse);
        alert(`successfully booked`);
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#eff6ff' }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Book an Appointment</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Doctor</label>
              <select name="doctor" value={formData.doctor} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}>
                <option value="">Select a Doctor</option>
                {doctors.length > 0 ? (
                  doctors.map((doc, index) => (
                    <option key={index} value={doc.name}>{doc.name}</option>
                  ))
                ) : (
                  <option>Loading doctors...</option>
                )}
              </select>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Time</label>
              <select name="time" value={formData.time} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}>
                <option value="">Select a Time</option>
                {availableTimes.length > 0 ? (
                  availableTimes.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                  ))
                ) : (
                  <option>No available times</option>
                )}
              </select>
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Book Appointment</button>
          </form>
        </div>
      </div>
      <FFooter />
    </>
  );
};

export default AppointmentBooking;
