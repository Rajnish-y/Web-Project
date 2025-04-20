import React, { useState, useEffect } from "react";
import FFooter from "./FFooter";
import FHeader from "./FHeader";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, query, where, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8ayp5FwqtWhLlfIGdh7WGUjiPnZsLQpI",
  authDomain: "doc-hive.firebaseapp.com",
  projectId: "doc-hive",
  storageBucket: "doc-hive.firebasestorage.app",
  messagingSenderId: "830048191692",
  appId: "1:830048191692:web:6469bdcd119b7b49f9ae69"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
    "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ]);
  const [filteredTimes, setFilteredTimes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsQuery = collection(db, "doctors");
        const doctorsSnapshot = await getDocs(doctorsQuery);
        const doctorsList = doctorsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDoctors(doctorsList);

        const appointmentsQuery = collection(db, "appointments");
        const unsubscribe = onSnapshot(appointmentsQuery, (querySnapshot) => {
          const appointmentsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setAppointments(appointmentsList);
        });

        setLoading(false);
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (submitSuccess) setSubmitSuccess(false);
    if (submitError) setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const isTimeAvailable = !appointments.some(
        appointment =>
          appointment.date === formData.date &&
          appointment.time === formData.time &&
          appointment.doctor === formData.doctor
      );

      if (!isTimeAvailable) {
        setSubmitError("The selected time is already booked. Please choose another time.");
        setIsSubmitting(false);
        return;
      }

      await addDoc(collection(db, "appointments"), {
        patient: formData.name,
        email: formData.email,
        phone: formData.phone,
        doctor: formData.doctor,
        date: formData.date,
        time: formData.time,
        status: "Pending",
        createdAt: new Date()
      });

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", doctor: "", date: "", time: "" });
      setIsSubmitting(false);

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error booking appointment:", error);
      setSubmitError("Error booking appointment. Please try again.");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const filterAvailableTimes = () => {
      if (!formData.date || !formData.doctor) {
        setFilteredTimes(availableTimes);
        return;
      }

      const unavailableTimes = appointments
        .filter(appointment =>
          appointment.date === formData.date &&
          appointment.doctor === formData.doctor
        )
        .map(appointment => appointment.time);

      const filteredAvailableTimes = availableTimes.filter(
        time => !unavailableTimes.includes(time)
      );

      setFilteredTimes(filteredAvailableTimes);
    };

    filterAvailableTimes();
  }, [formData.date, formData.doctor, appointments, availableTimes]);

  if (loading) {
    return (
      <>
        <FHeader />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading appointment system...</p>
          </div>
        </div>
        <FFooter />
      </>
    );
  }

  return (
    <>
      <FHeader />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-600 py-4 px-6">
            <h2 className="text-2xl font-bold text-white">Book an Appointment</h2>
          </div>

          <div className="p-6">
            {submitSuccess && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> Your appointment request has been submitted successfully.</span>
              </div>
            )}

            {submitError && (
              <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {submitError}</span>
              </div>
            )}

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
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.name}>{doc.name} - {doc.specialty}</option>
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
                    min={new Date().toISOString().split('T')[0]}
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
                    disabled={!formData.date || !formData.doctor}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    <option value="">Select a Time</option>
                    {filteredTimes.length > 0 ? (
                      filteredTimes.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                      ))
                    ) : (
                      <option value="" disabled>No available times for selected date</option>
                    )}
                  </select>
                  {formData.date && formData.doctor && filteredTimes.length === 0 && (
                    <p className="mt-1 text-sm text-red-500">No available slots for this date. Please select another date.</p>
                  )}
                  {(!formData.date || !formData.doctor) && (
                    <p className="mt-1 text-sm text-gray-500">Please select both doctor and date to see available times</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || filteredTimes.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Book Appointment"
                )}
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