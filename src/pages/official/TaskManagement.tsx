import React, { useState } from "react";
import { ClipboardListIcon, PlusIcon, MapPinIcon, CalendarIcon, ClockIcon, UserIcon, TruckIcon } from "lucide-react";
import { toast } from "sonner";
const TaskManagement = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    area: "",
    address: "",
    type: "general",
    date: "",
    time: "",
    worker: "",
    vehicle: ""
  });
  const taskTypes = [{
    id: "general",
    name: "General Waste"
  }, {
    id: "recycling",
    name: "Recycling"
  }, {
    id: "green",
    name: "Green Waste"
  }, {
    id: "hazardous",
    name: "Hazardous Waste"
  }];
  const workers = [{
    id: 1,
    name: "John Smith",
    vehicleId: "WM-2023-101",
    status: "active"
  }, {
    id: 2,
    name: "Maria Rodriguez",
    vehicleId: "WM-2023-102",
    status: "active"
  }, {
    id: 3,
    name: "David Chen",
    vehicleId: "WM-2023-103",
    status: "active"
  }, {
    id: 4,
    name: "Sarah Johnson",
    vehicleId: "WM-2023-104",
    status: "active"
  }];
  const tasks = [{
    id: 1,
    area: "Central District",
    address: "100-200 Main Street",
    type: "General Waste",
    status: "In Progress",
    date: "2023-10-11",
    time: "8:00 AM - 10:00 AM",
    worker: "John Smith",
    vehicle: "WM-2023-101"
  }, {
    id: 2,
    area: "Westside Residential",
    address: "West Avenue, Blocks 10-15",
    type: "Recycling",
    status: "Pending",
    date: "2023-10-11",
    time: "10:30 AM - 12:30 PM",
    worker: "Maria Rodriguez",
    vehicle: "WM-2023-102"
  }, {
    id: 3,
    area: "Downtown Commercial",
    address: "Business District, 5th Avenue",
    type: "General Waste",
    status: "Pending",
    date: "2023-10-11",
    time: "1:00 PM - 3:00 PM",
    worker: "David Chen",
    vehicle: "WM-2023-103"
  }, {
    id: 6,
    area: "South Park Area",
    address: "South Park Residential Complex",
    type: "Green Waste",
    status: "Scheduled",
    date: "2023-10-12",
    time: "8:00 AM - 10:00 AM",
    worker: "Sarah Johnson",
    vehicle: "WM-2023-104"
  }];
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setNewTask({
      ...newTask,
      [name]: value
    });
  };
  const handleAddTask = e => {
    e.preventDefault();
    toast.success(`Task added successfully!`);
    setNewTask({
      area: "",
      address: "",
      type: "general",
      date: "",
      time: "",
      worker: "",
      vehicle: ""
    });
    setShowAddTask(false);
  };
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
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Task Management</h2>
        <p className="text-gray-600">
          Assign and manage waste collection tasks.
        </p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ClipboardListIcon className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">
                Task Assignment
              </h3>
            </div>
            <button onClick={() => setShowAddTask(true)} className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <PlusIcon className="h-4 w-4 mr-1" />
              Assign New Task
            </button>
          </div>
        </div>
        {showAddTask && <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h4 className="text-base font-medium text-gray-800 mb-4">
              Assign New Task
            </h4>
            <form onSubmit={handleAddTask} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                  Area Name
                </label>
                <input type="text" id="area" name="area" value={newTask.area} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Central District" required />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address/Location
                </label>
                <input type="text" id="address" name="address" value={newTask.address} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 100-200 Main Street" required />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Waste Type
                </label>
                <select id="type" name="type" value={newTask.type} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                  {taskTypes.map(type => <option key={type.id} value={type.id}>
                      {type.name}
                    </option>)}
                </select>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Collection Date
                </label>
                <input type="date" id="date" name="date" value={newTask.date} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Time Slot
                </label>
                <input type="text" id="time" name="time" value={newTask.time} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 8:00 AM - 10:00 AM" required />
              </div>
              <div>
                <label htmlFor="worker" className="block text-sm font-medium text-gray-700 mb-1">
                  Assign Worker
                </label>
                <select id="worker" name="worker" value={newTask.worker} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                  <option value="">Select a worker</option>
                  {workers.filter(w => w.status === "active").map(worker => <option key={worker.id} value={worker.id}>
                        {worker.name}
                      </option>)}
                </select>
              </div>
              <div className="sm:col-span-2 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowAddTask(false)} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Assign Task
                </button>
              </div>
            </form>
          </div>}
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
                  Assigned To
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
              {tasks.map(task => <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {task.type}
                    </div>
                    <div className="text-sm text-gray-500">Task #{task.id}</div>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                      {new Date(task.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                      {task.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 text-gray-400 mr-1" />
                      <div className="text-sm text-gray-900">{task.worker}</div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <TruckIcon className="h-4 w-4 text-gray-400 mr-1" />
                      {task.vehicle}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      Edit
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
export default TaskManagement;