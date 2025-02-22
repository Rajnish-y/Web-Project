import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const FFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0F172A] to-[#112240] text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-green-400 text-lg font-semibold">Contact Us</h3>
          <p className="flex items-center space-x-3">
            <span>📞</span> <span>+91-89005-60169</span>
          </p>
          <p className="flex items-center space-x-3">
            <span>📞</span> <span>+91-73001-53188</span>
          </p>
          <p className="flex items-center space-x-3">
            <span>✉️</span> <span>support@dochive.com</span>
          </p>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="text-green-400 text-lg font-semibold mb-4">
            Solutions
          </h3>
          <ul className="space-y-2 text-gray-300">
            {[
              "AI-Powered Document Management",
              "Secure Cloud Storage",
              "Blockchain-Integrated Security",
              "Automated Workflows",
              "Smart OCR & Data Extraction",
              "Collaboration & Sharing",
            ].map((item, index) => (
              <li
                key={index}
                className="hover:text-white transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-green-400 text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-300">
            {[
              "About Us",
              "Careers",
              "Customer Stories",
              "Contact",
              "Privacy Policy",
              "Press Kit",
            ].map((item, index) => (
              <li
                key={index}
                className="hover:text-white transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-green-400 text-lg font-semibold mb-4">
            Resources
          </h3>
          <ul className="space-y-2 text-gray-300">
            {[
              "Blog",
              "Whitepapers",
              "Knowledge Base",
              "Case Studies",
              "API Documentation",
              "Community Forum",
            ].map((item, index) => (
              <li
                key={index}
                className="hover:text-white transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center space-x-6 mt-8">
        {[
          { icon: <FaFacebookF />, link: "https://facebook.com/dochive" },
          {
            icon: <FaLinkedinIn />,
            link: "https://linkedin.com/company/dochive",
          },
          { icon: <FaTwitter />, link: "https://twitter.com/dochive" },
          { icon: <FaInstagram />, link: "https://instagram.com/dochive" },
          { icon: <FaYoutube />, link: "https://youtube.com/dochive" },
        ].map((social, index) => (
          <a
            key={index}
            href={social.link}
            className="text-gray-400 hover:text-white transition text-2xl"
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-col md:flex-row justify-center items-center text-gray-400 text-sm border-t border-gray-600 mt-8 pt-4 px-6">
        &copy; {new Date().getFullYear()} DocHive. All rights reserved.
      </div>
    </footer>
  );
};

export default FFooter;
