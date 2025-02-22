import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [loggedInDoctor, setLoggedInDoctor] = useState(null);
  const [totalPatients, setTotalPatients] = useState(0);
  const [appointmentsToday, setAppointmentsToday] = useState(0);
  const [pendingReports, setPendingReports] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetch("/doctors.json")
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data);

        // Retrieve the logged-in doctor's ID from localStorage
        const loggedInDoctorID = localStorage.getItem("doctorID"); // Use "doctorID" as the key

        // Find the logged-in doctor's data
        const loggedInDoctorData = data.find(
          (doctor) => doctor.doctorID === loggedInDoctorID
        );

        if (loggedInDoctorData) {
          setLoggedInDoctor(loggedInDoctorData);

          // Personalized calculations based on the logged-in doctor
          setTotalPatients(1000); // Sample data for total patients
          setAppointmentsToday(loggedInDoctorData.appointments || 10); // Use doctor's appointments if available
          setPendingReports(5); // Sample data for pending reports
          setTotalRevenue(loggedInDoctorData.appointmentCost * 10 || 12000); // Sample revenue calculation
        } else {
          console.error("Logged-in doctor not found in the data.");
        }
      })
      .catch((err) => console.error("Error loading doctors:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-blue-50">
          <div className="container mx-auto p-6">
            {/* Personalized Welcome Message */}
            <h1 className="text-4xl font-bold mb-4 text-[#0D2853] text-center drop-shadow-lg">
              Welcome back, {loggedInDoctor ? loggedInDoctor.name : "Doctor"}!
            </h1>
            <p className="text-center text-gray-700 text-lg">
              Here's an overview of your activities today.
            </p>

            {/* Display Logged-in Doctor's Details */}
            {loggedInDoctor && (
              <div className="mt-8 bg-white/20 backdrop-blur-lg shadow-lg border border-white/40 rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4">Your Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <p className="text-lg font-semibold">Name:</p>
                    <p className="text-lg text-gray-700">{loggedInDoctor.name}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Department:</p>
                    <p className="text-lg text-gray-700">{loggedInDoctor.department}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Qualification:</p>
                    <p className="text-lg text-gray-700">{loggedInDoctor.qualification}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Date of Birth:</p>
                    <p className="text-lg text-gray-700">{loggedInDoctor.dob}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Age:</p>
                    <p className="text-lg text-gray-700">{loggedInDoctor.age}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Blood Group:</p>
                    <p className="text-lg text-gray-700">{loggedInDoctor.bloodGroup}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Location:</p>
                    <p className="text-lg text-gray-700">
                      Latitude: {loggedInDoctor.location.latitude}, Longitude:{" "}
                      {loggedInDoctor.location.longitude}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Appointment Cost:</p>
                    <p className="text-lg text-gray-700">
                      ₹{loggedInDoctor.appointmentCost}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Contact:</p>
                    <p className="text-lg text-gray-700">{loggedInDoctor.contact}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Stat Cards with Personalized Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {[{
                title: "Total Patients",
                value: totalPatients.toLocaleString(),
                change: "+12%",
                color: "text-green-500",
              },
              {
                title: "Today's Appointments",
                value: appointmentsToday.toLocaleString(),
                change: "-5%",
                color: "text-red-500",
              },
              {
                title: "Pending Reports",
                value: pendingReports.toFixed(0),
                change: "+8%",
                color: "text-yellow-500",
              },
              {
                title: "Total Revenue",
                value: `₹${totalRevenue.toLocaleString()}`,
                change: "+15%",
                color: "text-green-500",
              }]
              .map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-lg shadow-lg border border-white/40 
                             rounded-xl p-6 transition-transform hover:scale-105 hover:bg-white/30"
                >
                  <h2 className="text-xl font-semibold mb-2">{stat.title}</h2>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>
                    {stat.change} from last month
                  </p>
                </div>
              ))}
            </div>

            {/* Additional Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-10">
              {[{
                title: "Upcoming Appointments",
                content: `You have ${appointmentsToday} upcoming appointments today.`,
              },
              {
                title: "Recent Activities",
                content: `You checked ${pendingReports} patient records today.`,
              },
              {
                title: "Notifications",
                content: "New lab reports are available for 2 patients.",
              },
              {
                title: "Doctor's Notes",
                content: "Reminder: Call Mr. Johnson for follow-up.",
              }]
              .map((tab, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-lg shadow-lg border border-white/40 
                             rounded-xl p-6 transition-transform hover:scale-105 hover:bg-white/30"
                >
                  <h2 className="text-xl font-semibold mb-2">{tab.title}</h2>
                  <p className="text-lg text-gray-700">{tab.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
