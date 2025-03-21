import { useState } from "react";
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import { Toaster } from "sonner";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResidentDashboard from "./pages/resident/Dashboard";
import WorkerDashboard from "./pages/worker/Dashboard";
import OfficialDashboard from "./pages/official/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
export function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("wasteManagementUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const handleLogin = (userData: Record<string, unknown>) => {
    localStorage.setItem("wasteManagementUser", JSON.stringify(userData));
    setUser(userData);
  };
  const handleLogout = () => {
    localStorage.removeItem("wasteManagementUser");
    setUser(null);
  };
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<LandingPage user={user} />} />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} user={user} />}
          />
          <Route
            path="/register"
            element={<Register onRegister={handleLogin} user={user} />}
          />
          <Route
            path="/resident/*"
            element={
              <ProtectedRoute user={user} role="resident">
                <ResidentDashboard user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/worker/*"
            element={
              <ProtectedRoute user={user} role="worker">
                <WorkerDashboard user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/official/*"
            element={
              <ProtectedRoute user={user} role="official">
                <OfficialDashboard user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
