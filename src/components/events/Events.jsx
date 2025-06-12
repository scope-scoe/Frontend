import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../shared/PageHeader";
import Card from "../shared/Card";
import { Badge } from "../ui/badge";
import { Ghost } from "lucide-react";

// Mock data
const events = [
  {
    id: 1,
    title: "Campus Placement Drive",
    description:
      "Join us for an exclusive placement opportunity with Tech Solutions Inc., a leading software development company. They are hiring for multiple positions including Software Engineer, UI/UX Designer, and Quality Analyst.",
    date: "2023-05-15",
    time: "10:00 AM",
    keywords: [
      "placement",
      "software",
      "engineering",
      "placement",
      "software",
      "engineering",
      "placement",
      "software",
      "engineering",
      "placement",
      "software",
      "engineering",
      "placement",
      "software",
      "engineering",
    ],
    location: "Seminar Hall",
    joined: true,
  },
  {
    id: 2,
    title: "Mock Interview Workshop",
    company: "Career Development Cell",
    description:
      "Prepare for your interviews with our comprehensive mock interview workshop. Learn techniques to tackle technical and HR round interviews effectively.",
    date: "2023-05-10",
    time: "2:00 PM",
    keywords: ["placement", "software", "engineering"],
    eligibility: "All Departments",
    location: "Auditorium",
    joined: false,
  },
  {
    id: 3,
    title: "Resume Building Session",
    company: "Career Services",
    description:
      "Learn how to create an effective resume that highlights your skills and experience. Get personalized feedback from industry experts.",
    date: "2023-05-08",
    time: "11:00 AM",
    keywords: ["placement", "software", "engineering"],
    eligibility: "All Departments",
    location: "Seminar Hall 2",
    joined: true,
  },
  {
    id: 4,
    title: "Industry Connect Webinar",
    company: "Global Tech Partners",
    description:
      "Connect with industry leaders and gain insights into the latest trends in technology. A great opportunity for networking and learning.",
    date: "2023-05-20",
    time: "3:00 PM",
    keywords: ["placement", "software", "engineering"],
    eligibility: "Computer Engineering, ENTC",
    location: "Online (Zoom)",
    joined: false,
  },
];

const Events = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((event) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "joined" && event.joined) ||
      (filter === "available" && !event.joined);

    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleJoinEvent = (eventId) => {
    // In a real app, this would call an API to join the event
    alert(`You have joined event #${eventId}`);
  };

  const handleLeaveEvent = (eventId) => {
    // In a real app, this would call an API to leave the event
    alert(`You have left event #${eventId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Events"
        subtitle="Browse and join upcoming college events"
      />

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md ${
              filter === "all"
                ? "bg-scope-primary text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilter("joined")}
            className={`px-4 py-2 rounded-md ${
              filter === "joined"
                ? "bg-scope-primary text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Joined
          </button>
          <button
            onClick={() => setFilter("available")}
            className={`px-4 py-2 rounded-md ${
              filter === "available"
                ? "bg-scope-primary text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Available
          </button>
        </div>

        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Events List */}
      {filteredEvents.length > 0 ? (
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <Card key={event.id}>
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <div className="text-sm bg-scope-light text-scope-primary px-2 py-1 rounded">
                      {new Date(event.date).toLocaleDateString()} @ {event.time}
                    </div>
                  </div>

                  <p className="text-gray-600 mt-1">{event.company}</p>

                  <p className="mt-3">{event.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Location:</span>{" "}
                        {event.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {event.keywords.map((keyword, index) => (
                  <Badge variant={Ghost}
                    key={index}
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
              <div className="mt-5 flex justify-end space-x-3">
                <Link
                  to={`/events/${event.id}`}
                  className="px-4 py-2 border border-scope-primary text-scope-primary rounded-md hover:bg-scope-light transition-colors"
                >
                  View Details
                </Link>

                {event.joined ? (
                  <button
                    onClick={() => handleLeaveEvent(event.id)}
                    className="px-4 py-2 border border-scope-error text-scope-error rounded-md hover:bg-scope-error/10 transition-colors"
                  >
                    Leave Event
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoinEvent(event.id)}
                    className="px-4 py-2 bg-scope-primary text-white rounded-md hover:bg-scope-dark transition-colors"
                  >
                    Join Event
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-8">
            <h3 className="text-xl font-medium text-gray-600">
              No events found
            </h3>
            <p className="text-gray-500 mt-2">
              {searchQuery
                ? "Try adjusting your search query"
                : filter === "joined"
                ? "You haven't joined any events yet"
                : "There are no upcoming events available"}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Events;
