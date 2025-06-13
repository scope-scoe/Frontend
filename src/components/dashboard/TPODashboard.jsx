import { useSelector } from 'react-redux';
import React, { use, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../shared/Card';
import PageHeader from '../shared/PageHeader';

// Mock data
const forwardedQueries = [
  { 
    id: 1, 
    title: "Corporate partnership opportunity", 
    forwardedBy: "Mike TPC",
    originalDate: "2023-04-28", 
    forwardedDate: "2023-04-29",
    status: "New",
    priority: "High"
  },
  { 
    id: 2, 
    title: "Placement policy clarification", 
    forwardedBy: "Mike TPC",
    originalDate: "2023-04-25", 
    forwardedDate: "2023-04-26",
    status: "In Progress",
    priority: "Medium"
  },
];

const tpcCoordinators = [
  {
    id: 1,
    name: "Mike TPC",
    department: "Computer Engineering",
    pendingQueries: 3,
    resolvedCount: 18,
    joinedDate: "2023-01-15"
  },
  {
    id: 2,
    name: "Lisa Cooper",
    department: "Information Technology",
    pendingQueries: 2,
    resolvedCount: 24,
    joinedDate: "2023-01-10"
  },
];

const upcomingEvents = [
  { id: 1, title: "Campus Placement Drive", date: "2023-05-15", company: "Tech Solutions Inc." },
  { id: 2, title: "Industry Connect Workshop", date: "2023-05-18", company: "Innovation Labs" },
];

const TPODashboard = () => {
  const user = useSelector(store => store.auth.user);
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader 
        title={`Welcome, ${user?.Name || 'TPO'}`}
        subtitle="Training & Placement Officer Dashboard"
      />
      
      {/* Dashboard Tabs */}
      <div className="mb-6 border-b">
        <div className="flex space-x-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 ${
              activeTab === 'overview' 
                ? 'border-scope-primary text-scope-primary font-medium' 
                : 'border-transparent text-gray-500 hover:text-scope-primary'
            }`}
          >
            Overview
          </button>
          
         
          
        </div>
      </div>
      
      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-scope-light text-center">
              <div className="text-3xl font-bold text-scope-primary mb-1">{forwardedQueries.filter(q => q.status === 'New').length}</div>
              <div className="text-sm text-gray-600">New Forwarded Queries</div>
            </Card>
            <Card className="bg-scope-light text-center">
              <div className="text-3xl font-bold text-scope-primary mb-1">{tpcCoordinators.length}</div>
              <div className="text-sm text-gray-600">TPC Coordinators</div>
            </Card>
            
          </div>
          
          
          
          
        </div>
      )}
      
      {/* Queries Tab Content */}
      {activeTab === 'queries' && (
        <div className="space-y-6">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Forwarded Queries</h3>
              <div className="flex gap-2">
                <select className="text-sm border rounded p-1">
                  <option value="">All Statuses</option>
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
            
            {forwardedQueries.length > 0 ? (
              <div className="divide-y">
                {forwardedQueries.map((query) => (
                  <div key={query.id} className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{query.title}</h4>
                        <p className="text-sm text-gray-600">
                          Forwarded By: {query.forwardedBy} • {new Date(query.forwardedDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          Original Query Date: {new Date(query.originalDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          query.status === 'New' 
                            ? 'bg-scope-warning/20 text-scope-warning' 
                            : query.status === 'In Progress'
                            ? 'bg-scope-primary/20 text-scope-primary'
                            : 'bg-scope-success/20 text-scope-success'
                        }`}>
                          {query.status}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          query.priority === 'High' 
                            ? 'bg-scope-error/20 text-scope-error' 
                            : query.priority === 'Medium'
                            ? 'bg-scope-warning/20 text-scope-warning'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {query.priority}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button className="bg-scope-primary text-white text-sm px-3 py-1 rounded">
                        View Details
                      </button>
                      <button className="border border-scope-primary text-scope-primary text-sm px-3 py-1 rounded">
                        Respond
                      </button>
                      <button className="border border-green-600 text-green-600 text-sm px-3 py-1 rounded">
                        Mark Resolved
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No forwarded queries to handle
              </div>
            )}
          </Card>
        </div>
      )}
      
      
      
    </div>
  );
};

export default TPODashboard;
