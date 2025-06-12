import React, { useState } from "react";
import { Link } from "react-router-dom";
//import { useAuth } from "../../contexts/AuthContext";
import Card from "../shared/Card";
import PageHeader from "../shared/PageHeader";

// Mock data
const upcomingEvents = [
  {
    id: 1,
    title: "Campus Placement Drive",
    date: "2023-05-15",
    company: "Tech Solutions Inc.",
  },
  {
    id: 2,
    title: "Mock Interview Session",
    date: "2023-05-10",
    company: "Career Services",
  },
  {
    id: 3,
    title: "Resume Building Workshop",
    date: "2023-05-08",
    company: "Career Development Cell",
  },
];

const pendingQueries = [
  {
    id: 1,
    title: "Regarding placement schedule",
    date: "2023-04-28",
    status: "Pending",
  },
  {
    id: 2,
    title: "Eligibility criteria query",
    date: "2023-04-25",
    status: "In Progress",
  },
];

const StudentDashboard = () => {
  //const { currentUser } = useAuth();
  const currentUser = true;
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title={`Welcome, ${currentUser?.fullName || "Student"}`}
        subtitle="Your student dashboard at a glance"
      />

      {/* Dashboard Tabs */}
      <div className="mb-6 border-b">
        <div className="flex space-x-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-2 px-1 border-b-2 ${
              activeTab === "overview"
                ? "border-scope-primary text-scope-primary font-medium"
                : "border-transparent text-gray-500 hover:text-scope-primary"
            }`}
          >
            Overview
          </button>
          
        </div>
      </div>

      {/* Overview Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-scope-light">
              <div className="text-center">
                <div className="text-3xl font-bold text-scope-primary mb-1">
                  3
                </div>
                <div className="text-sm text-gray-600">Upcoming Events</div>
              </div>
            </Card>
            <Card className="bg-scope-light">
              <div className="text-center">
                <div className="text-3xl font-bold text-scope-primary mb-1">
                  2
                </div>
                <div className="text-sm text-gray-600">Active Queries</div>
              </div>
            </Card>
            <Card className="bg-scope-light md:col-span-2">
              <div className="text-center">
                <div className="text-3xl font-bold text-scope-primary mb-1">
                  8.5
                </div>
                <div className="text-sm text-gray-600">CGPA</div>
                <div className="mt-2 text-xs text-scope-primary">
                  Last Updated: May 2023
                </div>
              </div>
            </Card>
          </div>

          {/* Upcoming Events */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <Link
                to="/events"
                className="text-sm text-scope-primary hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="divide-y">
              {upcomingEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="py-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{event.title}</h4>
                    <span className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{event.company}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      
      
    </div>
  );
};

export default StudentDashboard;
