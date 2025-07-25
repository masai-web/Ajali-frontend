import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Incidents from "./pages/Incidents";
import PrivateRoute from "./components/PrivateRoute";
import SearchResults from "./pages/SearchResults";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/about" element={<About />} />

        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/incidents" 
          element={
            <PrivateRoute>
              <Incidents />
            </PrivateRoute>
          } 
        />
        
      </Routes>
    </Router>
  );
}

export default App;
