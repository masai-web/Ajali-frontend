import { useEffect, useState } from "react";
import User from "../components/User";
import axios from "axios";

function Incidents() {
  const [user, setUser] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    latitude: "",
    longitude: "",
  });

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get("https://ajali-backend-7ex3.onrender.com/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
        // Now fetch user's incidents
        axios
          .get("https://ajali-backend-7ex3.onrender.com/incidents", {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          })
          .then((res) => {
            // Filter incidents by logged-in user
            const userIncidents = res.data.incidents.filter(
              (incident) => incident.reporter === res.data.username
            );
            setIncidents(userIncidents);
          });
      })
      .catch((err) => console.error("Failed to fetch user", err));
  }, [token]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    axios
      .post("https://ajali-backend-7ex3.onrender.com/incidents", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then(() => {
        alert("Incident reported successfully!");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Incident submission failed", err);
        alert("Failed to submit incident");
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 underline">
        Incident Reports
      </h1>

      <div className="flex gap-6">
        {/* Left Sidebar - Incident History */}
        <div className="w-1/4 bg-white p-4 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            My Reports
          </h2>
          {incidents.length === 0 ? (
            <p className="text-gray-500">No reports yet.</p>
          ) : (
            <ul className="space-y-2">
              {incidents.map((incident) => (
                <li
                  key={incident.id}
                  className="p-2 bg-gray-100 rounded-md hover:bg-blue-50"
                >
                  <p className="font-medium">{incident.title}</p>
                  <p className="text-sm text-gray-600">{incident.status}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Form Area */}
        <div className="w-3/4 bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Submit a New Incident
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
              required
            />
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Type (e.g., fire, accident)"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Latitude"
                className="w-1/2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="Longitude"
                className="w-1/2 p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Submit Incident
            </button>
          </form>
        </div>
      </div>

      {/* Optional user info component */}
      <div className="mt-10">
        <User user={user} />
      </div>
    </div>
  );
}

export default Incidents;
