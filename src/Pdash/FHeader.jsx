// FHeader.js
import { Activity } from "lucide-react";

export default function FHeader() {
  return (
    <header className="fixed top-0 w-full bg-gray-900 border-b border-gray-800 z-10000 fixed top-0">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold text-white">DOC HIVE</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a>
          <a href="/doctors" className="text-gray-300 hover:text-blue-400 transition-colors">Find Doctors</a>
          <a href="/ai" className="text-gray-300 hover:text-blue-400 transition-colors">Chatbot</a>
          <a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</a>
        </div>
      </nav>
    </header>
  );
}
