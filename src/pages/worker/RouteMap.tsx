import React, { useEffect, useState, useRef } from "react";
import { MapIcon, NavigationIcon, CheckCircleIcon, ClockIcon, AlertCircleIcon } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// Fixing the naming conflict by renaming the component to RouteMap
const RouteMap = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [selectedRoute, setSelectedRoute] = useState("today");
  const routes = {
    today: {
      name: "Today's Route",
      description: "Central District to Downtown Commercial",
      stops: [{
        id: 1,
        name: "Central District",
        status: "Completed",
        time: "8:00 AM - 10:00 AM",
        position: [40.785091, -73.968285]
      }, {
        id: 2,
        name: "Westside Residential",
        status: "Next Stop",
        time: "10:30 AM - 12:30 PM",
        position: [40.775091, -73.978285]
      }, {
        id: 3,
        name: "Downtown Commercial",
        status: "Pending",
        time: "1:00 PM - 3:00 PM",
        position: [40.765091, -73.988285]
      }]
    },
    tomorrow: {
      name: "Tomorrow's Route",
      description: "South Park Area to Eastside Residential",
      stops: [{
        id: 4,
        name: "South Park Area",
        status: "Scheduled",
        time: "8:00 AM - 10:00 AM",
        position: [40.755091, -73.968285]
      }, {
        id: 5,
        name: "North District",
        status: "Scheduled",
        time: "10:30 AM - 12:30 PM",
        position: [40.795091, -73.958285]
      }, {
        id: 6,
        name: "Eastside Residential",
        status: "Scheduled",
        time: "1:00 PM - 3:00 PM",
        position: [40.765091, -73.948285]
      }]
    }
  };
  const getStatusColor = status => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Next Stop":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      case "Scheduled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getMarkerIcon = status => {
    let iconUrl = "";
    let iconColor = "";
    switch (status) {
      case "Completed":
        iconColor = "green";
        break;
      case "Next Stop":
        iconColor = "blue";
        break;
      case "Pending":
      case "Scheduled":
      default:
        iconColor = "gray";
    }
    return L.divIcon({
      className: `bg-${iconColor}-500 h-6 w-6 rounded-full border-2 border-white`,
      html: `<span class="flex h-full w-full items-center justify-center text-white text-xs font-bold"></span>`,
      iconSize: [24, 24]
    });
  };
  useEffect(() => {
    if (mapContainerRef.current) {
      if (mapRef.current) {
        mapRef.current.remove();
      }
      const currentRoute = routes[selectedRoute];
      const firstStop = currentRoute.stops[0];
      // Initialize the map
      mapRef.current = L.map(mapContainerRef.current).setView(firstStop.position, 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
      // Add markers for each stop
      const markers = [];
      currentRoute.stops.forEach((stop, index) => {
        const marker = L.marker(stop.position, {
          icon: getMarkerIcon(stop.status)
        }).addTo(mapRef.current).bindPopup(`
            <div class="font-bold">${stop.name}</div>
            <div>${stop.time}</div>
            <div class="text-sm">${stop.status}</div>
          `);
        markers.push(marker);
      });
      // Draw route line connecting all stops
      const routePoints = currentRoute.stops.map(stop => stop.position);
      L.polyline(routePoints, {
        color: "#3B82F6",
        weight: 4,
        opacity: 0.7
      }).addTo(mapRef.current);
      // Fit map to show all markers
      if (markers.length > 0) {
        const group = L.featureGroup(markers);
        mapRef.current.fitBounds(group.getBounds().pad(0.1));
      }
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [selectedRoute]);
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Collection Routes</h2>
        <p className="text-gray-600">
          View optimized routes for waste collection.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex items-center mb-4">
              <NavigationIcon className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">
                Route Selection
              </h3>
            </div>
            <div className="space-y-2">
              <button className={`w-full p-3 rounded-lg text-left ${selectedRoute === "today" ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50 border border-gray-100"}`} onClick={() => setSelectedRoute("today")}>
                <div className="font-medium text-gray-900">Today's Route</div>
                <div className="text-sm text-gray-600 mt-1">
                  {routes.today.description}
                </div>
              </button>
              <button className={`w-full p-3 rounded-lg text-left ${selectedRoute === "tomorrow" ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50 border border-gray-100"}`} onClick={() => setSelectedRoute("tomorrow")}>
                <div className="font-medium text-gray-900">
                  Tomorrow's Route
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {routes.tomorrow.description}
                </div>
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="font-medium text-gray-800">Route Details</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {routes[selectedRoute].stops.map((stop, index) => <li key={stop.id} className="px-4 py-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-800">
                        {index + 1}
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <h4 className="font-medium text-gray-900">
                          {stop.name}
                        </h4>
                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getStatusColor(stop.status)}`}>
                          {stop.status}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {stop.time}
                      </div>
                    </div>
                  </div>
                </li>)}
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircleIcon className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-800">
                  Route Information
                </h4>
                <p className="text-xs text-blue-700 mt-1">
                  Routes are optimized daily based on traffic conditions and
                  collection volumes. Check back each morning for your updated
                  route.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-[600px] overflow-hidden">
            <div className="px-6 py-3 border-b border-gray-200 flex items-center">
              <MapIcon className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="font-medium text-gray-800">
                {routes[selectedRoute].name}
              </h3>
            </div>
            <div ref={mapContainerRef} className="h-full w-full" />
          </div>
          <div className="mt-2 flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
              <span>Next Stop</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-gray-500 mr-1"></div>
              <span>Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default RouteMap;