import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowRightIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Login
      const loginRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData,
        { withCredentials: true }
      );

      const token = loginRes.data.access_token;
      localStorage.setItem("access_token", token);

      // Step 2: Get user info from /auth/me
      const userRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const user = userRes.data;

      alert("Login successful!");

      // Step 3: Redirect based on email (or user role if your backend supports it)
      if (user.email === "user1@example.com") {
        navigate("/admin");
      } else {
        navigate("/incidents");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Welcome Back
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-all duration-300 flex items-center justify-center"
            >
              {loading ? "Signing in..." : "Sign In"}
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
