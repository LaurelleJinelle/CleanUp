import React, { useState } from "react";
import { UserIcon, MailIcon, MapPinIcon, SaveIcon, BellIcon } from "lucide-react";
import { toast } from "sonner";
const Profile = ({
  user: initialUser
}) => {
  const [user, setUser] = useState({
    ...initialUser,
    phone: "555-123-4567",
    notificationPreferences: {
      email: true,
      sms: false,
      app: true
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...user
  });
  const [saving, setSaving] = useState(false);
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleNotificationChange = type => {
    setFormData({
      ...formData,
      notificationPreferences: {
        ...formData.notificationPreferences,
        [type]: !formData.notificationPreferences[type]
      }
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setUser(formData);
      setIsEditing(false);
      setSaving(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };
  const handleCancel = () => {
    setFormData({
      ...user
    });
    setIsEditing(false);
  };
  return <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
        <p className="text-gray-600">
          Manage your personal information and preferences.
        </p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <UserIcon className="h-8 w-8" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium text-gray-900">
                  {user.name}
                </h3>
                <p className="text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
            {!isEditing && <button onClick={() => setIsEditing(true)} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Edit Profile
              </button>}
          </div>
          <div className="border-t border-gray-200 pt-6">
            {isEditing ? <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MailIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPinIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-800 mb-3 flex items-center">
                      <BellIcon className="h-5 w-5 text-blue-600 mr-2" />
                      Notification Preferences
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input id="email-notifications" name="email-notifications" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked={formData.notificationPreferences.email} onChange={() => handleNotificationChange("email")} />
                        <label htmlFor="email-notifications" className="ml-3 text-sm text-gray-700">
                          Email notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input id="sms-notifications" name="sms-notifications" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked={formData.notificationPreferences.sms} onChange={() => handleNotificationChange("sms")} />
                        <label htmlFor="sms-notifications" className="ml-3 text-sm text-gray-700">
                          SMS notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input id="app-notifications" name="app-notifications" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked={formData.notificationPreferences.app} onChange={() => handleNotificationChange("app")} />
                        <label htmlFor="app-notifications" className="ml-3 text-sm text-gray-700">
                          In-app notifications
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end space-x-3">
                  <button type="button" onClick={handleCancel} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                    {saving ? "Saving..." : <>
                        <SaveIcon className="h-4 w-4 mr-2" />
                        Save Changes
                      </>}
                  </button>
                </div>
              </form> : <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ProfileField icon={<UserIcon className="h-5 w-5 text-gray-400" />} label="Full Name" value={user.name} />
                  <ProfileField icon={<MailIcon className="h-5 w-5 text-gray-400" />} label="Email Address" value={user.email} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ProfileField label="Phone Number" value={user.phone || "Not provided"} />
                  <ProfileField icon={<MapPinIcon className="h-5 w-5 text-gray-400" />} label="Address" value={user.location} />
                </div>
                <div>
                  <h4 className="text-base font-medium text-gray-800 mb-3 flex items-center">
                    <BellIcon className="h-5 w-5 text-blue-600 mr-2" />
                    Notification Preferences
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center">
                      <span className={`h-2 w-2 rounded-full mr-2 ${user.notificationPreferences.email ? "bg-green-500" : "bg-gray-300"}`}></span>
                      Email notifications:{" "}
                      {user.notificationPreferences.email ? "Enabled" : "Disabled"}
                    </li>
                    <li className="flex items-center">
                      <span className={`h-2 w-2 rounded-full mr-2 ${user.notificationPreferences.sms ? "bg-green-500" : "bg-gray-300"}`}></span>
                      SMS notifications:{" "}
                      {user.notificationPreferences.sms ? "Enabled" : "Disabled"}
                    </li>
                    <li className="flex items-center">
                      <span className={`h-2 w-2 rounded-full mr-2 ${user.notificationPreferences.app ? "bg-green-500" : "bg-gray-300"}`}></span>
                      In-app notifications:{" "}
                      {user.notificationPreferences.app ? "Enabled" : "Disabled"}
                    </li>
                  </ul>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
const ProfileField = ({
  icon,
  label,
  value
}) => <div>
    <h4 className="text-sm font-medium text-gray-500">{label}</h4>
    <div className="mt-1 flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      <span className="text-base text-gray-900">{value}</span>
    </div>
  </div>;
export default Profile;