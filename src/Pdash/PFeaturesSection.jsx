import React from "react";
import { MessageSquare, Users, Calendar, Shield, Heart } from "lucide-react";

const features = [
  {
    title: "AI Symptom Checker",
    icon: <MessageSquare className="h-10 w-10 text-blue-400" />,
    desc: "Get instant health guidance powered by advanced AI.",
  },
  {
    title: "Find Nearby Doctors",
    icon: <Users className="h-10 w-10 text-blue-400" />,
    desc: "Connect with qualified healthcare professionals in your area.",
  },
  {
    title: "Easy Appointments",
    icon: <Calendar className="h-10 w-10 text-blue-400" />,
    desc: "Book and manage appointments with just a few clicks.",
  },
  {
    title: "Secure Records",
    icon: <Shield className="h-10 w-10 text-blue-400" />,
    desc: "Your health data is protected with military-grade encryption.",
  },
  {
    title: "Health Monitoring",
    icon: <Heart className="h-10 w-10 text-blue-400" />,
    desc: "Track your vitals in real-time with IoT integration.",
  },
];

const PFeaturesSection = () => (
  <section className="py-20 bg-gray-900">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-white text-center mb-12">
        Our Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-lg text-blue-300">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PFeaturesSection;
