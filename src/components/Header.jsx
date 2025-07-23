import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-white">
        Ajali
      </Link>
      <nav className="flex space-x-4">
        <Link to="/" className="text-white hover:text-blue-200 transition">
          Home
        </Link>
        <Link to="/login" className="text-white hover:text-blue-200 transition">
          Login
        </Link>
        <Link to="/register" className="text-white hover:text-blue-200 transition">
          Register
        </Link>
      </nav>
    </header>
  );
}

export default Header;