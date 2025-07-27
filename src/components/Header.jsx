import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("access_token");

  // Only show logout on these pages
  const showLogout =
    isLoggedIn &&
    ["/admin", "/incidents", "/contact", "/search-results"].includes(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("is_admin");
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-700 hover:text-blue-900 transition">
        Ajali
      </Link>

      <nav className="relative">
        {showLogout ? (
          <div className="relative inline-block text-left">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition"
            >
              Account
              <ChevronDownIcon className="h-4 w-4 text-gray-600" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-800 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-800 font-medium transition"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
