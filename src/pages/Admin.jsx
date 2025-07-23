import { useEffect, useState } from "react";
import Header from "../components/Header";

function Admin() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  // MOCK DATA (for styling only)
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
  ];

  useEffect(() => {
    // Simulate API loading
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

  if (loading) return <p className="text-center mt-10">Loading mock data...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Render the Header here */}
      <Header />
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard (Mock Preview)</h1>

      <table className="w-full text-left border-collapse border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Reporter</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Change Status</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id} className="hover:bg-gray-50">
              <td className="border p-2">{incident.title}</td>
              <td className="border p-2 capitalize">{incident.status}</td>
              <td className="border p-2">{incident.type}</td>
              <td className="border p-2">{incident.reporter}</td>
              <td className="border p-2">{new Date(incident.created_at).toLocaleString()}</td>
              <td className="border p-2">
                <select
                  value={incident.status}
                  onChange={(e) => updateStatus(incident.id, e.target.value)}
                  className="border p-1 rounded"
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
  );
}

export default Admin;