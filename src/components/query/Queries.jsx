import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Badge} from "../ui/Badge";
import PageHeader from "../shared/PageHeader";
import Card from "../shared/Card";
import { useSelector } from "react-redux";
import useGetCreatedQueries from "@/hooks/Queries/useGetCreatedQueries";
// Mock data


const Queries = () => {
  //const { userRole } = useAuth();
  useGetCreatedQueries();
  const queries = useSelector((state) => state.query.createdQueries);
  console.log(queries);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
    const filteredQueries = queries.filter((query) => {
      const matchesFilter =
        filter === "all" || filter === query.status.toLowerCase();

      const matchesSearch =
        query.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        query.queryText.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
    console.log('filtered Queries:',filteredQueries);

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
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            All Queries
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-md ${
              filter === "pending"
                ? "bg-red-600 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("resolved")}
            className={`px-4 py-2 rounded-md ${
              filter === "resolved"
                ? "bg-green-600 text-white"
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
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-scope-dark">
              New Query
            </button>
          </Link>
        </div>
      </div>

      {/* Queries List */}
      {filteredQueries.length > 0 ? (
        <div className="space-y-6">
          {filteredQueries.map((query) => (
            <Card key={query._id}>
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
                      ? "bg-blue-600/20 text-blue-600"
                      : "bg-scope-success/20 text-scope-success"
                  }`}
                >
                  {query.status}
                </span>
              </div>

              <p className="mt-3">{query.queryText}</p>
              <p className="text-sm text-gray-500">
                Submitted on{" "}
                {(() => {
                  const date = new Date(query.createdAt);
                  const day = String(date.getDate()).padStart(2, "0");
                  const month = String(date.getMonth() + 1).padStart(2, "0");
                  const year = date.getFullYear();
                  return `${day}-${month}-${year}`;
                })()}
              </p>
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
