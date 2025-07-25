import { useEffect, useState } from "react";
import axios from "axios";
import User from "../components/User";
import Header from "../components/Header";

function Incidents() {
  const [user, setUser] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [activeTab, setActiveTab] = useState("report");
  const [editingIncident, setEditingIncident] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    latitude: "",
    longitude: "",
    image: null,
  });

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
  });

  const token = localStorage.getItem("access_token");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => {
        console.log("AUTH /me RESPONSE:", res.data);
        const userData = res.data.user;
        setUser(userData);

        axios
          .get(`${API_URL}/incidents?reporter=${userData.username}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          })
          .then((res2) => {
            setIncidents(res2.data.incidents);
          })
          .catch(() => setIncidents([]));
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, [token]);

  function handleChange(e) {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      if (formData[key]) form.append(key, formData[key]);
    }

    axios
      .post(`${API_URL}/incidents`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then(() => {
        alert("Incident reported successfully!");
        setFormData({
          title: "",
          description: "",
          type: "",
          latitude: "",
          longitude: "",
          image: null,
        });
        return axios.get(`${API_URL}/incidents?reporter=${user.username}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      })
      .then((res2) => {
        setIncidents(res2.data.incidents);
        setActiveTab("myreports");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to submit incident");
      });
  }

  function openEditModal(incident) {
    setEditingIncident(incident);
    setEditForm({
      title: incident.title,
      description: incident.description,
      latitude: incident.latitude,
      longitude: incident.longitude,
    });
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    axios
      .put(`${API_URL}/incidents/${editingIncident.id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then(() => {
        setEditingIncident(null);
        return axios.get(`${API_URL}/incidents?reporter=${user.username}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      })
      .then((res2) => setIncidents(res2.data.incidents))
      .catch((err) => {
        console.error(err);
        alert("Failed to update incident");
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 flex">
      <Header />

      <nav className="fixed top-24 left-0 w-48 h-screen bg-gray-800 text-white p-6 flex flex-col space-y-6">
        <h2 className="text-2xl font-bold mb-8">Incidents</h2>
        <button
          onClick={() => setActiveTab("report")}
          className={`text-left px-3 py-2 rounded ${
            activeTab === "report"
              ? "bg-yellow-400 text-gray-900"
              : "hover:bg-yellow-300"
          }`}
        >
          Report
        </button>
        <button
          onClick={() => setActiveTab("myreports")}
          className={`text-left px-3 py-2 rounded ${
            activeTab === "myreports"
              ? "bg-yellow-400 text-gray-900"
              : "hover:bg-yellow-300"
          }`}
        >
          My Reports
        </button>
      </nav>

      <main className="ml-48 flex-1 p-8 overflow-auto">
        {activeTab === "report" && (
          <section className="max-w-xl bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">
              Submit a New Incident
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
              <select
                name="type"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Fire">Fire</option>
                <option value="Accident">Accident</option>
                <option value="Crime">Crime</option>
                <option value="Natural Disaster">Natural Disaster</option>
                <option value="Other">Other</option>
              </select>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="latitude"
                  placeholder="Latitude"
                  className="flex-1 p-2 border border-gray-300 rounded"
                  value={formData.latitude}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="longitude"
                  placeholder="Longitude"
                  className="flex-1 p-2 border border-gray-300 rounded"
                  value={formData.longitude}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Submit Incident
              </button>
            </form>
          </section>
        )}

        {activeTab === "myreports" && (
          <section className="max-w-4xl bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">
              My Incident Reports
            </h2>
            {incidents.length === 0 ? (
              <p className="text-gray-600">
                You have not submitted any incident reports yet.
              </p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Title</th>
                    <th className="border p-2">Type</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident) => (
                    <tr
                      key={incident.id}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="border p-2">{incident.title}</td>
                      <td className="border p-2">{incident.type}</td>
                      <td className="border p-2 capitalize">
                        {incident.status}
                      </td>
                      <td className="border p-2">
                        {new Date(incident.created_at).toLocaleString()}
                      </td>
                      <td className="border p-2">
                        <button
                          onClick={() => openEditModal(incident)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        {/* Edit Modal */}
        {editingIncident && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="max-w-2xl w-full mx-auto px-4 bg-gray-100 p-3 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Edit Incident</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  rows={4}
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="latitude"
                    placeholder="Latitude"
                    value={editForm.latitude}
                    onChange={handleEditChange}
                    className="flex-1 p-2 border border-gray-300 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="longitude"
                    placeholder="Longitude"
                    value={editForm.longitude}
                    onChange={handleEditChange}
                    className="flex-1 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setEditingIncident(null)}
                    className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Incidents;
