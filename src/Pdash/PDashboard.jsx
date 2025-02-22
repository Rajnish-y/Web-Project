import React from "react";
import { Activity, Calendar, Users, Shield, Heart, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Timeline } from "../ui/timeline";
import FHeader from "./FHeader";
import FFooter from "./FFooter";

// Header Component
const Header = () => (
  <header className="fixed top-0 w-full bg-gray-900 border-b border-gray-800 z-50">
    <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Activity className="h-8 w-8 text-blue-400" />
        <span className="text-xl font-bold text-white">DOC HIVE</span>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a>
        <a href="/doctors" className="text-gray-300 hover:text-blue-400 transition-colors">Find Doctors</a>
        <a href="/ai" className="text-gray-300 hover:text-blue-400 transition-colors">Chatbot</a>
        <a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</a>
      </div>
    </nav>
  </header>
);

// Hero Section
const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <Activity className="h-16 w-16 text-blue-400 mb-6 mx-auto" />
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Your AI-Powered Virtual Nurse <br />at Your Fingertips!
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
          Experience healthcare reimagined with our intelligent virtual nursing assistant.
          Get instant medical guidance and connect with healthcare professionals.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={() => navigate("/appointment")} 
            className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Start Chatting
          </button>
          <button onClick = {()=>navigate("/map")} className="bg-gray-800 text-blue-400 px-8 py-4 rounded-lg border-2 border-blue-400 hover:bg-gray-700 transition-colors">
            Find a Doctor
          </button>
        </div>
      </div>
    </section>
  );
};

// Features Section
const features = [
  { title: "AI Symptom Checker", content: "Get instant health guidance powered by advanced AI.", icon: <MessageSquare className="h-10 w-10 text-blue-400" /> },
  { title: "Find Nearby Doctors", content: "Connect with qualified healthcare professionals in your area.", icon: <Users className="h-10 w-10 text-blue-400" /> },
  { title: "Easy Appointments", content: "Book and manage appointments with just a few clicks.", icon: <Calendar className="h-10 w-10 text-blue-400" /> },
  { title: "Secure Records", content: "Your health data is protected with military-grade encryption.", icon: <Shield className="h-10 w-10 text-blue-400" /> },
  { title: "Health Monitoring", content: "Track your vitals in real-time with IoT integration.", icon: <Heart className="h-10 w-10 text-blue-400" /> },
];

const FeaturesSection = () => (
  <section className="py-20 bg-gray-900">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-white mb-12">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-lg text-gray-300">{feature.content}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Main Dashboard Component
const PDashboard = () => (
  <>
    <Header />
    <HeroSection />
    <Timeline data={features} />
    <FeaturesSection />
    <FFooter />
  </>
);

export default PDashboard;