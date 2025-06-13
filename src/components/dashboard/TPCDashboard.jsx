import { useSelector } from 'react-redux';
import React, { use, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../shared/Card';
import PageHeader from '../shared/PageHeader';

// Mock data
const pendingQueries = [
  { 
    id: 1, 
    title: "Regarding placement schedule", 
    student: "John Smith", 
    date: "2023-04-28", 
    status: "New",
    priority: "High"
  },
  { 
    id: 2, 
    title: "Eligibility criteria query", 
    student: "Emily Brown", 
    date: "2023-04-25", 
    status: "In Progress",
    priority: "Medium"
  },
  { 
    id: 3, 
    title: "Resume format clarification", 
    student: "Michael Wilson", 
    date: "2023-04-22", 
    status: "In Progress",
    priority: "Low"
  },
];



const TPCDashboard = () => {
  const user = useSelector((store) => store.auth.user);
  const [activeTab, setActiveTab] = useState("queries");
  const queries = useSelector((store) => store.query.allQueries);
  // Count queries with status "Pending"
  const pendingCount = queries.filter((q) => q.status === "Pending").length;
  const escalated = queries.filter((q) => q.status === "Escalated").length;
  const resolved = queries.filter((q) => q.status === "Resolved").length;
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title={`Welcome, ${user?.Name || "TPC"}`}
        subtitle="Training & Placement Coordinator Dashboard"
      />

      {/* Dashboard Tabs */}
      <div className="mb-6 border-b">
        <div className="flex space-x-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("queries")}
            className={`py-2 px-1 border-b-2 ${
              activeTab === "queries"
                ? "border-scope-primary text-scope-primary font-medium"
                : "border-transparent text-gray-500 hover:text-scope-primary"
            }`}
          >
            Manage Queries
          </button>
        </div>
      </div>

      {/* Queries Tab Content */}
      {activeTab === "queries" && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-scope-light text-center">
              <div className="text-3xl font-bold text-scope-primary mb-1">
                {pendingCount}
              </div>
              <div className="text-sm text-gray-600">Pending Queries</div>
            </Card>
            <Card className="bg-scope-light text-center">
              <div className="text-3xl font-bold text-scope-primary mb-1">
                {escalated}
              </div>
              <div className="text-sm text-gray-600">Escalated Queries</div>
            </Card>
            <Card className="bg-scope-light text-center">
              <div className="text-3xl font-bold text-scope-primary mb-1">
                {resolved}
              </div>
              <div className="text-sm text-gray-600">Resolved Queries</div>
            </Card>
          </div>

          {/* Queries List */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Pending Queries</h3>
            </div>

            {queries.length > 0 ? (
              <div className="divide-y">
                {queries.map((query) =>{ if(query.status==="Pending")return(
                  <div key={query._id} className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{query.category}</h4>
                        <p className="text-sm text-gray-600">
                          {(() => {
                            const date = new Date(query.createdAt);
                            const day = String(date.getDate()).padStart(2, "0");
                            const month = String(date.getMonth() + 1).padStart(
                              2,
                              "0"
                            );
                            const year = date.getFullYear();
                            return `${day}-${month}-${year}`;
                          })()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            query.status === "New"
                              ? "bg-scope-warning/20 text-scope-warning"
                              : query.status === "In Progress"
                              ? "bg-scope-primary/20 text-scope-primary"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {query.status}
                        </span>
              
                      </div>
                    </div>
                    
                  </div>
                )})}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No queries to handle
              </div>
            )}

            <div className="mt-4 text-center">
              <Link
                to="/manageQueries"
                className="text-scope-primary hover:underline"
              >
                View All Queries
              </Link>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
};

export default TPCDashboard;
