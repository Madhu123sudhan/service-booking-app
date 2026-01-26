import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { token, role, loading } = useContext(AuthContext);

  // Wait until auth state is loaded
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!token) return <Navigate to="/login" replace />;

  if (adminOnly && role !== "admin") {
    return <Navigate to="/services" replace />;
  }

  return children;
}
