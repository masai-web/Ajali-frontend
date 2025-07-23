import { useState } from "react";
// import axios from "axios";

import Header from "../components/Header";
function IncidentForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    latitude: "",
    longitude: "",
  });

  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // store JWT after login

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    Array.from(files).forEach((file) => data.append("files", file));

    try {
      const response = await axios.post("http://localhost:5555/incidents/", data, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      setMessage("Incident reported successfully!");
    } catch (error) {
      setMessage("Error reporting incident.");
    }
  };

  return (
    <>
  <Header />
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 flex justify-center items-start">
    <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8"> Report an Incident</h2>

      {message && <p className="mb-6 text-center text-green-600 font-semibold">{message}</p>}

      <form onSubmit={handleSubmit} className="grid gap-6">
        {/* Title */}
        <div className="relative">
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            required
            placeholder=" "
            className="peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <label
            htmlFor="title"
            className="absolute text-gray-600 text-sm left-4 top-2 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
          >
            Title
          </label>
        </div>

        {/* Description */}
        <div className="relative">
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
            required
            placeholder=" "
            rows="4"
            className="peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <label
            htmlFor="description"
            className="absolute text-gray-600 text-sm left-4 top-2 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
          >
            Description
          </label>
        </div>

        {/* Type */}
        <div className="relative">
          <input
            type="text"
            name="type"
            id="type"
            onChange={handleChange}
            required
            placeholder=" "
            className="peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <label
            htmlFor="type"
            className="absolute text-gray-600 text-sm left-4 top-2 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
          >
            Incident Type
          </label>
        </div>

        {/* Latitude */}
        <div className="relative">
          <input
            type="text"
            name="latitude"
            id="latitude"
            onChange={handleChange}
            required
            placeholder=" "
            className="peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <label
            htmlFor="latitude"
            className="absolute text-gray-600 text-sm left-4 top-2 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
          >
            Latitude
          </label>
        </div>

        {/* Longitude */}
        <div className="relative">
          <input
            type="text"
            name="longitude"
            id="longitude"
            onChange={handleChange}
            required
            placeholder=" "
            className="peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <label
            htmlFor="longitude"
            className="absolute text-gray-600 text-sm left-4 top-2 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
          >
            Longitude
          </label>
        </div>

        {/* Media Upload */}
        <div>
          <label htmlFor="files" className="block mb-2 text-sm font-medium text-gray-700">
            Upload Media
          </label>
          <input
            id="files"
            name="files"
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-800 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
          <p className="mt-1 text-sm text-gray-500">Upload images, videos, or documents.</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-600 rounded-md font-semibold transition hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-blue-600 to-purple-600 border border-blue-600 hover:border-purple-600">
          Submit Incident
        </button>
      </form>
    </div>
  </div>
</>

  );
}

export default IncidentForm;