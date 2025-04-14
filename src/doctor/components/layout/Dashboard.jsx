import React, { useEffect, useState } from "react";
import { Activity, User, Calendar, FileText, DollarSign, Bell, Clipboard, Stethoscope, Clock, TrendingUp, TrendingDown } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [loggedInDoctor, setLoggedInDoctor] = useState(null);
  const [stats, setStats] = useState({
    totalPatients: 0,
    appointmentsToday: 0,
    pendingReports: 0,
    totalRevenue: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/doctors.json");
        const data = await response.json();
        setDoctors(data);

        const loggedInDoctorID = localStorage.getItem("doctorID");
        const doctorData = data.find(doctor => doctor.doctorID === loggedInDoctorID);

        if (doctorData) {
          setLoggedInDoctor(doctorData);
          setStats({
            totalPatients: 1000 + Math.floor(Math.random() * 500),
            appointmentsToday: doctorData.appointments || 10 + Math.floor(Math.random() * 5),
            pendingReports: 5 + Math.floor(Math.random() * 3),
            totalRevenue: (doctorData.appointmentCost || 1200) * (10 + Math.floor(Math.random() * 5))
          });
        }
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-lg ${color.replace('text', 'bg') + ' bg-opacity-10'}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <h3 className="ml-3 text-lg font-medium text-gray-600">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-gray-800 mb-2">{value}</p>
      <div className="flex items-center text-sm">
        {change > 0 ? (
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
        )}
        <span className={`${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {Math.abs(change)}% {change > 0 ? 'increase' : 'decrease'} from last month
        </span>
      </div>
    </div>
  );

  const InfoCard = ({ icon: Icon, title, content, color }) => (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-lg ${color + ' bg-opacity-10'}`}>
          <Icon className={`h-6 w-6 ${color.replace('bg', 'text')}`} />
        </div>
        <h3 className="ml-3 text-lg font-medium text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{content}</p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <section className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Welcome back, <span className="text-blue-600">{loggedInDoctor?.name || "Doctor"}</span>!
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your practice today.
              </p>
            </section>

            {/* Stats Overview */}
            <section className="mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon={User}
                  title="Total Patients"
                  value={stats.totalPatients.toLocaleString()}
                  change={12}
                  color="text-blue-500"
                />
                <StatCard
                  icon={Calendar}
                  title="Today's Appointments"
                  value={stats.appointmentsToday}
                  change={-5}
                  color="text-purple-500"
                />
                <StatCard
                  icon={FileText}
                  title="Pending Reports"
                  value={stats.pendingReports}
                  change={8}
                  color="text-yellow-500"
                />
                <StatCard
                  icon={DollarSign}
                  title="Total Revenue"
                  value={`₹${stats.totalRevenue.toLocaleString()}`}
                  change={15}
                  color="text-green-500"
                />
              </div>
            </section>

            {/* Doctor Profile Section */}
            {loggedInDoctor && (
              <section className="mb-10 bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <Stethoscope className="h-5 w-5 text-blue-500 mr-2" />
                    Your Profile Details
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Full Name</p>
                    <p className="text-lg text-gray-800">{loggedInDoctor.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Department</p>
                    <p className="text-lg text-gray-800">{loggedInDoctor.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Qualification</p>
                    <p className="text-lg text-gray-800">{loggedInDoctor.qualification}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                    <p className="text-lg text-gray-800">{loggedInDoctor.dob}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Age</p>
                    <p className="text-lg text-gray-800">{loggedInDoctor.age}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Blood Group</p>
                    <p className="text-lg text-gray-800">{loggedInDoctor.bloodGroup}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="text-lg text-gray-800">
                      {loggedInDoctor.location?.latitude}, {loggedInDoctor.location?.longitude}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Appointment Cost</p>
                    <p className="text-lg text-gray-800">
                      ₹{loggedInDoctor.appointmentCost}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Contact</p>
                    <p className="text-lg text-gray-800">{loggedInDoctor.contact}</p>
                  </div>
                </div>
              </section>
            )}

            {/* Quick Info Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard
                icon={Clock}
                title="Upcoming Appointments"
                content={`You have ${stats.appointmentsToday} appointments scheduled for today.`}
                color="bg-blue-100"
              />
              <InfoCard
                icon={Clipboard}
                title="Recent Activities"
                content={`You've reviewed ${Math.floor(stats.pendingReports / 2)} patient records today.`}
                color="bg-purple-100"
              />
              <InfoCard
                icon={Bell}
                title="Notifications"
                content="New lab reports are available for 2 patients. 1 prescription needs approval."
                color="bg-yellow-100"
              />
              <InfoCard
                icon={Activity}
                title="Practice Insights"
                content={`Your patient satisfaction score is 94% this month (up 3%).`}
                color="bg-green-100"
              />
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;