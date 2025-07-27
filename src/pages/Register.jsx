import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightIcon, UserCircleIcon, EnvelopeIcon, LockClosedIcon, PhoneIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <UserCircleIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <PhoneIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                  placeholder="+254 700 000000"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
            >
              {loading ? "Registering..." : "Register"}
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-medium hover:underline">Login here</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Register;
