import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CalendarIcon, MapIcon, AlertCircleIcon, BookOpenIcon, UserIcon, HomeIcon } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import ResidentHome from "./Home";
import Schedule from "./Schedule";
import CollectionPoints from "./CollectionPoints";
import Reports from "./Reports";
import Education from "./Education";
import Profile from "./Profile";
const ResidentDashboard = ({
  user,
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarItems = [{
    label: "Dashboard",
    icon: <HomeIcon size={18} />,
    path: "/resident"
  }, {
    label: "Collection Schedule",
    icon: <CalendarIcon size={18} />,
    path: "/resident/schedule"
  }, {
    label: "Collection Points",
    icon: <MapIcon size={18} />,
    path: "/resident/collection-points"
  }, {
    label: "Make a Report",
    icon: <AlertCircleIcon size={18} />,
    path: "/resident/reports"
  }, {
    label: "Educational Resources",
    icon: <BookOpenIcon size={18} />,
    path: "/resident/education"
  }, {
    label: "Profile",
    icon: <UserIcon size={18} />,
    path: "/resident/profile"
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
            <Route path="/" element={<ResidentHome user={user} />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/collection-points" element={<CollectionPoints />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/education" element={<Education />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </main>
      </div>
    </div>;
};
export default ResidentDashboard;