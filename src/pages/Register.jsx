import { Link } from "react-router-dom";
import { ArrowRightIcon, UserCircleIcon, EnvelopeIcon, LockClosedIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Header from "../components/Header";

function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-indigo-900 text-white flex flex-col">
      <Header />
      
      <main className="flex flex-col items-center justify-center px-4 py-12 flex-grow">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircleIcon className="h-5 w-5 text-blue-200" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-blue-200" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon className="h-5 w-5 text-blue-200" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="+254 700 000000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-blue-200" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 shadow-md transition"
              >
                Register <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-blue-100">
              Already have an account?{' '}
              <Link to="/login" className="text-white font-semibold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;