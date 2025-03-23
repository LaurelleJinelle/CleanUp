import React, { useState } from "react";
import { UsersIcon, PlusIcon, SearchIcon, FilterIcon, XIcon, EditIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
const Workers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [newWorker, setNewWorker] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleId: "",
    status: "active"
  });
  const workers = [{
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    vehicleId: "WM-2023-101",
    status: "active",
    tasksToday: 8,
    efficiency: 95
  }, {
    id: 2,
    name: "Maria Rodriguez",
    email: "maria.rodriguez@example.com",
    phone: "555-234-5678",
    vehicleId: "WM-2023-102",
    status: "active",
    tasksToday: 7,
    efficiency: 92
  }, {
    id: 3,
    name: "David Chen",
    email: "david.chen@example.com",
    phone: "555-345-6789",
    vehicleId: "WM-2023-103",
    status: "active",
    tasksToday: 6,
    efficiency: 88
  }, {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "555-456-7890",
    vehicleId: "WM-2023-104",
    status: "active",
    tasksToday: 9,
    efficiency: 97
  }, {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "555-567-8901",
    vehicleId: "WM-2023-105",
    status: "inactive",
    tasksToday: 0,
    efficiency: 0
  }, {
    id: 6,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "555-678-9012",
    vehicleId: "WM-2023-106",
    status: "on-leave",
    tasksToday: 0,
    efficiency: 0
  }];
  const filteredWorkers = workers.filter(worker => {
    // Filter by status
    if (filterStatus !== "all" && worker.status !== filterStatus) {
      return false;
    }
    // Filter by search query
    if (searchQuery && !worker.name.toLowerCase().includes(searchQuery.toLowerCase()) && !worker.email.toLowerCase().includes(searchQuery.toLowerCase()) && !worker.vehicleId.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });
  const getStatusColor = status => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "on-leave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setNewWorker({
      ...newWorker,
      [name]: value
    });
  };
  const handleAddWorker = e => {
    e.preventDefault();
    // Simulate API call
    toast.success(`Worker ${newWorker.name} added successfully!`);
    setNewWorker({
      name: "",
      email: "",
      phone: "",
      vehicleId: "",
      status: "active"
    });
    setShowAddWorker(false);
  };
  const handleDeleteWorker = workerId => {
    // Simulate API call
    toast.success("Worker removed successfully!");
  };
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Workers Management</h2>
        <p className="text-gray-600">
          View and manage waste collection workers.
        </p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center">
              <UsersIcon className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">
                Workers List
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" className="pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Search workers..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <div className="relative">
                <div className="flex items-center">
                  <FilterIcon className="h-4 w-4 text-gray-500 mr-1" />
                  <select className="pl-2 pr-8 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option value="all">All Workers</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on-leave">On Leave</option>
                  </select>
                </div>
              </div>
              <button onClick={() => setShowAddWorker(true)} className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Worker
              </button>
            </div>
          </div>
        </div>
        {showAddWorker && <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h4 className="text-base font-medium text-gray-800 mb-4">
              Add New Worker
            </h4>
            <form onSubmit={handleAddWorker} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input type="text" id="name" name="name" value={newWorker.name} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input type="email" id="email" name="email" value={newWorker.email} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input type="tel" id="phone" name="phone" value={newWorker.phone} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="vehicleId" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle ID
                </label>
                <input type="text" id="vehicleId" name="vehicleId" value={newWorker.vehicleId} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select id="status" name="status" value={newWorker.status} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on-leave">On Leave</option>
                </select>
              </div>
              <div className="sm:col-span-2 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowAddWorker(false)} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Add Worker
                </button>
              </div>
            </form>
          </div>}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Worker
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWorkers.length > 0 ? filteredWorkers.map(worker => <tr key={worker.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                          <span className="font-medium">
                            {worker.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {worker.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {worker.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {worker.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {worker.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {worker.vehicleId || "Not assigned"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(worker.status)}`}>
                        {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {worker.status === "active" ? <div>
                          <div className="text-sm text-gray-900">
                            {worker.tasksToday} tasks today
                          </div>
                          <div className="flex items-center mt-1">
                            <div className="w-24 bg-gray-200 rounded-full h-1.5 mr-2">
                              <div className="bg-blue-600 h-1.5 rounded-full" style={{
                        width: `${worker.efficiency}%`
                      }}></div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {worker.efficiency}%
                            </span>
                          </div>
                        </div> : <div className="text-sm text-gray-500">
                          Not available
                        </div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <EditIcon className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteWorker(worker.id)}>
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>) : <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No workers found matching your criteria.
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
export default Workers;