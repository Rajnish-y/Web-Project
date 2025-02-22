import React, { useState, useRef, useEffect } from "react";
import { Activity, Calendar, Users, Shield, Heart, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell, faCog } from "@fortawesome/free-solid-svg-icons";
import SettingsTab from "./SettingsTab"; // Import the reusable settings component


const Header = () => {
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="p-4 bg-white shadow-lg relative">
      <div className="container px-7 py-4 mx-auto flex justify-between items-center gap-3 border-b-black">
        {/* Logo / Brand Name */}
        <div className="flex items-center justify-center mb-8">
          <Activity className="h-8 w-8 text-blue-700 mr-2" />
          <span className="text-xl font-bold text-blue-900">DOC HIVE</span>
        </div>

        {/* Icons Section */}
        <div className="flex items-center space-x-8 relative">
          {/* Notification Icon */}
          <FontAwesomeIcon
            icon={faBell}
            className="text-black cursor-pointer hover:text-blue-400 transition text-2xl"
          />

          {/* User Icon (Settings Toggle) */}
          <div className="relative" ref={settingsRef}>
            <FontAwesomeIcon
              icon={faCog}
              className="text-black text-2xl cursor-pointer hover:text-blue-400 transition"
              onClick={() => setShowSettings(!showSettings)}
            />

            {/* Settings Dropdown */}
            {showSettings && (
              <div className="absolute right-0 mt-4 w-72 z-20 bg-white/30 backdrop-blur-lg border border-white/40 rounded-xl shadow-lg p-4 transition-all">
                <SettingsTab />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
