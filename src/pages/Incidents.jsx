import { useEffect, useState } from "react";
import axios from "axios";
import User from "../components/User";
import banner from "../assets/banner.jpg";
import Header from "../components/Header";

function Incidents() {
  const [user, setUser] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    latitude: "",
    longitude: "",
  });

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) return;

    axios
      .get("https://ajali-backend-7ex3.onrender.com/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
        axios
          .get("https://ajali-backend-7ex3.onrender.com/incidents", {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          })
          .then((res2) => {
            const userIncidents = res2.data.incidents.filter(
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

  function handleEditChange(e) {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
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
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then(() => {
        alert("Incident reported successfully!");
        window.location.reload();
      })
      .catch(() => alert("Failed to submit incident"));
  }

  function handleEditClick(incident) {
    setEditingId(incident.id);
    setEditFormData({
      title: incident.title,
      description: incident.description,
      latitude: incident.latitude,
      longitude: incident.longitude,
    });
  }

  function handleEditSubmit(e) {
    e.preventDefault();

    axios
      .put(
        `https://ajali-backend-7ex3.onrender.com/incidents/${editingId}`,
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        alert("Incident updated successfully");
        setEditingId(null);
        window.location.reload();
      })
      .catch(() => alert("Failed to update incident"));
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-6 pb-6">
      {/* Header */}
      <Header />  
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Incident Reports
      </h1>

      <div className="relative w-full h-36 md:h-72 mb-8 rounded-xl shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 z-10"></div>
        <img
          src={banner}
          alt="Incident Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex gap-6">
        {/* Left Sidebar - Incident History */}
        <div className="w-1/4 bg-white p-4 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            My Reports
          </h2>
          {incidents.length === 0 ? (
            <p className="text-gray-500">No reports yet.</p>
          ) : (
            <ul className="space-y-4">
              {incidents.map((incident) => (
                <li
                  key={incident.id}
                  className="p-2 bg-gray-100 rounded-md hover:bg-blue-50"
                >
                  {editingId === incident.id ? (
                    <form onSubmit={handleEditSubmit} className="space-y-2">
                      <input
                        type="text"
                        name="title"
                        value={editFormData.title}
                        onChange={handleEditChange}
                        className="w-full p-1 border border-gray-300 rounded"
                      />
                      <textarea
                        name="description"
                        value={editFormData.description}
                        onChange={handleEditChange}
                        className="w-full p-1 border border-gray-300 rounded"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="latitude"
                          value={editFormData.latitude}
                          onChange={handleEditChange}
                          className="w-1/2 p-1 border border-gray-300 rounded"
                          placeholder="Lat"
                        />
                        <input
                          type="text"
                          name="longitude"
                          value={editFormData.longitude}
                          onChange={handleEditChange}
                          className="w-1/2 p-1 border border-gray-300 rounded"
                          placeholder="Lng"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="text-sm bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="text-sm bg-gray-400 text-white px-2 py-1 rounded"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p className="font-medium">{incident.title}</p>
                      <p className="text-sm text-gray-600">{incident.status}</p>
                      <button
                        onClick={() => handleEditClick(incident)}
                        className="text-xs mt-1 text-blue-500 underline"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Form Area */}
        <div className="w-3/4 bg-gray-300 p-6 rounded-xl shadow-md border border-gray-200">
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


