import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  const isAdmin = localStorage.getItem("is_admin") === "true";
  const isAdminRoute = window.location.pathname === "/admin";

  if (!token) return <Navigate to="/login" />;

  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/incidents" />;
  }

  return children;
};

export default PrivateRoute;
