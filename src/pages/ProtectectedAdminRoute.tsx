import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import type { ReactNode } from "react";

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error("AuthContext must be used within AuthProvider");

  const { isAuthenticated, user, loading } = authContext;

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated || user.role !== "admin") {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;