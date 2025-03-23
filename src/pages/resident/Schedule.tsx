import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon, RecycleIcon, LeafIcon } from "lucide-react";
const Schedule = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const scheduleData = {
    "2023-10-11": [{
      id: 1,
      type: "General Waste",
      icon: <TrashIcon className="h-5 w-5 text-gray-600" />,
      time: "8:00 AM - 10:00 AM"
    }],
    "2023-10-13": [{
      id: 2,
      type: "Recycling",
      icon: <RecycleIcon className="h-5 w-5 text-blue-600" />,
      time: "9:00 AM - 11:00 AM"
    }],
    "2023-10-16": [{
      id: 3,
      type: "Green Waste",
      icon: <LeafIcon className="h-5 w-5 text-green-600" />,
      time: "8:00 AM - 10:00 AM"
    }],
    "2023-10-18": [{
      id: 4,
      type: "General Waste",
      icon: <TrashIcon className="h-5 w-5 text-gray-600" />,
      time: "8:00 AM - 10:00 AM"
    }],
    "2023-10-20": [{
      id: 5,
      type: "Recycling",
      icon: <RecycleIcon className="h-5 w-5 text-blue-600" />,
      time: "9:00 AM - 11:00 AM"
    }],
    "2023-10-23": [{
      id: 6,
      type: "Green Waste",
      icon: <LeafIcon className="h-5 w-5 text-green-600" />,
      time: "8:00 AM - 10:00 AM"
    }],
    "2023-10-25": [{
      id: 7,
      type: "General Waste",
      icon: <TrashIcon className="h-5 w-5 text-gray-600" />,
      time: "8:00 AM - 10:00 AM"
    }],
    "2023-10-27": [{
      id: 8,
      type: "Recycling",
      icon: <RecycleIcon className="h-5 w-5 text-blue-600" />,
      time: "9:00 AM - 11:00 AM"
    }],
    "2023-10-30": [{
      id: 9,
      type: "Green Waste",
      icon: <LeafIcon className="h-5 w-5 text-green-600" />,
      time: "8:00 AM - 10:00 AM"
    }]
  };
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split("T")[0];
      const hasEvents = scheduleData[dateString];
      days.push(<div key={day} className={`h-24 border border-gray-200 p-2 ${hasEvents ? "bg-blue-50" : "bg-white"}`}>
          <div className="flex justify-between">
            <span className="text-sm font-medium">{day}</span>
            {hasEvents && <span className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xs text-blue-600 font-medium">
                  {hasEvents.length}
                </span>
              </span>}
          </div>
          {hasEvents && <div className="mt-1 overflow-y-auto max-h-16">
              {hasEvents.map(event => <div key={event.id} className="flex items-center text-xs py-1">
                  {event.icon}
                  <span className="ml-1 text-gray-700">{event.type}</span>
                </div>)}
            </div>}
        </div>);
    }
    return days;
  };
  const formatMonth = () => {
    return currentMonth.toLocaleString("default", {
      month: "long",
      year: "numeric"
    });
  };
  const upcomingCollections = Object.entries(scheduleData).filter(([date]) => new Date(date) >= new Date()).sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB)).slice(0, 5).map(([date, events]) => ({
    date: new Date(date),
    events
  }));
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Waste Collection Schedule
        </h2>
        <p className="text-gray-600">
          View upcoming waste collections for your area.
        </p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800">Calendar</h3>
            <div className="flex items-center space-x-2">
              <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
                <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
              </button>
              <span className="text-gray-800 font-medium">{formatMonth()}</span>
              <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
                <ChevronRightIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                {day}
              </div>)}
            {renderCalendar()}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">
            Upcoming Collections
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {upcomingCollections.length > 0 ? upcomingCollections.map(({
          date,
          events
        }) => <div key={date.toISOString()} className="px-6 py-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-lg h-12 w-12 flex flex-col items-center justify-center mr-4">
                    <span className="text-xs font-medium text-blue-800">
                      {date.toLocaleDateString("en-US", {
                  month: "short"
                })}
                    </span>
                    <span className="text-lg font-bold text-blue-800">
                      {date.getDate()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {date.toLocaleDateString("en-US", {
                  weekday: "long"
                })}
                    </p>
                    <div className="mt-1 space-y-1">
                      {events.map(event => <div key={event.id} className="flex items-center text-sm">
                          {event.icon}
                          <span className="ml-2 text-gray-600">
                            {event.type} • {event.time}
                          </span>
                        </div>)}
                    </div>
                  </div>
                </div>
              </div>) : <div className="px-6 py-12 text-center">
              <p className="text-gray-500">
                No upcoming collections scheduled.
              </p>
            </div>}
        </div>
      </div>
    </div>;
};
export default Schedule;