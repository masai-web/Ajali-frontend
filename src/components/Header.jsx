import { Link } from "react-router-dom";


import { useState } from "react";

function Header() {
  const [language, setLanguage] = useState("en");
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", search);
    // Add actual search logic here
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3">
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
        <Link
          to="/report"
          className="font-bold text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-purple-600 transition"
        >
          Report
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

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search incidents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
</form>

      </div>
    </nav>
  );
}

export default Header;

