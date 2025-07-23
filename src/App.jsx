import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Incidents from "./pages/Incidents";
import IncidentForm from "./pages/IncidentForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/report" element={<IncidentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
