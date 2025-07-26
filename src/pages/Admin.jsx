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
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getLocationName } from "../utils/geocode";
import Header from "../components/Header";

const Sidebar = ({ selectedTab, onTabChange }) => {
  const [showReportsDropdown, setShowReportsDropdown] = useState(false);

  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-5 space-y-6 fixed">
      <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>
      <nav className="space-y-4">
        {["Dashboard", "Users", "Reports", "Settings", "Logout"].map((item) => (
          <div key={item}>
            <button
              onClick={() => {
                if (item === "Reports") {
                  setShowReportsDropdown(!showReportsDropdown);
                } else {
                  onTabChange(item);
                }
              }}
              className={`block w-full text-left hover:text-yellow-400 ${
                selectedTab === item ? "text-yellow-300 font-semibold" : ""
              }`}
            >
              {item}
            </button>
            {item === "Reports" && showReportsDropdown && (
              <div className="ml-4 mt-2 space-y-1">
                {["pending", "reviewing", "resolved", "dismissed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => onTabChange("Reports", status)}
                    className="text-sm hover:text-yellow-300 block"
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
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

  useEffect(() => {
    if (!token) return;
    if (selectedTab === "Dashboard" || selectedTab === "Reports") {
      fetchIncidents(reportFilter);
    } else if (selectedTab === "Users") {
      fetchUsers();
    }
  }, [selectedTab, reportFilter]);

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

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "resolved":
        return <FaCheckCircle className="text-green-500 inline" />;
      case "pending":
        return <FaExclamationCircle className="text-yellow-500 inline" />;
      case "dismissed":
        return <FaTimesCircle className="text-red-500 inline" />;
      default:
        return <FaExclamationCircle className="text-blue-500 inline" />;
    }
  };

  return (
    <div className="flex">
     {/* Header */}
      <Header />
      <Sidebar
        selectedTab={selectedTab}
        onTabChange={(tab, filter = null) => {
          setSelectedTab(tab);
          if (tab === "Reports") setReportFilter(filter);
          if (tab === "Logout") logout();
        }}
      />
      <div className="ml-64 w-full pt-20 px-8 pb-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">{selectedTab}</h1>

        {selectedTab === "Users" && (
          <div className="overflow-auto bg-white rounded-lg shadow p-4">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3">Username</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Phone</th>
                  <th className="text-left p-3">Admin</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.phone || "—"}</td>
                    <td className="p-3">{user.is_admin ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {(selectedTab === "Dashboard" || selectedTab === "Reports") && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div className="relative">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title..."
                  className="pl-10 pr-4 py-2 border rounded-md w-72 shadow-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <p>Loading data...</p>
            ) : (
              <div className="overflow-auto bg-white rounded-lg shadow">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-3">Title</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Type</th>
                      <th className="text-left p-3">Reporter</th>
                      <th className="text-left p-3">Location</th>
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Media</th>
                      <th className="text-left p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incidents
                      .filter((i) =>
                        i.title.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((incident) => (
                        <tr key={incident.id} className="border-t hover:bg-gray-50">
                          <td className="p-3 font-medium text-gray-800">{incident.title}</td>
                          <td className="p-3 capitalize">
                            {getStatusIcon(incident.status)}{" "}
                            <span className="ml-1">{incident.status}</span>
                          </td>
                          <td className="p-3">{incident.type}</td>
                          <td className="p-3">{incident.reporter}</td>
                          <td className="p-3 text-sm text-gray-700">
                            {incident.locationName}
                          </td>
                          <td className="p-3">
                            {new Date(incident.created_at).toLocaleString()}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() =>
                                window.open(
                                  `${import.meta.env.VITE_API_URL}/incidents/${incident.id}/media`,
                                  "_blank"
                                )
                              }
                              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md"
                            >
                              <FaImages className="inline mr-1" />
                              View Media
                            </button>
                          </td>
                          <td className="p-3">
                            <select
                              className="border p-1 rounded-md bg-gray-50"
                              value={incident.status}
                              onChange={(e) =>
                                updateStatus(incident.id, e.target.value)
                              }
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewing">Reviewing</option>
                              <option value="resolved">Resolved</option>
                              <option value="dismissed">Dismissed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;