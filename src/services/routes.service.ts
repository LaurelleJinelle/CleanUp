import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase-config";

interface Position {
  lat: number;
  lng: number;
}

interface RouteOptimizationRequest {
  origin: Position;
  destinations: Position[];
}

interface RouteOptimizationResponse {
  route: {
    distance: number;
    duration: number;
    path: Position[];
  };
  waypoints: Position[];
}

export const optimizeRoute = async (
  origin: Position,
  destinations: Position[]
): Promise<RouteOptimizationResponse> => {
  try {
    const optimizeRouteFunction = httpsCallable<RouteOptimizationRequest, RouteOptimizationResponse>(
      functions,
      'api-routes-optimize'
    );
    
    const result = await optimizeRouteFunction({
      origin,
      destinations
    });
    
    return result.data;
  } catch (error) {
    console.error("Error optimizing route:", error);
    throw error;
  }
};