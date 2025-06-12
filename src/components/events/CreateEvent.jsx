import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../shared/PageHeader";
import Card from "../shared/Card";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constants";
import { toast } from "sonner";
import {Input} from "../ui/input";
const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    poster:"",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const handleFileChange = (e) => {
    // In a real app, this would handle file uploads
    setFormData({...formData,poster:e.target.files?.[0]});
  };

  const removeAttachment = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      poster: prev.poster.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.title) {
      tempErrors.title = "Event title is required";
      isValid = false;
    }

    if (!formData.company) {
      tempErrors.company = "Company/Organization name is required";
      isValid = false;
    }

    if (!formData.description) {
      tempErrors.description = "Event description is required";
      isValid = false;
    }

    if (!formData.date) {
      tempErrors.date = "Event date is required";
      isValid = false;
    }

    if (!formData.time) {
      tempErrors.time = "Event time is required";
      isValid = false;
    }

    if (!formData.venue) {
      tempErrors.venue = "Event venue is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //if (validateForm()) {
      // In a real app, this would call an API to create the event
      try {
        const res= await axios.post('http://localhost:8000/api/v1/teacher/createEvent', formData,{
          headers: {
            "Content-Type": "multipart/form-data"},
          withCredentials: true,
        });
        if (res.data.success) {
          //navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        console.error("Error during event creation:", error);
        //toast.error(
        //  error.response?.data?.message || "event creation failed. Please try again."
        //);
      }
      console.log("Creating event with data:", formData);
      alert("Event created successfully!");
      //navigate("/manage-events");
    //}
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Create New Event"
        subtitle="Schedule a new event or placement opportunity"
      />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          {/* Basic Details */}
          <Card>
            <h2 className="text-xl font-semibold mb-6">Event Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.title ? "border-scope-error" : "border-gray-300"
                  }`}
                  placeholder="e.g., Campus Placement Drive"
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-scope-error">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Company/Organization *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.company ? "border-scope-error" : "border-gray-300"
                  }`}
                  placeholder="e.g., Tech Solutions Inc."
                />
                {errors.company && (
                  <p className="mt-1 text-xs text-scope-error">
                    {errors.company}
                  </p>
                )}
              </div> */}

              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Event Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full p-2 border rounded-md ${
                    errors.description
                      ? "border-scope-error"
                      : "border-gray-300"
                  }`}
                  placeholder="Provide details about the event..."
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-scope-error">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.date ? "border-scope-error" : "border-gray-300"
                  }`}
                />
                {errors.date && (
                  <p className="mt-1 text-xs text-scope-error">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.time ? "border-scope-error" : "border-gray-300"
                  }`}
                />
                {errors.time && (
                  <p className="mt-1 text-xs text-scope-error">{errors.time}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  venue *
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.venue ? "border-scope-error" : "border-gray-300"
                  }`}
                  placeholder="e.g., Seminar Hall"
                />
                {errors.venue && (
                  <p className="mt-1 text-xs text-scope-error">
                    {errors.venue}
                  </p>
                )}
              </div>

              {/* <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Contact Email *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.contactEmail
                      ? "border-scope-error"
                      : "border-gray-300"
                  }`}
                  placeholder="e.g., contact@example.com"
                />
                {errors.contactEmail && (
                  <p className="mt-1 text-xs text-scope-error">
                    {errors.contactEmail}
                  </p>
                )}
              </div> */}
            </div>
          </Card>


        <div>
          <Input
            type="file"
            name="poster"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md border-gray-300"
            placeholder="Upload Event Poster" 
          />
        </div>
          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/manage-events")}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-scope-primary hover:bg-scope-dark text-white rounded-md"
            >
              Create Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
