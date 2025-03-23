import React, { useState } from "react";
import { CheckSquareIcon, FilterIcon, CheckIcon, XIcon, ClockIcon, MapPinIcon, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
const Tasks = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const tasks = [{
    id: 1,
    area: "Central District",
    address: "100-200 Main Street",
    type: "General Waste",
    status: "In Progress",
    date: new Date(),
    time: "8:00 AM - 10:00 AM",
    progress: 65
  }, {
    id: 2,
    area: "Westside Residential",
    address: "West Avenue, Blocks 10-15",
    type: "Recycling",
    status: "Pending",
    date: new Date(),
    time: "10:30 AM - 12:30 PM",
    progress: 0
  }, {
    id: 3,
    area: "Downtown Commercial",
    address: "Business District, 5th Avenue",
    type: "General Waste",
    status: "Pending",
    date: new Date(),
    time: "1:00 PM - 3:00 PM",
    progress: 0
  }, {
    id: 4,
    area: "Eastside Residential",
    address: "East Boulevard, Zones A-C",
    type: "Recycling",
    status: "Completed",
    date: new Date(Date.now() - 86400000),
    time: "9:00 AM - 11:00 AM",
    progress: 100
  }, {
    id: 5,
    area: "North District",
    address: "North Street, Areas 1-3",
    type: "General Waste",
    status: "Completed",
    date: new Date(Date.now() - 86400000),
    time: "1:00 PM - 3:00 PM",
    progress: 100
  }, {
    id: 6,
    area: "South Park Area",
    address: "South Park Residential Complex",
    type: "Green Waste",
    status: "Scheduled",
    date: new Date(Date.now() + 86400000),
    time: "8:00 AM - 10:00 AM",
    progress: 0
  }];
  const filteredTasks = tasks.filter(task => {
    // Filter by status
    if (filter !== "all" && task.status.toLowerCase() !== filter) {
      return false;
    }
    // Filter by search query
    if (searchQuery && !task.area.toLowerCase().includes(searchQuery.toLowerCase()) && !task.type.toLowerCase().includes(searchQuery.toLowerCase()) && !task.address.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });
  const getStatusColor = status => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const formatDate = date => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    }
  };
  const updateTaskStatus = (taskId, newStatus) => {
    // In a real app, this would call an API
    toast.success(`Task status updated to ${newStatus}`);
  };
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
        <p className="text-gray-600">
          View and manage your waste collection tasks.
        </p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-2">
              <CheckSquareIcon className="h-6 w-6 text-blue-500" />
              <h3 className="text-lg font-medium text-gray-800">
                Collection Tasks
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <input type="text" className="pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Search tasks..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                {searchQuery && <button className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setSearchQuery("")}>
                    <XIcon className="h-4 w-4 text-gray-400" />
                  </button>}
              </div>
              <div className="relative">
                <div className="flex items-center">
                  <FilterIcon className="h-4 w-4 text-gray-500 mr-1" />
                  <select className="pl-2 pr-8 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={filter} onChange={e => setFilter(e.target.value)}>
                    <option value="all">All Tasks</option>
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.length > 0 ? filteredTasks.map(task => <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {task.type}
                          </div>
                          <div className="text-sm text-gray-500">
                            Task #{task.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="ml-2">
                          <div className="text-sm font-medium text-gray-900">
                            {task.area}
                          </div>
                          <div className="text-sm text-gray-500">
                            {task.address}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <div>
                          <div className="flex items-center text-sm text-gray-900">
                            <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                            {formatDate(task.date)}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                            {task.time}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      {task.status === "In Progress" && <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 max-w-[100px]">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{
                    width: `${task.progress}%`
                  }}></div>
                        </div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {task.status === "Pending" && <button onClick={() => updateTaskStatus(task.id, "In Progress")} className="text-blue-600 hover:text-blue-900 mr-3">
                          Start
                        </button>}
                      {task.status === "In Progress" && <button onClick={() => updateTaskStatus(task.id, "Completed")} className="text-green-600 hover:text-green-900 mr-3">
                          Complete
                        </button>}
                      <button className="text-gray-600 hover:text-gray-900">
                        Details
                      </button>
                    </td>
                  </tr>) : <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    No tasks found matching your criteria.
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <CheckIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-blue-800">
              Task Completion Tips
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc space-y-1 pl-5">
                <li>Always verify the correct waste type before collection</li>
                <li>Report any hazardous materials through the app</li>
                <li>Take photos of any issues encountered during collection</li>
                <li>
                  Complete your tasks in the suggested order for optimal route
                  efficiency
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Tasks;