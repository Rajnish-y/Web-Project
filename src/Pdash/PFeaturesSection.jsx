import React from "react";
import { MessageSquare, Users, Calendar, Shield, Heart } from "lucide-react";

const PFeaturesSection = () => {
  const features = [
    {
      title: "Trusted Doctors",
      icon: <MessageSquare className="h-8 w-8" />,
      desc: "Get instant health guidance by trusted doctors.",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Find Nearby Doctors",
      icon: <Users className="h-8 w-8" />,
      desc: "Connect with qualified healthcare professionals in your area.",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Easy Appointments",
      icon: <Calendar className="h-8 w-8" />,
      desc: "Book and manage appointments with just a few clicks.",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Secure Records",
      icon: <Shield className="h-8 w-8" />,
      desc: "Your health data is protected with military-grade encryption.",
      color: "from-amber-500 to-amber-600"
    },
    {
      title: "Health Monitoring",
      icon: <Heart className="h-8 w-8" />,
      desc: "Track your vitals in real-time with IoT integration.",
      color: "from-pink-500 to-pink-600"
    },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Advanced Healthcare Features
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover how our platform transforms your healthcare experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-8 bg-gray-800 rounded-xl shadow-lg"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} rounded-t-xl`}></div>

              <div className="flex flex-col h-full">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} bg-opacity-20 w-fit mb-6`}>
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-300">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
          <div className="relative p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-gray-700">
            <div className="flex flex-col h-full justify-center">
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 bg-opacity-20 w-fit mb-6">
                <Heart className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Comprehensive Healthcare
              </h3>
              <p className="text-gray-300">
                Our platform offers a complete suite of tools for all your medical needs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PFeaturesSection;