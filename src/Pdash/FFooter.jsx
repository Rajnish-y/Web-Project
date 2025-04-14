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

const FFooter = () => {
  const footerLinks = {
    solutions: [
      "AI-Powered Document Management",
      "Secure Cloud Storage",
      "Blockchain-Integrated Security",
      "Automated Workflows",
      "Smart OCR & Data Extraction",
      "Collaboration & Sharing",
    ],
    company: [
      "About Us",
      "Careers",
      "Customer Stories",
      "Contact",
      "Privacy Policy",
      "Press Kit",
    ],
    resources: [
      "Blog",
      "Whitepapers",
      "Knowledge Base",
      "Case Studies",
      "API Documentation",
      "Community Forum",
    ]
  };

  const socialLinks = [
    { icon: <FaFacebookF />, link: "https://facebook.com/dochive" },
    { icon: <FaLinkedinIn />, link: "https://linkedin.com/company/dochive" },
    { icon: <FaTwitter />, link: "https://twitter.com/dochive" },
    { icon: <FaInstagram />, link: "https://instagram.com/dochive" },
    { icon: <FaYoutube />, link: "https://youtube.com/dochive" },
  ];

  return (
    <footer className="bg-gradient-to-r from-[#0F172A] to-[#112240] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-green-400 text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaPhoneAlt className="text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">+91-89005-60169</p>
                  <p className="font-medium">+91-73001-53188</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaEnvelope className="text-green-400 mt-1 flex-shrink-0" />
                <p className="font-medium">support@dochive.com</p>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-green-400 mt-1 flex-shrink-0" />
                <p className="font-medium">Bangalore, India</p>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-green-400 text-xl font-bold mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-3">
                {items.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 group"
                    >
                      <FaChevronRight className="text-green-400 text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} DocHive. All rights reserved.
          </div>

          {/* Social Icons */}
          <div className="flex space-x-5">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-lg bg-gray-800 hover:bg-gray-700 p-2 rounded-full w-10 h-10 flex items-center justify-center"
                aria-label={`${social.link.split('.com/')[1]} social link`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors duration-200 z-50"
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </footer>
  );
};

export default FFooter;