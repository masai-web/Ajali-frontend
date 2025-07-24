import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import Header from "../components/Header";

import IncidentMap from "../components/IncidentMap";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-indigo-900 text-white flex flex-col">
       {/* Render the Header here */}
      <Header />
      
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center px-4 py-12 md:py-10">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Ajali: Report Emergencies Instantly
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
          A modern platform to report and track incidents in real-time. Ensure your safety and community awareness.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/register">
            <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 shadow-md transition">
              Register
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-blue-800 transition">
              Login
            </button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-white text-gray-800 py-32 px-6 md:px-40">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Ajali?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Real-Time Reporting</h3>
            <p className="text-gray-600">
              Instantly share accident or emergency details with accurate location and media support.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Smart Notifications</h3>
            <p className="text-gray-600">
              Stay informed with automated email or SMS notifications for status updates.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
            <p className="text-gray-600">
              Authorities can update incident statuses and monitor trends efficiently.
            </p>
          </div>
        </div>
      </section>
      <section className="px-4 pb-12">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Live Incident Map</h2>
        <IncidentMap />
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Be the First to Report</h2>
        <p className="text-lg mb-6">
          Help prevent delays by reporting emergencies right from your phone.
        </p>
        <Link to="/report">
          <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 shadow-md transition inline-flex items-center">
            Report Now <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-sm text-center py-6">
        © {new Date().getFullYear()} Ajali App. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;

