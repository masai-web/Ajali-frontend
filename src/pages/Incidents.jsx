import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Incidents() {
  const [user, setUser] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [activeTab, setActiveTab] = useState("report");
  const [editingIncident, setEditingIncident] = useState(null);
  const navigate = useNavigate();

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
  const [mediaUrls, setMediaUrls] = useState([]);
  const [showMediaModal, setShowMediaModal] = useState(false);

  const token = localStorage.getItem("access_token");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => {
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
      .catch((err) => {
        console.error("Error fetching user:", err);
        navigate("/");
      });
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

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
      if (formData[key]) {
        if (key === "image") {
          form.append("files", formData[key]);
        } else {
          form.append(key, formData[key]);
        }
      }
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

  const viewMedia = async (incidentId) => {
    try {
      const res = await axios.get(
        `${API_URL}/incidents/${incidentId}/media`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setMediaUrls(res.data.map((m) => m.file_url));
      setShowMediaModal(true);
    } catch (err) {
      console.error("Failed to fetch media", err);
      alert("Unable to load media");
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex pt-16">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 shadow-xl z-40">
          <div className="flex items-center justify-center h-16 bg-blue-800 mt-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <i className="fas fa-exclamation-triangle text-blue-800 text-lg"></i>
              </div>
              <span className="text-white text-xl font-bold">Welcome</span>
            </div>
          </div>
          
          <nav className="mt-8 px-4">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab("report")}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors group ${
                  activeTab === "report"
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <i className={`fas fa-plus mr-3 ${
                  activeTab === "report" ? "text-white" : "text-gray-400 group-hover:text-white"
                }`}></i>
                Report Incident
              </button>
              <button
                onClick={() => setActiveTab("myreports")}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors group ${
                  activeTab === "myreports"
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <i className={`fas fa-list mr-3 ${
                  activeTab === "myreports" ? "text-white" : "text-gray-400 group-hover:text-white"
                }`}></i>
                My Reports
              </button>
            </div>
          </nav>
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/17003/17003310.png" 
                  alt="User" 
                  className="w-10 h-10 rounded-full" 
                />
                <div>
                  <p className="text-white text-sm font-medium">
                    {user ? user.username : "Loading..."}
                  </p>
                  <p className="text-gray-400 text-xs">User</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full mt-3 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors flex items-center justify-center"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          {/* Top Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {activeTab === "report" ? "Report New Incident" : "My Incident Reports"}
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">
                    {activeTab === "report" 
                      ? "Submit details about the incident" 
                      : "View and manage your reported incidents"}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="relative">
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <i className="fas fa-bell text-xl"></i>
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="p-6">
            {activeTab === "report" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Incident Details</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Brief incident title"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      placeholder="Detailed description of the incident"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Incident Type</label>
                    <select
                      name="type"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                      <input
                        type="text"
                        name="latitude"
                        placeholder="Latitude coordinates"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        value={formData.latitude}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                      <input
                        type="text"
                        name="longitude"
                        placeholder="Longitude coordinates"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        value={formData.longitude}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg cursor-pointer">
                        <div className="flex flex-col items-center justify-center pt-7">
                          <i className="fas fa-cloud-upload-alt text-gray-500 text-3xl"></i>
                          <p className="pt-1 text-sm text-gray-600">
                            {formData.image ? formData.image.name : "Click to upload an image"}
                          </p>
                        </div>
                        <input 
                          type="file" 
                          name="image" 
                          accept="image/*" 
                          onChange={handleChange} 
                          className="opacity-0" 
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors"
                    >
                      <i className="fas fa-paper-plane mr-2"></i>
                      Submit Incident
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "myreports" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">My Incident Reports</h3>
                      <p className="text-gray-600 text-sm">View and manage your reported incidents</p>
                    </div>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <i className="fas fa-download mr-2"></i>Export
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  {incidents.length === 0 ? (
                    <div className="p-6 text-center text-gray-600">
                      You have not submitted any incident reports yet.
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {incidents.map((incident) => (
                          <tr key={incident.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{incident.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{incident.type}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(incident.status)}`}>
                                {incident.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {new Date(incident.created_at).toLocaleString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => viewMedia(incident.id)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button 
                                  onClick={() => openEditModal(incident)}
                                  className="text-gray-600 hover:text-gray-800"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Edit Modal */}
      {editingIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Edit Incident</h3>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  rows={4}
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                  <input
                    type="text"
                    name="latitude"
                    placeholder="Latitude"
                    value={editForm.latitude}
                    onChange={handleEditChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                  <input
                    type="text"
                    name="longitude"
                    placeholder="Longitude"
                    value={editForm.longitude}
                    onChange={handleEditChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setEditingIncident(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Modal */}
      {showMediaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Incident Media</h3>
              <button 
                onClick={() => setShowMediaModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {mediaUrls.map((url, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  <img 
                    src={url} 
                    alt={`Incident media ${index + 1}`} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Incidents;