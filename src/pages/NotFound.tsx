import React from "react";
import { Link } from "react-router-dom";
import { AlertCircleIcon } from "lucide-react";
const NotFound = () => {
  return <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <AlertCircleIcon className="h-16 w-16 text-blue-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We couldn't find the page you're looking for. Please check the URL or
          go back to the homepage.
        </p>
        <Link to="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Go back home
        </Link>
      </div>
    </div>;
};
export default NotFound;