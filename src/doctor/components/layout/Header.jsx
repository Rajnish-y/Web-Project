import React, { useState, useRef, useEffect } from "react";
import { Activity, Bell, Settings, User } from "lucide-react";
import SettingsTab from "./SettingsTab";

const Header = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const settingsRef = useRef(null);
  const notificationsRef = useRef(null);

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New appointment request from Sarah Johnson", time: "10 mins ago", read: false },
    { id: 2, message: "Your prescription was approved", time: "2 hours ago", read: true },
    { id: 3, message: "System maintenance scheduled for tonight", time: "1 day ago", read: true },
    { id: 4, message: "New message from patient Mike Peters", time: "2 days ago", read: true }
  ]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
    setUnreadNotifications(notifications.filter(n => !n.read).length - 1);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
    setUnreadNotifications(0);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-800">DOC HIVE</span>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-6">
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowSettings(false);
                }}
                className="p-1 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors relative"
              >
                <Bell className="h-6 w-6" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-20">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No new notifications
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-100 text-center">
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                      View all notifications
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => {
                  setShowSettings(!showSettings);
                  setShowNotifications(false);
                }}
                className="p-1 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Settings className="h-6 w-6" />
              </button>

              {/* Settings Dropdown */}
              {showSettings && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 z-20">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">Settings</h3>
                  </div>
                  <SettingsTab />
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-2 ml-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:inline">Dr. Smith</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;