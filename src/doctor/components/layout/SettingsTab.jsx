import React, { useState } from "react";

const SettingsTab = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings saved:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-6 max-w-lg w-full">
      <h2 className="text-2xl font-semibold text-[#0D2853] mb-6">Settings</h2>

      {/* Notification Toggle */}
      <div className="flex justify-between items-center mb-5 p-3 bg-white/10 rounded-lg">
        <div>
          <p className="text-gray-700 font-medium">Enable Notifications</p>
          <p className="text-gray-500 text-sm">Receive app notifications</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="notifications"
            className="sr-only peer"
            checked={settings.notifications}
            onChange={handleChange}
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 after:absolute after:top-0.5 after:left-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
        </label>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex justify-between items-center mb-5 p-3 bg-white/10 rounded-lg">
        <div>
          <p className="text-gray-700 font-medium">Dark Mode</p>
          <p className="text-gray-500 text-sm">Switch between light and dark theme</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="darkMode"
            className="sr-only peer"
            checked={settings.darkMode}
            onChange={handleChange}
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-purple-500 after:absolute after:top-0.5 after:left-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Settings
        </button>
        <button
          type="button"
          onClick={() => setSettings({
            notifications: true,
            darkMode: false,
          })}
          className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg shadow-lg transition hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default SettingsTab;