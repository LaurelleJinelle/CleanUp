import { useState } from "react";
import { BellIcon, MenuIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
const Navbar = ({
  user,
  title,
  onMobileMenuClick,
  isMobileMenuOpen
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([{
    id: 1,
    text: "New waste collection schedule posted",
    time: "2 hours ago",
    unread: true
  }, {
    id: 2,
    text: "Your report has been addressed",
    time: "1 day ago",
    unread: false
  }, {
    id: 3,
    text: "Reminder: Recycling day tomorrow",
    time: "2 days ago",
    unread: false
  }]);
  const unreadCount = notifications.filter(n => n.unread).length;
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (unreadCount > 0) {
      setNotifications(notifications.map(n => ({
        ...n,
        unread: false
      })));
    }
  };
  return <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button type="button" className="lg:hidden -ml-2 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100" onClick={onMobileMenuClick}>
              {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
            <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <button type="button" className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 relative" onClick={handleNotificationClick}>
                <BellIcon className="h-6 w-6" />
                {unreadCount > 0 && <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white" />}
              </button>
              {showNotifications && <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-900">
                        Notifications
                      </h3>
                    </div>
                    {notifications.length > 0 ? <div className="max-h-60 overflow-y-auto">
                        {notifications.map(notification => <div key={notification.id} className={`px-4 py-3 hover:bg-gray-50 ${notification.unread ? "bg-blue-50" : ""}`} onClick={() => {
                    toast.info(notification.text);
                    setShowNotifications(false);
                  }}>
                            <p className="text-sm text-gray-800">
                              {notification.text}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>)}
                      </div> : <div className="px-4 py-6 text-center text-sm text-gray-500">
                        No notifications
                      </div>}
                    <div className="border-t border-gray-100 px-4 py-2 text-center">
                      <button className="text-xs text-blue-600 hover:text-blue-500">
                        Mark all as read
                      </button>
                    </div>
                  </div>
                </div>}
            </div>
            <div className="ml-3 relative">
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-gray-800">
                    {user.displayName}
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {user.role}
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {user.displayName?.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Navbar;