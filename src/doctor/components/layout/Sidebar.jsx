import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendar,
  faUser,
  faUsers,
  faQuestionCircle,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const navItems = [
    {
      to: "/dashboard",
      icon: faHome,
      text: "Dashboard",
      color: "text-indigo-600",
    },
    {
      to: "/appointments",
      icon: faCalendar,
      text: "Appointments",
      color: "text-blue-600",
      subItems: [
        { to: "/appointments/upcoming", text: "Upcoming" },
        { to: "/appointments/history", text: "History" },
      ],
    },
    {
      to: "/patients",
      icon: faUsers,
      text: "Patients",
      color: "text-purple-600",
      subItems: [
        { to: "/patients/list", text: "Patient List" },
        { to: "/patients/add", text: "Add New" },
      ],
    },
    {
      to: "/profile",
      icon: faUser,
      text: "Profile",
      color: "text-pink-600",
    }
  ];

  const toggleSubmenu = (itemText) => {
    setActiveSubmenu(activeSubmenu === itemText ? null : itemText);
  };

  return (
    <div
      className={`${expanded ? "w-64" : "w-20"} min-h-screen p-4 bg-white/90
      backdrop-blur-lg shadow-xl border-r border-white/40 transition-all duration-300 ease-in-out`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="absolute -right-3 top-6 bg-white rounded-full p-1 shadow-md border border-gray-200
                   hover:bg-gray-100 transition-colors duration-200 z-10"
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className={`text-gray-600 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      <div className="flex items-center justify-center mb-8 pt-4">
        {expanded ? (
          <h2 className="text-xl font-bold text-indigo-700">DocHive</h2>
        ) : (
          <div className="w-8 h-8 rounded-full bg-indigo-600"></div>
        )}
      </div>
      <ul className="space-y-2">
        {navItems.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              <Link
                to={item.to}
                className={`flex items-center py-3 px-4 rounded-lg transition
                  ${location.pathname.startsWith(item.to) ? "bg-indigo-100/80 text-indigo-700" : "hover:bg-gray-100/50"}
                  ${expanded ? "justify-start" : "justify-center"}`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`${item.color} ${expanded ? "mr-3" : ""}`}
                  size="lg"
                />
                {expanded && (
                  <span className="text-md font-medium">{item.text}</span>
                )}
                {expanded && item.subItems && (
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={`ml-auto text-xs transition-transform duration-200 ${activeSubmenu === item.text ? "rotate-90" : ""
                      }`}
                  />
                )}
              </Link>
            </li>
            {expanded && item.subItems && activeSubmenu === item.text && (
              <ul className="ml-8 space-y-1">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      to={subItem.to}
                      className={`flex items-center py-2 px-4 rounded-lg text-sm transition
                        ${location.pathname === subItem.to ? "bg-indigo-50 text-indigo-600 font-medium" : "hover:bg-gray-100/30"}`}
                    >
                      <span className="w-2 h-2 rounded-full bg-indigo-300 mr-3"></span>
                      {subItem.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
      <div className="absolute bottom-6 left-0 right-0 px-4">
        <Link
          to="/contact"
          className={`flex items-center py-3 px-4 rounded-lg transition text-indigo-600
            hover:bg-indigo-50 ${expanded ? "justify-start" : "justify-center"}`}
        >
          <FontAwesomeIcon
            icon={faQuestionCircle}
            className={expanded ? "mr-3" : ""}
          />
          {expanded && "Support"}
        </Link>
        <div className={`flex items-center mt-4 ${expanded ? "px-4" : "justify-center"}`}>
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-xs font-medium">JD</span>
          </div>
          {expanded && (
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;