import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error("AuthContext must be used within AuthProvider");

  const { isAuthenticated, loading } = authContext;

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;