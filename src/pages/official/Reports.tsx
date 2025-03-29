import { useEffect, useState } from "react";
import { AlertCircleIcon } from "lucide-react";
import { db, collection, getDocs, updateDoc, doc } from "../../firebase-config";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reports"));
        const reportsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(reportsData);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleEdit = (report) => {
    setEditingId(report.id);
    setEditedData({ ...report });
  };

  const handleSave = async (id) => {
    try {
      const reportRef = doc(db, "reports", id);
      await updateDoc(reportRef, editedData);
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...editedData } : r))
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedData({});
  };

  const handleChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Reports Management</h2>
        <p className="text-gray-600">View and manage resident reports.</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Reports Available
              </h3>
              <p className="text-gray-500">No reports have been submitted yet.</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-gray-600 font-semibold">Type</th>
                  <th className="py-3 px-4 text-gray-600 font-semibold">Location</th>
                  <th className="py-3 px-4 text-gray-600 font-semibold">Description</th>
                  <th className="py-3 px-4 text-gray-600 font-semibold">Priority</th>
                  <th className="py-3 px-4 text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-100">
                    {editingId === report.id ? (
                      <>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={editedData.type}
                            onChange={(e) => handleChange(e, "type")}
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={editedData.location}
                            onChange={(e) => handleChange(e, "location")}
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={editedData.description}
                            onChange={(e) => handleChange(e, "description")}
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={editedData.priority}
                            onChange={(e) => handleChange(e, "priority")}
                            className="border rounded px-2 py-1 w-full"
                          >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 flex space-x-2">
                          <button
                            onClick={() => handleSave(report.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="bg-gray-500 text-white px-3 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-4">{report.type}</td>
                        <td className="py-3 px-4">{report.location}</td>
                        <td className="py-3 px-4">{report.description}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-white ${
                              report.priority === "High"
                                ? "bg-red-500"
                                : report.priority === "Medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                          >
                            {report.priority}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleEdit(report)}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
