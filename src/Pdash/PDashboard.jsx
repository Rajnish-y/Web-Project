import React, { useState } from "react";
import { Activity, ChevronRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Timeline } from "../ui/timeline";
import FHeader from "./FHeader";
import FFooter from "./FFooter";
import PFeaturesSection from "./PFeaturesSection";

const HeroSection = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <section className="pt-32 pb-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400 filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-500 filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
        <div
          className={`mb-8 transition-all duration-500 ${hovered ? 'scale-110' : 'scale-100'}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Activity className="h-16 w-16 text-blue-400 mx-auto" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Healthcare Solutions
          </span> <br />
          At Your Fingertips
        </h1>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
          Discover a new era of healthcare with our intuitive platform.
          Access instant medical guidance and connect seamlessly with healthcare professionals.
        </p>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => navigate("/appointment")}
            className="relative overflow-hidden bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 group"
          >
            <span className="relative z-10 flex items-center justify-center">
              Start Chatting <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>

          <button
            onClick={() => navigate("/map")}
            className="relative overflow-hidden bg-transparent text-blue-400 px-8 py-4 rounded-lg border-2 border-blue-400 hover:bg-blue-400/10 transition-all duration-300 group"
          >
            <span className="relative z-10 flex items-center justify-center">
              Find a Doctor <Plus className="ml-2 h-5 w-5 transition-transform group-hover:rotate-90" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    title: "AI Symptom Checker",
    content: "Get instant health guidance powered by advanced AI.",
    icon: "MessageSquare",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Find Nearby Doctors",
    content: "Connect with qualified healthcare professionals in your area.",
    icon: "Users",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Easy Appointments",
    content: "Book and manage appointments with just a few clicks.",
    icon: "Calendar",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Secure Records",
    content: "Your health data is protected with military-grade encryption.",
    icon: "Shield",
    color: "from-amber-500 to-amber-600"
  },
  {
    title: "Health Monitoring",
    content: "Track your vitals in real-time with IoT integration.",
    icon: "Heart",
    color: "from-pink-500 to-pink-600"
  },
];

const StatsSection = () => {
  const stats = [
    { value: "10,000+", label: "Patients Helped" },
    { value: "500+", label: "Verified Doctors" },
    { value: "24/7", label: "Availability" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <div className="text-lg text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PDashboard = () => (
  <div className="bg-gray-900 min-h-screen">
    <FHeader />
    <HeroSection />
    <StatsSection />
    <Timeline data={features} />
    <PFeaturesSection features={features} />
    <FFooter />
  </div>
);

export default PDashboard;