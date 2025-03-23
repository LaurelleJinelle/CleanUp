import React, { useEffect, useState, useRef } from "react";
import { MapPinIcon, SearchIcon, InfoIcon } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const CollectionPoints = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const collectionPoints = [{
    id: 1,
    name: "Central Park Collection Point",
    type: "General Waste & Recycling",
    address: "123 Park Avenue, City Center",
    hours: "Mon-Sat: 8:00 AM - 6:00 PM",
    position: [40.785091, -73.968285]
  }, {
    id: 2,
    name: "Downtown Recycling Center",
    type: "Recycling Only",
    address: "456 Main Street, Downtown",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM",
    position: [40.775091, -73.978285]
  }, {
    id: 3,
    name: "Westside Transfer Station",
    type: "General Waste, Recycling & Hazardous",
    address: "789 West Road, Westside",
    hours: "Mon-Sun: 7:00 AM - 7:00 PM",
    position: [40.795091, -74.008285]
  }, {
    id: 4,
    name: "Eastside Drop-off Center",
    type: "General Waste & Green Waste",
    address: "321 East Boulevard, Eastside",
    hours: "Tue-Sat: 8:00 AM - 4:00 PM",
    position: [40.765091, -73.948285]
  }];
  const filteredPoints = searchQuery ? collectionPoints.filter(point => point.name.toLowerCase().includes(searchQuery.toLowerCase()) || point.type.toLowerCase().includes(searchQuery.toLowerCase()) || point.address.toLowerCase().includes(searchQuery.toLowerCase())) : collectionPoints;
  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      // Initialize the map
      mapRef.current = L.map(mapContainerRef.current).setView([40.785091, -73.968285], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
      // Add markers for each collection point
      collectionPoints.forEach(point => {
        const marker = L.marker(point.position).addTo(mapRef.current).bindPopup(point.name);
        marker.on("click", () => {
          setSelectedPoint(point);
        });
      });
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);
  const handlePointClick = point => {
    setSelectedPoint(point);
    if (mapRef.current) {
      mapRef.current.setView(point.position, 15);
      // Find and open the popup for this point
      mapRef.current.eachLayer(layer => {
        if (layer instanceof L.Marker && layer.getLatLng().lat === point.position[0] && layer.getLatLng().lng === point.position[1]) {
          layer.openPopup();
        }
      });
    }
  };
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Collection Points</h2>
        <p className="text-gray-600">Find waste collection points near you.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Search collection points..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredPoints.map(point => <div key={point.id} className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedPoint?.id === point.id ? "bg-blue-100 border border-blue-200" : "hover:bg-gray-50 border border-gray-100"}`} onClick={() => handlePointClick(point)}>
                  <div className="flex items-start">
                    <MapPinIcon className={`h-5 w-5 mt-0.5 ${selectedPoint?.id === point.id ? "text-blue-600" : "text-gray-400"}`} />
                    <div className="ml-2">
                      <h3 className="font-medium text-gray-900">
                        {point.name}
                      </h3>
                      <p className="text-sm text-gray-600">{point.type}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {point.address}
                      </p>
                    </div>
                  </div>
                </div>)}
              {filteredPoints.length === 0 && <div className="text-center py-6">
                  <p className="text-gray-500">No collection points found.</p>
                </div>}
            </div>
          </div>
          {selectedPoint && <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <h3 className="font-medium text-gray-900 mb-2">
                {selectedPoint.name}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <span className="text-gray-500 w-24">Type:</span>
                  <span className="text-gray-800">{selectedPoint.type}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-500 w-24">Address:</span>
                  <span className="text-gray-800">{selectedPoint.address}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-500 w-24">Hours:</span>
                  <span className="text-gray-800">{selectedPoint.hours}</span>
                </div>
              </div>
            </div>}
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-[600px] overflow-hidden">
            <div ref={mapContainerRef} className="h-full w-full" />
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <InfoIcon className="h-4 w-4 mr-1" />
            <span>
              Click on a marker or list item to view details about the
              collection point.
            </span>
          </div>
        </div>
      </div>
    </div>;
};
export default CollectionPoints;