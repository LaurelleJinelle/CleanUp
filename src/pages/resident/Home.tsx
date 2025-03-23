import React from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, MapIcon, AlertCircleIcon, BookOpenIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
const ResidentHome = ({
  user
}) => {
  const nextCollections = [{
    id: 1,
    type: "General Waste",
    date: "Tomorrow",
    time: "8:00 AM - 10:00 AM"
  }, {
    id: 2,
    type: "Recycling",
    date: "Friday, Oct 15",
    time: "9:00 AM - 11:00 AM"
  }, {
    id: 3,
    type: "Green Waste",
    date: "Monday, Oct 18",
    time: "8:00 AM - 10:00 AM"
  }];
  const nearbyPoints = [{
    id: 1,
    name: "Central Park Collection Point",
    distance: "0.5 miles"
  }, {
    id: 2,
    name: "Downtown Recycling Center",
    distance: "1.2 miles"
  }];
  const recentArticles = [{
    id: 1,
    title: "How to Properly Sort Your Recyclables",
    date: "Oct 5, 2023"
  }, {
    id: 2,
    title: "Reducing Food Waste at Home",
    date: "Sep 28, 2023"
  }];
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome back, {user.name}!
        </h2>
        <p className="text-gray-600">
          Here's what's happening with your waste management.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Next Collections" icon={<CalendarIcon className="h-6 w-6 text-blue-500" />} linkText="View Schedule" linkTo="/resident/schedule">
          <div className="space-y-3">
            {nextCollections.map(collection => <div key={collection.id} className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <TrashIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{collection.type}</p>
                  <p className="text-sm text-gray-500">
                    {collection.date} • {collection.time}
                  </p>
                </div>
              </div>)}
          </div>
        </DashboardCard>
        <DashboardCard title="Nearby Collection Points" icon={<MapIcon className="h-6 w-6 text-blue-500" />} linkText="View Map" linkTo="/resident/collection-points">
          <div className="space-y-3">
            {nearbyPoints.map(point => <div key={point.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <MapIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{point.name}</p>
                    <p className="text-sm text-gray-500">
                      {point.distance} away
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
        </DashboardCard>
        <DashboardCard title="Educational Resources" icon={<BookOpenIcon className="h-6 w-6 text-blue-500" />} linkText="Read More" linkTo="/resident/education">
          <div className="space-y-3">
            {recentArticles.map(article => <div key={article.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <BookOpenIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{article.title}</p>
                    <p className="text-sm text-gray-500">
                      Published {article.date}
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
        </DashboardCard>
      </div>
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <AlertCircleIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">
              Have an issue to report?
            </h3>
            <p className="text-gray-600 mb-4">
              Missed collection? Improper waste disposal? Let us know so we can
              address it promptly.
            </p>
            <Link to="/resident/reports" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-500">
              Make a report
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>;
};
const DashboardCard = ({
  title,
  icon,
  children,
  linkText,
  linkTo
}) => {
  return <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {icon}
            <h3 className="ml-2 text-lg font-medium text-gray-800">{title}</h3>
          </div>
        </div>
      </div>
      <div className="px-6 py-5">{children}</div>
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <Link to={linkTo} className="text-sm text-blue-600 font-medium hover:text-blue-500 flex items-center">
          {linkText}
          <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>;
};
export default ResidentHome;