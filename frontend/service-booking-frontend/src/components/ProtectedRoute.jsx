import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { token } = useContext(AuthContext);
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;

  if (adminOnly && role !== "admin") {
    return <Navigate to="/services" replace />;
  }

  return children;
}
