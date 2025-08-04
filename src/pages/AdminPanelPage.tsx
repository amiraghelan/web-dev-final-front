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

  const { isAuthenticated, user } = authContext;
  console.log(isAuthenticated)
  console.log(user.role)
  if (!isAuthenticated || user.role !== "admin") {
    console.log("in if")
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;