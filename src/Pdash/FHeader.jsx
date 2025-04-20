import { Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function FHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
      ? "bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg"
      : "bg-gray-900 border-b border-gray-800"
      }`}>
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            aria-label="Doc Hive Home"
          >
            <Activity className="h-7 w-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
              DOC HIVE
            </span>
          </Link>
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-1 py-2 text-sm font-medium transition-colors ${location.pathname === link.path
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-300 hover:text-blue-300"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}