import React, { use, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../shared/PageHeader";
import Card from "../shared/Card";
import { Badge } from "../ui/badge";
import { Ghost } from "lucide-react";
import { useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "@/utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useGetRegisteredEvents from "@/hooks/Events/useGetRegisteredEvents";
import useGetAllEvents from "@/hooks/Events/useGetAllEvents";
const Events = () => {
  useGetRegisteredEvents();
  useGetAllEvents();
  const navigate=useNavigate();
  const registeredEvents = useSelector((state) => state.event.registeredEvents);
  const allEvents = useSelector((state) => state.event.allEvents);
  const registeredEventIds = new Set(registeredEvents.map((ev) => ev._id));
  const events = allEvents.map((event) => ({
    ...event,
    joined: registeredEventIds.has(event._id),
  }));
    
  console.log("Registered Events:", registeredEvents);
  console.log("All Events:", allEvents);
  console.log("Events:", events);
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

  const handleJoinEvent = async(eventId) => {
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/student/registerForEvent`,
        {eventId},
        {
          withCredentials: true,
        }
      );
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log("Error",error)
    }
    
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
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilter("joined")}
            className={`px-4 py-2 rounded-md ${
              filter === "joined"
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Joined
          </button>
          <button
            onClick={() => setFilter("available")}
            className={`px-4 py-2 rounded-md ${
              filter === "available"
                ? "bg-blue-600 text-white"
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
            <Card key={event._id}>
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <div className="text-sm bg-scope-light text-blue-600 px-2 py-1 rounded">
                      {event.date} @ {event.time}
                    </div>
                  </div>

                  <p className="text-gray-600 mt-1">{event.company}</p>

                  <p className="mt-3">{event.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Location:</span>{" "}
                        {event.venue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {Array.isArray(event.keywords) &&
                typeof event.keywords[0] === "string" &&
                event.keywords[0].startsWith("[")
                  ? JSON.parse(event.keywords[0].replace(/'/g, '"')).map(
                      (keyword, index) => (
                        <Badge variant={Ghost} key={index}>
                          {keyword}
                        </Badge>
                      )
                    )
                  : (event.keywords || []).map((keyword, index) => (
                      <Badge variant={Ghost} key={index}>
                        {keyword}
                      </Badge>
                    ))}
              </div>
              <div className="mt-5 flex justify-end space-x-3">

                {event.joined ? (
                  <button
                    className="px-4 py-2 border border-scope-error text-scope-error rounded-md hover:bg-scope-error/10 transition-colors"
                  >
                    Joined
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoinEvent(event._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-scope-dark transition-colors"
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
