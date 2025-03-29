import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole = null }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;