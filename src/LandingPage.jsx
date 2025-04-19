import React, { useState, useEffect } from "react";
import DAuthPage from "./doctor/components/authentication/DAuthPage";
import PAuthPage from "./patient/components/authentication/PAuthPage";
import PatientPage from "./patient/components/authentication/PatientPage";
import DoctorPage from "./doctor/components/authentication/DoctorPage";
import { Activity, Calendar, Users, Shield, Heart, MessageSquare, ArrowLeft, ChevronDown } from "lucide-react";

const LandingPage = () => {
  const [userType, setUserType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showFeatures) {
      const interval = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % 3);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showFeatures]);

  const handleUserTypeSelection = (type) => {
    setUserType(type);
  };

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  const handleBack = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
    } else {
      setUserType(null);
    }
  };

  if (userType === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
        <nav className={`flex items-center justify-between mb-20 sticky top-0 z-50 transition-all duration-300 ${scrollPosition > 50 ? "py-4 backdrop-blur-md bg-white/80 shadow-md rounded-xl px-6" : "py-6"}`}>
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-blue-600 animate-pulse" />
            <span className="text-xl font-bold text-blue-900">DOC HIVE</span>
          </div>
          <div className="flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-all flex items-center group">
              Features
              <ChevronDown className="h-4 w-4 ml-1 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-all">Testimonials</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-all">Contact</a>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => handleUserTypeSelection("patient")}
              className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all"
            >
              Patient Login
            </button>
            <button
              onClick={() => handleUserTypeSelection("doctor")}
              className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all"
            >
              Doctor Login
            </button>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-28">
            <div className="md:w-1/2 space-y-8 animate-fade-in">
              <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Connect.</span> Heal. Thrive
              </h1>
              <p className="text-xl text-gray-600">
                Your health journey starts here. With Doc Hive, connect with healthcare professionals and manage your medical care seamlessly.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => handleUserTypeSelection("patient")}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg flex items-center justify-center"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  I'm a Patient
                </button>
                <button
                  onClick={() => handleUserTypeSelection("doctor")}
                  className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all hover:shadow-lg flex items-center justify-center"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  I'm a Doctor
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Doctor consultation"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white text-lg">"Doc Hive transformed how I manage my practice"</p>
                  <p className="text-blue-300">- Dr. Sarah Johnson</p>
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-lg z-10 hidden md:block">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-3">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">5000+</p>
                    <p className="text-sm text-gray-500">Appointments daily</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="features" className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Doc Hive?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Healthcare solutions designed for both patients and providers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: <Calendar className="h-8 w-8" />, title: "24/7 Access", description: "Connect with healthcare professionals anytime, anywhere" },
                { icon: <Shield className="h-8 w-8" />, title: "Military-grade Security", description: "End-to-end encryption for all your medical data" },
                { icon: <MessageSquare className="h-8 w-8" />, title: "Seamless Communication", description: "Secure messaging and video consultations" }
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${activeFeature === index ? "border-b-4 border-blue-500" : ""}`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowFeatures(!showFeatures)}
                className="px-6 py-3 bg-transparent border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all flex items-center mx-auto"
              >
                {showFeatures ? "Hide" : "Show"} All Features
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFeatures ? "rotate-180" : ""}`} />
              </button>
            </div>

            {showFeatures && (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {[
                  { title: "Electronic Health Records", description: "Centralized access to your complete medical history" },
                  { title: "Prescription Management", description: "Digital prescriptions sent directly to your pharmacy" },
                  { title: "Appointment Scheduling", description: "Book, reschedule or cancel appointments with ease" },
                  { title: "Health Analytics", description: "Track your health metrics over time" },
                  { title: "Multi-language Support", description: "Communicate in your preferred language" },
                  { title: "Insurance Integration", description: "Seamless billing with your insurance provider" }
                ].map((feature, index) => (
                  <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div id="testimonials" className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl px-8 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Trusted by thousands of patients and healthcare providers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Michael T.", role: "Patient", quote: "Doc Hive made finding a specialist so easy. I got an appointment the same day!" },
                { name: "Dr. Priya K.", role: "Cardiologist", quote: "My practice efficiency improved by 40% after switching to Doc Hive." },
                { name: "Lisa M.", role: "Patient", quote: "The telemedicine feature saved me hours of travel time to the clinic." }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer id="contact" className="py-12 bg-gray-900 text-white rounded-t-3xl">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Activity className="h-6 w-6 text-blue-400" />
                  <span className="text-xl font-bold">DOC HIVE</span>
                </div>
                <p className="text-gray-400">Revolutionizing healthcare connections since 2025</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">For Patients</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Find a Doctor</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Book Appointment</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Health Records</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">For Doctors</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Join Our Network</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Practice Management</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Resources</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
              <p>© 2025 Doc Hive. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
        <button
          onClick={handleBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>
        {userType === "patient" ? (
          <PAuthPage onAuth={handleAuthentication} />
        ) : (
          <DAuthPage onAuth={handleAuthentication} />
        )}
      </div>
    );
  }

  return userType === "patient" ? <PatientPage /> : <DoctorPage />;
};

export default LandingPage;