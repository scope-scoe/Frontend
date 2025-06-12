import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Badge} from "../ui/Badge";
import PageHeader from "../shared/PageHeader";
import Card from "../shared/Card";

// Mock data
const queries = [
  {
    id: 1,
    title: "Regarding placement schedule",
    description:
      "I wanted to inquire about the upcoming placement schedule for Computer Engineering students. Are there any companies visiting next month?",
    date: "2023-04-28",
    status: "Pending",
    category: "Placement",
  },
  {
    id: 2,
    title: "Eligibility criteria for Oracle placement",
    description:
      "What are the eligibility criteria for the upcoming Oracle placement drive? Do they have a CGPA cutoff?",
    date: "2023-04-25",
    status: "In Progress",
    category: "Placement",
  },
  {
    id: 3,
    title: "Resume format clarification",
    description:
      "Is there a specific format we should follow for our resumes for the upcoming placement season?",
    date: "2023-04-20",
    status: "Resolved",
    category: "Placement",
  },
];

const Queries = () => {
  //const { userRole } = useAuth();
  
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredQueries = queries.filter((query) => {
    const matchesFilter =
      filter === "all" || filter === query.status.toLowerCase();

    const matchesSearch =
      query.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="My Queries"
        subtitle="View and manage your placement queries"
      />

      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md ${
              filter === "all"
                ? "bg-scope-primary text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            All Queries
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-md ${
              filter === "pending"
                ? "bg-scope-warning text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("in progress")}
            className={`px-4 py-2 rounded-md ${
              filter === "in progress"
                ? "bg-scope-primary text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter("resolved")}
            className={`px-4 py-2 rounded-md ${
              filter === "resolved"
                ? "bg-scope-success text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Resolved
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search queries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 p-2 border border-gray-300 rounded-md"
          />
          <Link to={"/createQuery"}>
            <button className="bg-scope-primary text-white px-4 py-2 rounded-md hover:bg-scope-dark">
              New Query
            </button>
          </Link>
        </div>
      </div>

      {/* Queries List */}
      {filteredQueries.length > 0 ? (
        <div className="space-y-6">
          {filteredQueries.map((query) => (
            <Card key={query.id}>
              <div className="flex justify-between items-start">
                <div>
                  {/* <h3 className="text-lg font-semibold">{query.title}</h3> */}
                  <Badge variant={"ghost"} className="mt-2 text-lg">
                    Category : {query.category}
                  </Badge>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    query.status === "Pending"
                      ? "bg-scope-warning/20 text-scope-warning"
                      : query.status === "In Progress"
                      ? "bg-scope-primary/20 text-scope-primary"
                      : "bg-scope-success/20 text-scope-success"
                  }`}
                >
                  {query.status}
                </span>
              </div>

              <p className="mt-3">{query.description}</p>
              <p className="text-sm text-gray-500">
                Submitted on {new Date(query.date).toLocaleDateString()}
              </p>

              <div className="mt-4 flex justify-end space-x-3">
                <Link
                  to={`/queries/${query.id}`}
                  className="px-4 py-2 border border-scope-primary text-scope-primary rounded-md hover:bg-scope-light"
                >
                  View Details
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-8">
            <h3 className="text-xl font-medium text-gray-600">
              No queries found
            </h3>
            <p className="text-gray-500 mt-2">
              {searchQuery
                ? "Try adjusting your search query"
                : "You haven't submitted any queries yet"}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Queries;
