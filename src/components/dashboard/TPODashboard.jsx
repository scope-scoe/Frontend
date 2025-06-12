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
          <button
            onClick={() => setActiveTab('queries')}
            className={`py-2 px-1 border-b-2 ${
              activeTab === 'queries' 
                ? 'border-scope-primary text-scope-primary font-medium' 
                : 'border-transparent text-gray-500 hover:text-scope-primary'
            }`}
          >
            Forwarded Queries
          </button>
          <button
            onClick={() => setActiveTab('tpc')}
            className={`py-2 px-1 border-b-2 ${
              activeTab === 'tpc' 
                ? 'border-scope-primary text-scope-primary font-medium' 
                : 'border-transparent text-gray-500 hover:text-scope-primary'
            }`}
          >
            TPC Management
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
          
          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
              <Link 
                to="/queries/forwarded" 
                className="bg-scope-primary text-white text-center py-3 px-4 rounded hover:bg-scope-dark transition-colors"
              >
                View Queries
              </Link>
              <Link 
                to="/manage-tpc" 
                className="bg-scope-secondary text-white text-center py-3 px-4 rounded hover:bg-scope-primary transition-colors"
              >
                Manage TPCs
              </Link>
              
              
            </div>
          </Card>
          
          
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
      
      {/* TPC Management Tab Content */}
      {activeTab === 'tpc' && (
        <div className="space-y-6">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">TPC Coordinators</h3>
              <button className="text-sm bg-scope-primary text-white px-3 py-1 rounded">
                Add New TPC
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Queries</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolved</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tpcCoordinators.map((tpc) => (
                    <tr key={tpc.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{tpc.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tpc.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tpc.pendingQueries}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tpc.resolvedCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(tpc.joinedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-scope-primary hover:text-scope-dark">View</button>
                        {' | '}
                        <button className="text-scope-warning hover:text-scope-warning/80">Edit</button>
                        {' | '}
                        <button className="text-scope-error hover:text-scope-error/80">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          <Card>
            <h3 className="text-lg font-semibold mb-4">Add New TPC Coordinator</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Select Student</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">Select Student</option>
                    <option value="1">John Smith (Computer Engineering)</option>
                    <option value="2">Emily Brown (Information Technology)</option>
                    <option value="3">Alex Johnson (ENTC)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium">Department</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">Select Department</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="ENTC">ENTC</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium">Responsibilities</label>
                <textarea 
                  className="w-full p-2 border rounded-md"
                  placeholder="Detail the specific responsibilities for this TPC"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="bg-scope-primary hover:bg-scope-dark text-white px-4 py-2 rounded-md"
                >
                  Add TPC
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
      
      {/* Events Tab Content */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <Link to="/manage-events/create" className="text-sm bg-scope-primary text-white px-3 py-1 rounded">
                Create New Event
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
                        Edit
                      </button>
                      <button className="border border-scope-primary text-scope-primary text-sm px-3 py-1 rounded">
                        View Details
                      </button>
                      <button className="border border-scope-error text-scope-error text-sm px-3 py-1 rounded">
                        Cancel Event
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No upcoming events found
              </div>
            )}
          </Card>
          
          <Card>
            <h3 className="text-lg font-semibold mb-4">Create New Event</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Event Title</label>
                <input 
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter event title"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Company/Organization</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter company name"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium">Event Date</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium">Start Time</label>
                  <input 
                    type="time" 
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium">Duration (hours)</label>
                  <input 
                    type="number"
                    min="0.5"
                    step="0.5" 
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter duration in hours"
                  />
                </div>
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium">Event Description</label>
                <textarea 
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter event details"
                  rows={4}
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium">Eligible Departments</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Computer Engineering</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Information Technology</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">ENTC</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Civil Engineering</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Mechanical Engineering</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">All Departments</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="bg-scope-primary hover:bg-scope-dark text-white px-4 py-2 rounded-md"
                >
                  Create Event
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TPODashboard;
