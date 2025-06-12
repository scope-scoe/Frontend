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

const upcomingEvents = [
  { id: 1, title: "Campus Placement Drive", date: "2023-05-15", company: "Tech Solutions Inc." },
  { id: 2, title: "Mock Interview Session", date: "2023-05-10", company: "Career Services" },
];

const TPCDashboard = () => {
  const user = useSelector(store => store.auth.user);
  const [activeTab, setActiveTab] = useState('queries');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader 
        title={`Welcome, ${user?.Name || 'TPC'}`}
        subtitle="Training & Placement Coordinator Dashboard"
      />
      
      {/* Dashboard Tabs */}
      <div className="mb-6 border-b">
        <div className="flex space-x-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('queries')}
            className={`py-2 px-1 border-b-2 ${
              activeTab === 'queries' 
                ? 'border-scope-primary text-scope-primary font-medium' 
                : 'border-transparent text-gray-500 hover:text-scope-primary'
            }`}
          >
            Manage Queries
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`py-2 px-1 border-b-2 ${
              activeTab === 'events' 
                ? 'border-scope-primary text-scope-primary font-medium' 
                : 'border-transparent text-gray-500 hover:text-scope-primary'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-1 border-b-2 ${
              activeTab === 'analytics' 
                ? 'border-scope-primary text-scope-primary font-medium' 
                : 'border-transparent text-gray-500 hover:text-scope-primary'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>
      
      {/* Queries Tab Content */}
      {activeTab === 'queries' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-scope-light text-center">
              <div className="text-3xl font-bold text-scope-primary mb-1">{pendingQueries.filter(q => q.status === 'New').length}</div>
              <div className="text-sm text-gray-600">New Queries</div>
            </Card>
            <Card className="bg-scope-light text-center">
              <div className="text-3xl font-bold text-scope-primary mb-1">{pendingQueries.filter(q => q.status === 'In Progress').length}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </Card>
            <Card className="bg-scope-light text-center">
              <div className="text-3xl font-bold text-scope-primary mb-1">12</div>
              <div className="text-sm text-gray-600">Resolved This Week</div>
            </Card>
          </div>
          
          {/* Queries List */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Active Queries</h3>
              <div className="flex gap-2">
                <select className="text-sm border rounded p-1">
                  <option value="">All Statuses</option>
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Forwarded">Forwarded</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <select className="text-sm border rounded p-1">
                  <option value="">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
            
            {pendingQueries.length > 0 ? (
              <div className="divide-y">
                {pendingQueries.map((query) => (
                  <div key={query.id} className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{query.title}</h4>
                        <p className="text-sm text-gray-600">
                          From: {query.student} • {new Date(query.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          query.status === 'New' 
                            ? 'bg-scope-warning/20 text-scope-warning' 
                            : query.status === 'In Progress'
                            ? 'bg-scope-primary/20 text-scope-primary'
                            : 'bg-gray-200 text-gray-700'
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
                        Respond
                      </button>
                      <button className="border border-scope-secondary text-scope-secondary text-sm px-3 py-1 rounded">
                        Forward to TPO
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
                No queries to handle
              </div>
            )}
            
            <div className="mt-4 text-center">
              <Link 
                to="/manage-queries"
                className="text-scope-primary hover:underline"
              >
                View All Queries
              </Link>
            </div>
          </Card>
        </div>
      )}
      
      {/* Events Tab Content */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <Link to="/events" className="text-sm bg-scope-primary text-white px-3 py-1 rounded">
                View All Events
              </Link>
            </div>
            
            {upcomingEvents.length > 0 ? (
              <div className="divide-y">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="py-4">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-600">
                          {event.company}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button className="bg-scope-primary text-white text-sm px-3 py-1 rounded">
                        View Details
                      </button>
                      <button className="border border-scope-primary text-scope-primary text-sm px-3 py-1 rounded">
                        Send Reminder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No upcoming events
              </div>
            )}
          </Card>
        </div>
      )}
      
      {/* Analytics Tab Content */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Query Analytics</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Queries This Month</span>
                  <span className="font-semibold">24</span>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Resolved (18)</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-scope-success h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Forwarded to TPO (3)</span>
                    <span>12.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-scope-warning h-2 rounded-full" style={{ width: '12.5%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Pending (3)</span>
                    <span>12.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-scope-error h-2 rounded-full" style={{ width: '12.5%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Top Query Categories</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Placement Schedule</span>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Eligibility Criteria</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Resume Building</span>
                    <span className="text-sm font-medium">18%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Others</span>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card>
              <h3 className="text-lg font-semibold mb-4">Response Performance</h3>
              
              <div className="space-y-4">
                <div className="text-center">
                  <span className="block text-3xl font-bold text-scope-primary">4.2 hrs</span>
                  <span className="text-sm text-gray-600">Average Response Time</span>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-scope-light rounded-lg">
                    <span className="block text-lg font-semibold">92%</span>
                    <span className="text-xs text-gray-600">Queries Resolved</span>
                  </div>
                  <div className="text-center p-3 bg-scope-light rounded-lg">
                    <span className="block text-lg font-semibold">8%</span>
                    <span className="text-xs text-gray-600">Forwarded to TPO</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Response Time Trend (Last 30 Days)</h4>
                {/* Placeholder for chart */}
                <div className="bg-gray-100 h-40 rounded flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Response Time Chart</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default TPCDashboard;
