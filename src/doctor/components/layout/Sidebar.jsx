import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendar,
  faUser,
  faCog,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div
      className="w-64 min-h-screen p-4 bg-white
        backdrop-blur-lg shadow-xl border-r border-white/40 text-gray-900 py-12"
    >
      <ul className="space-y-3">
        {[
          {
            to: "/dashboard",
            icon: faHome,
            text: "Dashboard",
            color: "text-indigo-900",
          },
          {
            to: "/appointments",
            icon: faCalendar,
            text: "Appointments",
            color: "text-blue-900",
          },
          {
            to: "/patients",
            icon: faUsers,
            text: "Patients",
            color: "text-purple-900",
          },
          {
            to: "/profile",
            icon: faUser,
            text: "Profile",
            color: "text-pink-900",
          },
        ].map((item, index) => (
          <li key={index}>
            <Link
              to={item.to}
              className="flex items-center py-3 px-4 rounded-lg transition
                         bg-white/20 hover:bg-white/40 backdrop-blur-md shadow-md"
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={`mr-3 ${item.color}`}
              />
              <span className="text-lg font-medium">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Contact Support Section */}
      <div className="mt-6 border-t border-white/40 pt-4">
        <Link
          to="/contact"
          className="flex items-center py-3 px-4 rounded-lg transition text-indigo-900
                     bg-white/20 hover:bg-white/40 backdrop-blur-md shadow-md"
        >
          Need help? Contact Support
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
