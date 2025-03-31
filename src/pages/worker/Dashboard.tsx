import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { HomeIcon, MapIcon, CheckSquareIcon, UserIcon } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import WorkerHome from "./Home";
import Tasks from "./Tasks";
import RouteMap from "./RouteMap";
import Profile from "./Profile";
const WorkerDashboard = ({
  user,
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarItems = [{
    label: "Dashboard",
    icon: <HomeIcon size={18} />,
    path: "/worker"
  }, {
    label: "Tasks",
    icon: <CheckSquareIcon size={18} />,
    path: "/worker/tasks"
  }, {
    label: "Routes",
    icon: <MapIcon size={18} />,
    path: "/worker/routes"
  }, {
    label: "Profile",
    icon: <UserIcon size={18} />,
    path: "/worker/profile"
  }];
  const getTitle = path => {
    const item = sidebarItems.find(item => item.path === path);
    return item ? item.label : "Dashboard";
  };
  return <div className="flex h-screen bg-gray-50">
       <div className={`${isMobileMenuOpen ? "block" : "hidden"} fixed inset-0 z-20 bg-gray-600 opacity-50 transition-opacity lg:hidden`} onClick={() => setIsMobileMenuOpen(false)} />
      <div className={`${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-30 w-64 transform transition duration-300 ease-in-out lg:static lg:translate-x-0`}>
        <Sidebar items={sidebarItems} user={user} onLogout={onLogout} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} title={getTitle(window.location.pathname)} onMobileMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} isMobileMenuOpen={isMobileMenuOpen} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Routes>
            <Route path="/" element={<WorkerHome user={user} />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/routes" element={<RouteMap />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </main>
      </div>
    </div>;
};
export default WorkerDashboard;