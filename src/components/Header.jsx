import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [language, setLanguage] = useState("en");

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-4 py-3">
      <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-8 w-full">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-purple-600 transition"
        >
          Ajali
        </Link>

        {/* Nav Links */}
        <Link
          to="/"
          className="font-bold text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-purple-600 transition"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="font-bold text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-purple-600 transition"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="font-bold text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-purple-600 transition"
        >
          Contact
        </Link>
        <Link
          to="/login"
          className="font-bold text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-purple-600 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="font-bold text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-purple-600 transition"
        >
          Register
        </Link>

        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="font-bold text-black border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">EN</option>
          <option value="sw">SW</option>
          <option value="fr">FR</option>
        </select>
      </div>
    </nav>
  );
}

export default Header;
