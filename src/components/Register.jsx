import { USER_API_ENDPOINT } from "@/utils/constants";
import axios from "axios";
import React, { useState } from "react";

function Register() {
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    Division: "",
    password: "",
    confirmPassword: "",
    Department: "",
    Year: "",
    Roll_Number: "",
    PRN: "",
    TeacherID: "",
  });
  const DEPARTMENTS = [
    "Computer Engineering",
    "Information Technology",
    "Electronics and Telecommunication Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
  ];
  const YEARS = ["First Year", "Second Year", "Third Year", "Final Year"];
  const DIVISIONS = ["I", "II", "III"];
  const handleSubmit =async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (role === "student" || role === "tpc") {
      delete formData.TeacherID;
    } else if (role === "teacher") {
      delete formData.Year;
      delete formData.Roll_Number;
      delete formData.PRN;
      delete formData.Division;
    }else{
      delete formData.Department;
      delete formData.Year;
      delete formData.Roll_Number;
      delete formData.PRN;
      delete formData.Division;
    }
    delete formData.confirmPassword;
    console.log("Form submitted:", formData, role);
    try {
      const res=await axios.post(`${USER_API_ENDPOINT}/${role}/register`,formData);
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle error (e.g., show error message to user)
    }
  };
  return (
    <form onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <div className="p-5 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Account Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <label
            className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${
              role === "student"
                ? "border-scope-primary bg-scope-light"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={() => setRole("student")}
              className="sr-only"
            />
            <span>Student</span>
          </label>

          <label
            className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${
              role === "teacher"
                ? "border-scope-primary bg-scope-light"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              name="role"
              value="teacher"
              checked={role === "teacher"}
              onChange={() => setRole("teacher")}
              className="sr-only"
            />
            <span>Teacher</span>
          </label>

          <label
            className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${
              role === "tpc"
                ? "border-scope-primary bg-scope-light"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              name="role"
              value="tpc"
              checked={role === "tpc"}
              onChange={() => setRole("tpc")}
              className="sr-only"
            />
            <span>TPC</span>
          </label>

          <label
            className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${
              role === "tpo"
                ? "border-scope-primary bg-scope-light"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              name="role"
              value="tpo"
              checked={role === "tpo"}
              onChange={() => setRole("tpo")}
              className="sr-only"
            />
            <span>TPO</span>
          </label>
        </div>
      </div>

      {/* Personal Details */}
      <div className="p-5 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
              //className={`w-full p-2 border rounded-md ${errors.Name ? 'border-scope-error' : 'border-gray-300'}`}
              placeholder="Enter your full name"
            />
            {/* {errors.Name && <p className="mt-1 text-xs text-scope-error">{errors.Name}</p>} */}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              //className={`w-full p-2 border rounded-md ${errors.email ? 'border-scope-error' : 'border-gray-300'}`}
              placeholder="example@email.com"
            />
            {/* {errors.email && <p className="mt-1 text-xs text-scope-error">{errors.email}</p>} */}
          </div>

          {/* Role specific fields */}
          {(role === "student" || role === "tpc") && (
            <>
              {/* Department */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Department *
                </label>
                <select
                  name="Department"
                  value={formData.Department}
                  onChange={(e) => setFormData({ ...formData, Department: e.target.value })}
                  //className={`w-full p-2 border rounded-md ${errors.Department ? 'border-scope-error' : 'border-gray-300'}`}
                >
                  <option value="">Select Department</option>
                  {DEPARTMENTS.map((Department) => (
                    <option key={Department} value={Department}>
                      {Department}
                    </option>
                  ))}
                </select>
                {/* {errors.Department && <p className="mt-1 text-xs text-scope-error">{errors.Department}</p>} */}
              </div>
              {/* Year */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Year of Study *
                </label>
                <select
                  name="Year"
                  value={formData.Year}
                  onChange={(e) => setFormData({ ...formData, Year: e.target.value })}
                  //className={`w-full p-2 border rounded-md ${errors.Year ? 'border-scope-error' : 'border-gray-300'}`}
                >
                  <option value="">Select Year</option>
                  {YEARS.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {/* {errors.Year && <p className="mt-1 text-xs text-scope-error">{errors.Year}</p>} */}
              </div>
              {/* Division */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Division *
                </label>
                <select
                  name="Division"
                  value={formData.Division}
                  onChange={(e) => setFormData({ ...formData, Division: e.target.value })}
                  //className={`w-full p-2 border rounded-md ${errors.Division ? 'border-scope-error' : 'border-gray-300'}`}
                >
                  <option value="">Select Division</option>
                  {DIVISIONS.map((Division) => (
                    <option key={Division} value={Division}>
                      {Division}
                    </option>
                  ))}
                </select>
                {/* {errors.Division && <p className="mt-1 text-xs text-scope-error">{errors.Division}</p>} */}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Roll Number *
                </label>
                <input
                  type="text"
                  name="Roll_Number"
                  value={formData.Roll_Number}
                  onChange={(e) => setFormData({ ...formData, Roll_Number: e.target.value })}
                  //className={`w-full p-2 border rounded-md ${errors.Roll_Number ? 'border-scope-error' : 'border-gray-300'}`}
                  placeholder="Enter your roll number"
                />
                {/* {errors.Roll_Number && <p className="mt-1 text-xs text-scope-error">{errors.Roll_Number}</p>} */}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  PRN Number *
                </label>
                <input
                  type="text"
                  name="PRN"
                  value={formData.PRN}
                  onChange={(e) => setFormData({ ...formData, PRN: e.target.value })}
                  //className={`w-full p-2 border rounded-md ${errors.PRN ? 'border-scope-error' : 'border-gray-300'}`}
                  placeholder="Enter your PRN number"
                />
                {/* {errors.PRN && <p className="mt-1 text-xs text-scope-error">{errors.PRN}</p>} */}
              </div>
            </>
          )}

          {role === "teacher" && (
            <>
              {/* Department */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Department *
                </label>
                <select
                  name="Department"
                  value={formData.Department}
                  onChange={(e) => setFormData({ ...formData, Department: e.target.value })}
                  //className={`w-full p-2 border rounded-md ${errors.Department ? 'border-scope-error' : 'border-gray-300'}`}
                >
                  <option value="">Select Department</option>
                  {DEPARTMENTS.map((Department) => (
                    <option key={Department} value={Department}>
                      {Department}
                    </option>
                  ))}
                </select>
                {/* {errors.Department && <p className="mt-1 text-xs text-scope-error">{errors.Department}</p>} */}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Teacher ID *
                </label>
                <input
                  type="text"
                  name="TeacherID"
                  value={formData.TeacherID}
                  onChange={(e) => setFormData({ ...formData, TeacherID: e.target.value })}
                  //className={`w-full p-2 border rounded-md ${errors.TeacherID ? 'border-scope-error' : 'border-gray-300'}`}
                  placeholder="Enter your teacher ID"
                />
                {/* {errors.TeacherID && <p className="mt-1 text-xs text-scope-error">{errors.TeacherID}</p>} */}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Password */}
      <div className="p-5 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Account Security</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              //className={`w-full p-2 border rounded-md ${errors.password ? 'border-scope-error' : 'border-gray-300'}`}
              placeholder="Minimum 6 characters"
            />
            {/* {errors.password && <p className="mt-1 text-xs text-scope-error">{errors.password}</p>} */}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              //className={`w-full p-2 border rounded-md ${errors.confirmPassword ? 'border-scope-error' : 'border-gray-300'}`}
              placeholder="Confirm your password"
            />
            {/* {errors.confirmPassword && <p className="mt-1 text-xs text-scope-error">{errors.confirmPassword}</p>} */}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-zinc-600 hover:bg-zinc-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default Register;
