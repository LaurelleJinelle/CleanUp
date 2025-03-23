import React from "react";
import { Link } from "react-router-dom";
import { CheckSquareIcon, MapIcon, ClockIcon, TruckIcon, ArrowRightIcon, AwardIcon } from "lucide-react";
const WorkerHome = ({
  user
}) => {
  const todayTasks = [{
    id: 1,
    area: "Central District",
    type: "General Waste",
    status: "In Progress",
    time: "8:00 AM - 10:00 AM",
    progress: 65
  }, {
    id: 2,
    area: "Westside Residential",
    type: "Recycling",
    status: "Pending",
    time: "10:30 AM - 12:30 PM",
    progress: 0
  }, {
    id: 3,
    area: "Downtown Commercial",
    type: "General Waste",
    status: "Pending",
    time: "1:00 PM - 3:00 PM",
    progress: 0
  }];
  const recentCompletions = [{
    id: 101,
    area: "Eastside Residential",
    type: "Recycling",
    date: "Yesterday",
    time: "Completed in 2h 15m"
  }, {
    id: 102,
    area: "North District",
    type: "General Waste",
    date: "Oct 9, 2023",
    time: "Completed in 1h 55m"
  }];
  const getStatusColor = status => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome back, {user.name}!
        </h2>
        <p className="text-gray-600">
          Here's your waste collection schedule for today.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckSquareIcon className="h-6 w-6 text-blue-500" />
                  <h3 className="ml-2 text-lg font-medium text-gray-800">
                    Today's Tasks
                  </h3>
                </div>
                <span className="text-sm font-medium text-gray-500">
                  {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric"
                })}
                </span>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {todayTasks.map(task => <div key={task.id} className="px-6 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-800">{task.area}</h4>
                      <p className="text-sm text-gray-600">
                        {task.type} • {task.time}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                  {task.status === "In Progress" && <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{
                  width: `${task.progress}%`
                }}></div>
                    </div>}
                </div>)}
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <Link to="/worker/tasks" className="text-sm text-blue-600 font-medium hover:text-blue-500 flex items-center">
                View all tasks
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-center">
                <ClockIcon className="h-6 w-6 text-blue-500" />
                <h3 className="ml-2 text-lg font-medium text-gray-800">
                  Recent Completions
                </h3>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {recentCompletions.map(task => <div key={task.id} className="px-6 py-4">
                  <h4 className="font-medium text-gray-800">{task.area}</h4>
                  <p className="text-sm text-gray-600">{task.type}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{task.date}</span>
                    <span className="text-xs text-green-600">{task.time}</span>
                  </div>
                </div>)}
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <AwardIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Performance Stats</h3>
                <p className="text-sm text-gray-600">This month</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-medium text-gray-800">42/45</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-blue-600 h-2 rounded-full" style={{
                  width: "93%"
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">On-time Rate</span>
                  <span className="font-medium text-gray-800">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-blue-600 h-2 rounded-full" style={{
                  width: "98%"
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Efficiency Score</span>
                  <span className="font-medium text-gray-800">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-blue-600 h-2 rounded-full" style={{
                  width: "95%"
                }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center">
              <MapIcon className="h-6 w-6 text-blue-500" />
              <h3 className="ml-2 text-lg font-medium text-gray-800">
                Today's Route
              </h3>
            </div>
          </div>
          <div className="p-4 h-64">
            <div className="bg-gray-100 h-full w-full rounded-lg flex items-center justify-center">
              <Link to="/worker/routes" className="text-blue-600 font-medium hover:text-blue-500 flex items-center">
                View route map
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center">
              <TruckIcon className="h-6 w-6 text-blue-500" />
              <h3 className="ml-2 text-lg font-medium text-gray-800">
                Vehicle Status
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Vehicle ID
                </h4>
                <p className="font-medium text-gray-800">WM-2023-105</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Status
                </h4>
                <p className="font-medium text-green-600">Operational</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Fuel Level
                </h4>
                <p className="font-medium text-gray-800">78%</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Load Capacity
                </h4>
                <p className="font-medium text-gray-800">45% Full</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default WorkerHome;