import React from "react";
import { AlertCircleIcon } from "lucide-react";
const Reports = () => {
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Reports Management</h2>
        <p className="text-gray-600">View and manage resident reports.</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-500">This feature is under development.</p>
          </div>
        </div>
      </div>
    </div>;
};
export default Reports;