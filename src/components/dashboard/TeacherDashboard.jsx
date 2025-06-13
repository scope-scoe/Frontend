
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../shared/Card';
import PageHeader from '../shared/PageHeader';
import { useSelector } from 'react-redux';
import useGetCreatedEvents from '@/hooks/Events/useGetCreatedEvents';
import { USER_API_ENDPOINT } from '@/utils/constants';
import axios from 'axios';



const TeacherDashboard = () => {
  const registrations=async()=>{
    try {
      const res = await axios.get(
        `${USER_API_ENDPOINT}/teacher/getAllRegistrations`
      );
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }
  const events=useSelector(store=>store.event.createdEvents)
  useGetCreatedEvents();
  const user = useSelector(store => store.auth.user);
  const [activeTab, setActiveTab] = useState('events');
  
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
            onClick={() => setActiveTab('events')}
            className={`py-2 px-1 border-b-2 ${
              activeTab === 'events' 
                ? 'border-blue-600 text-blue-600 font-medium' 
                : 'border-transparent text-gray-500 hover:text-blue-600'
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
                <div className="text-3xl font-bold text-blue-600 mb-1">2</div>
                <div className="text-sm text-gray-600">Created Events</div>
              </div>
            </Card>
            <Card className="bg-scope-light">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">3</div>
                <div className="text-sm text-gray-600">Courses</div>
              </div>
            </Card>
            <Card className="bg-scope-light md:col-span-2">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">133</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
            </Card>
          </div>
          
          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Link 
                to="/createEvent" 
                className="bg-blue-600 text-white text-center py-3 px-4 rounded hover:bg-scope-dark transition-colors"
              >
                Create Event
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
              <Link to="/createEvent" className="text-sm bg-blue-600 text-white px-3 py-1 rounded">
                Create New Event
              </Link>
            </div>
            
            {events.length > 0 ? (
              <div className="divide-y">
                {events.map((event) => (
                  <div key={event._id} className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-lg">{event.title}</h4>
                        <p className="text-sm text-gray-600">
                          Date: {event.date}
                        </p>
                        <p className="text-sm text-gray-600">
                          Description: {event.description}
                        </p>
                      </div>
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
