import { useEffect, useRef, useState } from "react";

interface Position {
  lat: number;
  lng: number;
}

interface MarkerData {
  position: Position;
  title?: string;
  icon?: string;
}

interface RouteData {
  path: Position[];
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
}

interface GoogleMapProps {
  apiKey: string;
  center?: Position;
  zoom?: number;
  markers?: MarkerData[];
  route?: RouteData;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onMarkerClick?: (marker: google.maps.Marker) => void;
  className?: string;
}

declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  apiKey,
  center = { lat: 0, lng: 0 },
  zoom = 10,
  markers = [],
  route,
  onClick,
  onMarkerClick,
  className = "w-full h-96",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [googleMarkers, setGoogleMarkers] = useState<google.maps.Marker[]>([]);
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load Google Maps API
  useEffect(() => {
    if (window.google) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,routes&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = () => {
      setIsLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      window.initMap = () => {};
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [apiKey]);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    const newMap = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    });

    if (onClick) {
      newMap.addListener("click", onClick);
    }

    setMap(newMap);

    return () => {
      if (onClick && newMap) {
        window.google.maps.event.clearListeners(newMap, "click");
      }
    };
  }, [isLoaded, center, zoom, onClick, map]);

  // Handle markers
  useEffect(() => {
    if (!isLoaded || !map) return;

    // Clear existing markers
    googleMarkers.forEach((marker) => marker.setMap(null));

    // Create new markers
    const newMarkers = markers.map((markerData) => {
      const marker = new window.google.maps.Marker({
        position: markerData.position,
        map,
        title: markerData.title,
        icon: markerData.icon,
      });

      if (onMarkerClick) {
        marker.addListener("click", () => onMarkerClick(marker));
      }

      return marker;
    });

    setGoogleMarkers(newMarkers);

    // Fit bounds if there are markers
    if (newMarkers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      newMarkers.forEach((marker) => {
        bounds.extend(marker.getPosition() as google.maps.LatLng);
      });
      map.fitBounds(bounds);
    }

    return () => {
      newMarkers.forEach((marker) => {
        if (onMarkerClick) {
          window.google.maps.event.clearListeners(marker, "click");
        }
        marker.setMap(null);
      });
    };
  }, [isLoaded, map, markers, onMarkerClick, googleMarkers]);

  // Handle route
  useEffect(() => {
    if (!isLoaded || !map || !route) return;

    // Clear existing polyline
    if (polyline) {
      polyline.setMap(null);
    }

    // Create new polyline
    const newPolyline = new window.google.maps.Polyline({
      path: route.path,
      strokeColor: route.strokeColor || "#FF0000",
      strokeOpacity: route.strokeOpacity || 1.0,
      strokeWeight: route.strokeWeight || 2,
      map,
    });

    setPolyline(newPolyline);

    return () => {
      newPolyline.setMap(null);
    };
  }, [isLoaded, map, route, polyline]);

  return <div ref={mapRef} className={className} />;
};

export default GoogleMap;