import React, { useState } from "react";

const SettingsTab = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");

  return (
    <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-6 max-w-lg w-full">
      <h2 className="text-xl font-semibold text-[#0D2853] mb-4">Settings</h2>

      {/* Notification Toggle */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-700">Enable Notifications</p>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 after:absolute after:top-0.5 after:left-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
        </label>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-700">Dark Mode</p>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-purple-500 after:absolute after:top-0.5 after:left-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
        </label>
      </div>

      {/* Language Selection */}
      <div className="mb-4">
        <label className="text-gray-700 block mb-2">Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-white/30 backdrop-blur-md border border-white/40 px-4 py-2 rounded-lg shadow-md text-gray-700 focus:outline-none"
        >
          <option>English</option>
          <option>French</option>
          <option>Spanish</option>
        </select>
      </div>

      {/* Save Button */}
      <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-lg transition hover:bg-blue-600">
        Save Settings
      </button>
    </div>
  );
};

export default SettingsTab;
