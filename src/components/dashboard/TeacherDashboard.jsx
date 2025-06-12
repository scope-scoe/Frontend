
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../shared/Card';
import PageHeader from '../shared/PageHeader';
import { useSelector } from 'react-redux';

// Mock data
const upcomingEvents = [
  { id: 1, title: "Campus Placement Drive", date: "2023-05-15", status: "Confirmed", attendees: 42 },
  { id: 2, title: "Technical Seminar", date: "2023-05-12", status: "Pending", attendees: 30 },
];

const recentMarksUploads = [
  { id: 1, course: "Computer Engineering", year: "Third", subject: "Database Systems", date: "2023-04-28", students: 65 },
  { id: 2, course: "Computer Engineering", year: "Third", subject: "Operating Systems", date: "2023-04-25", students: 68 },
];

const TeacherDashboard = () => {
  const user = useSelector(store => store.auth.user);
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader 
        title={`Welcome, ${user?.Name || 'Teacher'}`}
        subtitle="Your teacher dashboard at a glance"
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
            onClick={() => setActiveTab('events')}
            className={`py-2 px-1 border-b-2 ${
              activeTab === 'events' 
                ? 'border-scope-primary text-scope-primary font-medium' 
                : 'border-transparent text-gray-500 hover:text-scope-primary'
            }`}
          >
            Events
          </button>
        </div>
      </div>
      
      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-scope-light">
              <div className="text-center">
                <div className="text-3xl font-bold text-scope-primary mb-1">2</div>
                <div className="text-sm text-gray-600">Created Events</div>
              </div>
            </Card>
            <Card className="bg-scope-light">
              <div className="text-center">
                <div className="text-3xl font-bold text-scope-primary mb-1">3</div>
                <div className="text-sm text-gray-600">Courses</div>
              </div>
            </Card>
            <Card className="bg-scope-light md:col-span-2">
              <div className="text-center">
                <div className="text-3xl font-bold text-scope-primary mb-1">133</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
            </Card>
          </div>
          
          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Link 
                to="/manage-events/create" 
                className="bg-scope-primary text-white text-center py-3 px-4 rounded hover:bg-scope-dark transition-colors"
              >
                Create Event
              </Link>
              <Link 
                to="/students" 
                className="border border-scope-primary text-scope-primary text-center py-3 px-4 rounded hover:bg-scope-light transition-colors"
              >
                View Students
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
              <h3 className="text-lg font-semibold">Your Events</h3>
              <Link to="/manage-events/create" className="text-sm bg-scope-primary text-white px-3 py-1 rounded">
                Create New Event
              </Link>
            </div>
            
            {upcomingEvents.length > 0 ? (
              <div className="divide-y">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-lg">{event.title}</h4>
                        <p className="text-sm text-gray-600">
                          Date: {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Attendees: {event.attendees}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        event.status === 'Confirmed' 
                          ? 'bg-scope-success/20 text-scope-success' 
                          : 'bg-scope-warning/20 text-scope-warning'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button className="bg-scope-primary text-white text-sm px-3 py-1 rounded">
                        Edit
                      </button>
                      <button className="border border-scope-primary text-scope-primary text-sm px-3 py-1 rounded">
                        View Attendees
                      </button>
                      <button className="border border-red-500 text-red-500 text-sm px-3 py-1 rounded">
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No events created yet
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
