import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronRight
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-green-400 flex items-center">
              <span className="w-1 h-6 bg-green-400 mr-2"></span>
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-green-400 mt-1 mr-3">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="font-medium">Phone Numbers</p>
                  <p className="text-gray-300">+91-89005-60169</p>
                  <p className="text-gray-300">+91-73001-53188</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-green-400 mt-1 mr-3">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-300">support@dochive.com</p>
                  <p className="text-gray-300">sales@dochive.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-green-400 mt-1 mr-3">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="font-medium">Headquarters</p>
                  <p className="text-gray-300">123 Tech Park, Bangalore</p>
                  <p className="text-gray-300">Karnataka, India - 560001</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-400 flex items-center mb-6">
              <span className="w-1 h-6 bg-green-400 mr-2"></span>
              Solutions
            </h3>
            <ul className="space-y-3">
              {[
                "AI-Powered Document Management",
                "Secure Cloud Storage",
                "Blockchain Security",
                "Automated Workflows",
                "Smart OCR Technology",
                "Collaboration Tools"
              ].map((item, index) => (
                <li key={index} className="group">
                  <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors">
                    <FaChevronRight className="text-xs text-green-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-400 flex items-center mb-6">
              <span className="w-1 h-6 bg-green-400 mr-2"></span>
              Company
            </h3>
            <ul className="space-y-3">
              {[
                "About Us",
                "Leadership Team",
                "Careers",
                "Newsroom",
                "Partnerships",
                "Contact Us"
              ].map((item, index) => (
                <li key={index} className="group">
                  <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors">
                    <FaChevronRight className="text-xs text-green-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-400 flex items-center mb-6">
              <span className="w-1 h-6 bg-green-400 mr-2"></span>
              Connect With Us
            </h3>
            <div className="flex space-x-4 mb-6">
              {[
                { icon: <FaFacebookF />, color: "hover:text-blue-500" },
                { icon: <FaLinkedinIn />, color: "hover:text-blue-400" },
                { icon: <FaTwitter />, color: "hover:text-blue-300" },
                { icon: <FaInstagram />, color: "hover:text-pink-500" },
                { icon: <FaYoutube />, color: "hover:text-red-500" }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`text-gray-400 text-2xl transition-colors ${social.color}`}
                  aria-label={`Social media link ${index}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="text-gray-300">
              <p className="mb-2">Follow us for updates and announcements</p>
              <p>Join our community of healthcare professionals</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} DocHive Technologies. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;