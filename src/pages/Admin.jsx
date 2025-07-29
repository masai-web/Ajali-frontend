import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaSearch,
  FaImages,
  FaUser,
  FaCogs,
  FaSignOutAlt,
  FaHome,
  FaUsers,
  FaClipboardList,
  FaCog,
  FaChevronDown,
  FaChevronRight
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { getLocationName } from "../utils/geocode";
import { toast } from "react-toastify";
import Swal from "sweetalert2";



function Header() {
  const [language, setLanguage] = useState("en");

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-4 py-3">
      <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-8 w-full">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-purple-600 transition"
        >
          Ajali
        </Link>

        {/* Nav Links */}
        <Link
          to="/"
          className="font-bold text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-purple-600 transition"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="font-bold text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-purple-600 transition"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="font-bold text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-purple-600 transition"
        >
          Contact
        </Link>

        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="font-bold text-black border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">EN</option>
          <option value="sw">SW</option>
          <option value="fr">FR</option>
        </select>
      </div>
    </nav>
  );
}

const Sidebar = ({ selectedTab, onTabChange }) => {
  const [showReportsDropdown, setShowReportsDropdown] = useState(false);

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 shadow-xl z-40">
      <div className="flex items-center justify-center h-16 bg-blue-800 mt-16">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <FaUser className="text-blue-800 text-lg" />
          </div>
          <span className="text-white text-xl font-bold">Admin</span>
        </div>
      </div>
      
      <nav className="mt-8 px-4">
        <div className="space-y-2">
          <button
            onClick={() => onTabChange("Dashboard")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors group ${
              selectedTab === "Dashboard"
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <FaHome className={`mr-3 ${
              selectedTab === "Dashboard" ? "text-white" : "text-gray-400 group-hover:text-white"
            }`} />
            Dashboard
          </button>

          <button
            onClick={() => onTabChange("Users")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors group ${
              selectedTab === "Users"
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <FaUsers className={`mr-3 ${
              selectedTab === "Users" ? "text-white" : "text-gray-400 group-hover:text-white"
            }`} />
            Users
          </button>

          <div>
            <button
              onClick={() => setShowReportsDropdown(!showReportsDropdown)}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors group ${
                selectedTab.startsWith("Reports")
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <div className="flex items-center">
                <FaClipboardList className={`mr-3 ${
                  selectedTab.startsWith("Reports") ? "text-white" : "text-gray-400 group-hover:text-white"
                }`} />
                Reports
              </div>
              {showReportsDropdown ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}
            </button>

            {showReportsDropdown && (
              <div className="ml-8 mt-1 space-y-1">
                {["pending", "reviewing", "resolved", "dismissed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => onTabChange(`Reports-${status}`)}
                    className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors text-sm ${
                      selectedTab === `Reports-${status}`
                        ? "bg-gray-600 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onTabChange("Settings")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors group ${
              selectedTab === "Settings"
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <FaCog className={`mr-3 ${
              selectedTab === "Settings" ? "text-white" : "text-gray-400 group-hover:text-white"
            }`} />
            Settings
          </button>
        </div>
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/17003/17003310.png" 
              alt="Admin" 
              className="w-10 h-10 rounded-full" 
            />
            <div>
              <p className="text-white text-sm font-medium">Admin User</p>
              <p className="text-gray-400 text-xs">Administrator</p>
            </div>
          </div>
          <button 
            onClick={() => onTabChange("Logout")}
            className="w-full mt-3 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors flex items-center justify-center"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

function Admin() {
  const [incidents, setIncidents] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [reportFilter, setReportFilter] = useState(null);
  const navigate = useNavigate();
  
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaContent, setMediaContent] = useState([]);

  const token = localStorage.getItem("access_token");

  const fetchIncidents = async (status = null) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/incidents${status ? `?status=${status}` : ""}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      const enrichedData = await Promise.all(
        res.data.incidents.map(async (incident) => {
          if (incident.latitude && incident.longitude) {
            const locationName = await getLocationName(
              incident.latitude,
              incident.longitude
            );
            return { ...incident, locationName };
          }
          return { ...incident, locationName: "Location unknown" };
        })
      );

      setIncidents(enrichedData);
    } catch (err) {
      console.error("Error fetching incidents:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
 const deleteUser = async (userId) => {
   const confirmResult = await Swal.fire({
     title: "Are you sure?",
     text: "You won't be able to revert this!",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#d33",
     cancelButtonColor: "#3085d6",
     confirmButtonText: "Yes, delete it!",
   });

   if (!confirmResult.isConfirmed) return;

   try {
     await axios.delete(
       `${import.meta.env.VITE_API_URL}/auth/users/${userId}`,
       {
         headers: { Authorization: `Bearer ${token}` },
         withCredentials: true,
       }
     );

     // Refresh the user list
     fetchUsers();
   } catch (err) {
     console.error("Failed to delete user:", err);
     toast.error(err.response?.data?.message || "Error deleting user.");
   }
 };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    
    if (selectedTab === "Dashboard" || selectedTab.startsWith("Reports")) {
      const status = selectedTab.split("-")[1];
      fetchIncidents(status);
    } else if (selectedTab === "Users") {
      fetchUsers();
    } else if (selectedTab === "Logout") {
      handleLogout();
    }
  }, [selectedTab]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const updateStatus = (id, newStatus) => {
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/incidents/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setIncidents((prev) =>
          prev.map((incident) =>
            incident.id === id ? { ...incident, status: newStatus } : incident
          )
        );
      })
      .catch((err) => {
        console.error("Failed to update status", err);
      });
  };

  const viewMedia = async (incidentId) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/incidents/${incidentId}/media`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setMediaContent(res.data);
      setShowMediaModal(true);
    } catch (err) {
      console.error("Error fetching media:", err);
    }
  };

  const deleteIncident = async (incidentId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this incident? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/incidents/${incidentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setIncidents((prev) => prev.filter((i) => i.id !== incidentId));
        Swal.fire("Deleted!", "The incident has been deleted.", "success");
      } catch (err) {
        console.error("Failed to delete incident:", err);
        Swal.fire(
          "Error",
          "Failed to delete incident. Please try again.",
          "error"
        );
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "resolved":
        return <FaCheckCircle className="text-green-500 inline mr-1" />;
      case "pending":
        return <FaExclamationCircle className="text-yellow-500 inline mr-1" />;
      case "dismissed":
        return <FaTimesCircle className="text-red-500 inline mr-1" />;
      default:
        return <FaExclamationCircle className="text-blue-500 inline mr-1" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'dismissed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex pt-16">
        <Sidebar
          selectedTab={selectedTab}
          onTabChange={(tab) => {
            setSelectedTab(tab);
            if (tab === "Logout") {
              handleLogout();
            }
          }}
        />

        <div className="flex-1 ml-64">
          {/* Top Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {selectedTab.split("-")[0]}
                    {selectedTab.split("-")[1] && (
                      <span className="ml-2 text-blue-600">
                        ({selectedTab.split("-")[1].charAt(0).toUpperCase() + selectedTab.split("-")[1].slice(1)})
                      </span>
                    )}
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">
                    {selectedTab === "Dashboard" 
                      ? "Overview of all reported incidents" 
                      : selectedTab === "Users"
                      ? "Manage system users"
                      : selectedTab.startsWith("Reports")
                      ? "View and manage incident reports"
                      : "System configuration settings"}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="p-6">
            {(selectedTab === "Dashboard" || selectedTab.startsWith("Reports")) && (
              <>
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Media</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {incidents
                            .filter((i) =>
                              i.title.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((incident) => (
                              <tr key={incident.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{incident.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(incident.status)}`}>
                                    {getStatusIcon(incident.status)}
                                    {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{incident.type}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{incident.reporter}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">{incident.locationName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">
                                    {new Date(incident.created_at).toLocaleString()}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <button
                                    onClick={() => viewMedia(incident.id)}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    <FaImages className="inline mr-1" />
                                    View
                                  </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex space-x-2">
                                    <select
                                      className="border p-1 rounded-md bg-gray-50 text-sm"
                                      value={incident.status}
                                      onChange={(e) => updateStatus(incident.id, e.target.value)}
                                    >
                                      <option value="pending">Pending</option>
                                      <option value="reviewing">Reviewing</option>
                                      <option value="resolved">Resolved</option>
                                      <option value="dismissed">Dismissed</option>
                                    </select>
                                    <button
                                      onClick={() => deleteIncident(incident.id)}
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}

            {selectedTab === "Users" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{user.username}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{user.phone || "—"}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                              user.is_admin ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}>
                              {user.is_admin ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTab === "Settings" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">System Settings</h2>
                <div className="space-y-6">
                  {/* <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Notification Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input type="checkbox" id="email-notifications" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-900">
                          Email Notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="push-notifications" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="push-notifications" className="ml-2 block text-sm text-gray-900">
                          Push Notifications
                        </label>
                      </div>
                    </div>
                  </div> */}

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">System Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Default Incident Status</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                          <option>Pending</option>
                          <option>Reviewing</option>
                          <option>Resolved</option>
                          <option>Dismissed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Items Per Page</label>
                        <input type="number" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" defaultValue="10" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mr-3">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

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
                <FaTimesCircle className="text-xl" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
              {mediaContent.length === 0 ? (
                <div className="col-span-2 text-center text-gray-500 py-8">
                  No media available for this incident
                </div>
              ) : (
                mediaContent.map((media, index) => (
                  <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
                    {media.media_type === "image" ? (
                      <img 
                        src={media.file_url} 
                        alt={`Incident media ${index + 1}`} 
                        className="w-full h-auto object-cover"
                      />
                    ) : (
                      <video
                        src={media.file_url}
                        controls
                        className="w-full h-auto"
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;