import React from "react";
import { Link } from "react-router-dom";
import { UsersIcon, ClipboardListIcon, AlertCircleIcon, TruckIcon, BarChart2Icon, ArrowRightIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
const OfficialHome = ({
  user
}) => {
  const stats = [{
    id: 1,
    name: "Active Workers",
    value: "24",
    icon: <UsersIcon className="h-6 w-6 text-blue-500" />
  }, {
    id: 2,
    name: "Tasks Today",
    value: "56",
    icon: <ClipboardListIcon className="h-6 w-6 text-blue-500" />
  }, {
    id: 3,
    name: "Open Reports",
    value: "8",
    icon: <AlertCircleIcon className="h-6 w-6 text-blue-500" />
  }, {
    id: 4,
    name: "Active Vehicles",
    value: "18",
    icon: <TruckIcon className="h-6 w-6 text-blue-500" />
  }];
  const recentReports = [{
    id: 1,
    type: "Missed Collection",
    location: "Central District",
    status: "Pending",
    date: "10 minutes ago",
    priority: "High"
  }, {
    id: 2,
    type: "Illegal Dumping",
    location: "North Park",
    status: "In Progress",
    date: "1 hour ago",
    priority: "Medium"
  }, {
    id: 3,
    type: "Damaged Bin",
    location: "Westside Residential",
    status: "Resolved",
    date: "3 hours ago",
    priority: "Low"
  }];
  const workerPerformance = [{
    id: 1,
    name: "John Smith",
    tasksCompleted: 8,
    efficiency: 95
  }, {
    id: 2,
    name: "Maria Rodriguez",
    tasksCompleted: 7,
    efficiency: 92
  }, {
    id: 3,
    name: "David Chen",
    tasksCompleted: 6,
    efficiency: 88
  }, {
    id: 4,
    name: "Sarah Johnson",
    tasksCompleted: 9,
    efficiency: 97
  }];
  const getStatusColor = status => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getPriorityColor = priority => {
    switch (priority) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome, {user.name}
        </h2>
        <p className="text-gray-600">
          Here's an overview of your waste management operations.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => <div key={stat.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">{stat.icon}</div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-500">{stat.name}</p>
              </div>
            </div>
          </div>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircleIcon className="h-6 w-6 text-blue-500" />
                <h3 className="ml-2 text-lg font-medium text-gray-800">
                  Recent Reports
                </h3>
              </div>
              <Link to="/official/reports" className="text-sm text-blue-600 font-medium hover:text-blue-500">
                View all
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentReports.map(report => <div key={report.id} className="px-6 py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium text-gray-800">
                        {report.type}
                      </h4>
                      <span className={`ml-2 text-xs px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {report.location}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Reported {report.date}
                    </p>
                  </div>
                  <div className={`text-sm font-medium ${getPriorityColor(report.priority)}`}>
                    {report.priority} Priority
                  </div>
                </div>
              </div>)}
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <Link to="/official/reports" className="text-sm text-blue-600 font-medium hover:text-blue-500 flex items-center">
              View all reports
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart2Icon className="h-6 w-6 text-blue-500" />
                <h3 className="ml-2 text-lg font-medium text-gray-800">
                  Worker Performance
                </h3>
              </div>
              <Link to="/official/workers" className="text-sm text-blue-600 font-medium hover:text-blue-500">
                View all
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {workerPerformance.map(worker => <div key={worker.id} className="px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{worker.name}</h4>
                  <span className="text-sm font-medium text-gray-600">
                    {worker.tasksCompleted} tasks today
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{
                  width: `${worker.efficiency}%`
                }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-800 w-12 text-right">
                    {worker.efficiency}%
                  </span>
                </div>
              </div>)}
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <Link to="/official/workers" className="text-sm text-blue-600 font-medium hover:text-blue-500 flex items-center">
              View all workers
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center">
              <ClipboardListIcon className="h-6 w-6 text-blue-500" />
              <h3 className="ml-2 text-lg font-medium text-gray-800">
                Task Completion
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-3xl font-bold text-gray-900">42/56</div>
                <div className="text-sm text-gray-500">
                  Tasks completed today
                </div>
              </div>
              <div className="h-24 w-24 rounded-full border-8 border-blue-100 flex items-center justify-center">
                <span className="text-xl font-bold text-blue-600">75%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <div>
                  <div className="text-sm font-medium text-gray-900">42</div>
                  <div className="text-xs text-gray-500">Completed</div>
                </div>
              </div>
              <div className="flex items-center">
                <XCircleIcon className="h-5 w-5 text-yellow-500 mr-2" />
                <div>
                  <div className="text-sm font-medium text-gray-900">14</div>
                  <div className="text-xs text-gray-500">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center">
              <TruckIcon className="h-6 w-6 text-blue-500" />
              <h3 className="ml-2 text-lg font-medium text-gray-800">
                Fleet Status
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Active Vehicles
                </h4>
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-gray-900 mr-2">
                    18/24
                  </div>
                  <div className="text-sm text-green-600">75%</div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Maintenance
                </h4>
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-gray-900 mr-2">4</div>
                  <div className="text-sm text-yellow-600">17%</div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Fuel Usage
                </h4>
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-gray-900 mr-2">
                    68%
                  </div>
                  <div className="text-sm text-blue-600">Avg</div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Avg. Load
                </h4>
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-gray-900 mr-2">
                    72%
                  </div>
                  <div className="text-sm text-blue-600">Capacity</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default OfficialHome;