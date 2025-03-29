import React from "react";
import { UserIcon } from "lucide-react";
const Profile = ({
  user
}) => {
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Official Profile</h2>
        <p className="text-gray-600">Manage your account settings.</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex items-center mb-6">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <UserIcon className="h-8 w-8" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-medium text-gray-900">{user.displayName}</h3>
            <p className="text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </div>;
};
export default Profile;