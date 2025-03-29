import { useState } from "react";
import { AlertCircleIcon, MapPinIcon, CameraIcon, SendIcon } from "lucide-react";
import { toast } from "sonner";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, collection, addDoc } from "../../firebase-config";

const Reports = () => {
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    description: "",
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const reportTypes = [{
    id: "missed",
    label: "Missed Collection"
  }, {
    id: "illegal",
    label: "Illegal Dumping"
  }, {
    id: "damaged",
    label: "Damaged Bin/Container"
  }, {
    id: "other",
    label: "Other Issue"
  }];
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
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const storage = getStorage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    try {
      let imageUrl = null;
  
      if (formData.image) {
        const storageRef = ref(storage, `reports/${Date.now()}_${formData.image.name}`);
        await uploadBytes(storageRef, formData.image);
        imageUrl = await getDownloadURL(storageRef);
      }
  
      const reportData = {
        type: formData.type,
        location: formData.location,
        description: formData.description,
        imageUrl: imageUrl || null,
        timestamp: new Date(),
      };
  
      await addDoc(collection(db, "reports"), reportData);
      
      setFormData({ type: "", location: "", description: "", image: null });
      setPreview(null);
      toast.success("Your report has been submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit report. Please try again.");
      console.error("Error submitting report:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const recentReports = [{
    id: 1,
    type: "Missed Collection",
    status: "In Progress",
    date: "2023-10-05",
    description: "My recycling bin was not emptied during the scheduled collection."
  }, {
    id: 2,
    type: "Damaged Bin",
    status: "Resolved",
    date: "2023-09-28",
    description: "The lid of my waste bin is broken and needs replacement."
  }];
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Make a Report</h2>
        <p className="text-gray-600">
          Report issues with waste collection or disposal in your area.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              New Report
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {reportTypes.map(type => <div key={type.id}>
                      <input type="radio" id={type.id} name="type" value={type.id} className="sr-only" checked={formData.type === type.id} onChange={handleChange} required />
                      <label htmlFor={type.id} className={`block w-full py-3 px-4 text-center border rounded-md cursor-pointer text-sm ${formData.type === type.id ? "bg-blue-50 border-blue-200 text-blue-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
                        {type.label}
                      </label>
                    </div>)}
                </div>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address or description of location" required />
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Please describe the issue in detail" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo (optional)
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center justify-center h-32 w-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400">
                    <input type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                    {preview ? <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-md" /> : <div className="text-center">
                        <CameraIcon className="h-8 w-8 text-gray-400 mx-auto" />
                        <span className="mt-1 block text-xs text-gray-500">
                          Upload photo
                        </span>
                      </div>}
                  </label>
                  {preview && <button type="button" className="text-sm text-red-600 hover:text-red-500" onClick={() => {
                  setFormData({
                    ...formData,
                    image: null
                  });
                  setPreview(null);
                }}>
                      Remove
                    </button>}
                </div>
              </div>
              <div>
                <button type="submit" disabled={submitting} className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                  {submitting ? "Submitting..." : <>
                      <SendIcon className="h-4 w-4 mr-2" />
                      Submit Report
                    </>}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Recent Reports
            </h3>
            <div className="space-y-4">
              {recentReports.length > 0 ? recentReports.map(report => <div key={report.id} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-800">
                        {report.type}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${report.status === "Resolved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {report.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Submitted on {report.date}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {report.description}
                    </p>
                  </div>) : <div className="text-center py-6">
                  <AlertCircleIcon className="h-8 w-8 text-gray-400 mx-auto" />
                  <p className="text-gray-500 mt-2">No reports submitted yet</p>
                </div>}
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertCircleIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-800">
                  Need immediate assistance?
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  For urgent issues, please call our hotline at (555) 123-4567.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Reports;