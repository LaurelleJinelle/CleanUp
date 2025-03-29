import { Link, useLocation } from "react-router-dom";
import { RecycleIcon } from "lucide-react";
const Sidebar = ({
  items,
  user,
  onLogout
}) => {
  const location = useLocation();
  return <div className="w-64 bg-blue-700 text-white h-screen flex flex-col">
      <div className="p-4 border-b border-blue-600">
        <Link to="/" className="flex items-center space-x-2">
          <RecycleIcon className="h-8 w-8 text-white" />
          <h1 className="text-xl font-bold">CleanUp</h1>
        </Link>
      </div>
      <div className="p-4 border-b border-blue-600">
        <div className="text-sm opacity-75">Logged in as</div>
        <div className="font-semibold">{user.displayName}</div>
        <div className="text-sm opacity-75 capitalize">{user.role}</div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {items.map((item, index) => <li key={index}>
              <Link to={item.path} className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${location.pathname === item.path ? "bg-blue-800 text-white" : "text-blue-100 hover:bg-blue-600"}`}>
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>)}
        </ul>
      </nav>
      <div className="p-4 border-t border-blue-600">
        <button onClick={onLogout} className="w-full text-left px-4 py-2 text-blue-100 hover:bg-blue-600 rounded-md transition-colors">
          Log out
        </button>
      </div>
    </div>;
};
export default Sidebar;