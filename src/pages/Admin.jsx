import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaSearch } from "react-icons/fa";

const Sidebar = () => (
  <div className="bg-gray-800 text-white w-64 h-screen p-5 space-y-6 fixed">
    <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>
    <nav className="space-y-4">
      <a href="#" className="block hover:text-yellow-400">Dashboard</a>
      <a href="#" className="block hover:text-yellow-400">Users</a>
      <a href="#" className="block hover:text-yellow-400">Reports</a>
      <a href="#" className="block hover:text-yellow-400">Settings</a>
    </nav>
  </div>
);

function Admin() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const mockIncidents = [
    {
      id: 1,
      title: "Car Accident on Highway",
      description: "Multiple vehicle collision near exit 13.",
      type: "Accident",
      status: "pending",
      reporter: "john_doe",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Fire in Apartment",
      description: "Reported smoke and fire on 2nd floor.",
      type: "Fire",
      status: "resolved",
      reporter: "jane_doe",
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Flooded Street",
      description: "Water levels rising quickly in downtown area.",
      type: "Flood",
      status: "reviewing",
      reporter: "admin_user",
      created_at: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIncidents(mockIncidents);
      setLoading(false);
    }, 500);
  }, []);

  const updateStatus = (id, newStatus) => {
    setIncidents((prev) =>
      prev.map((incident) =>
        incident.id === id ? { ...incident, status: newStatus } : incident
      )
    );
  };

  const filtered = incidents.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase())
  );

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
      <Sidebar />
      <div className="ml-64 w-full p-8 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

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
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((incident) => (
                  <tr key={incident.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-800">{incident.title}</td>
                    <td className="p-3 capitalize">
                      {getStatusIcon(incident.status)}{" "}
                      <span className="ml-1">{incident.status}</span>
                    </td>
                    <td className="p-3">{incident.type}</td>
                    <td className="p-3">{incident.reporter}</td>
                    <td className="p-3">
                      {new Date(incident.created_at).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <select
                        className="border p-1 rounded-md bg-gray-50"
                        value={incident.status}
                        onChange={(e) => updateStatus(incident.id, e.target.value)}
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
      </div>
    </div>
  );
}

export default Admin;